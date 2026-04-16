const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../utils/JWT_Token');
const { createPayUOrder } = require('../../utils/PayU');
const Licencja = require('../../models/licencja');
const User = require('../../models/uzytkownik');
const {ObjectId} = require('mongoose').Types;

router.post('/create', verifyToken, async (req, res) => {
    const idToUse = req.body.licencjaId;
    const userId = req.user.id;

    console.log(`Attempting to create order: User=${userId}, LicencjaID=${idToUse}`);

    try {
        if (!idToUse) {
            return res.status(400).json({ message: "Brak identyfikatora licencji w żądaniu." });
        }

        const foundLicencja = await Licencja.findById(idToUse);
        
        if (!foundLicencja) {
            console.error(`Licencja with ID ${idToUse} not found in database.`);
            return res.status(404).json({ message: "Nie odnaleziono wybranej licencji w bazie danych." });
        }else
            console.log(foundLicencja);
        const districtName = foundLicencja.idOkreguPZW?.nazwa || "Okręg PZW";
        const orderDescription = `Zezwolenie ${districtName}: ${foundLicencja.opis || 'Licencja wędkarska'}`;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Użytkownik nie znaleziony!" });

        const orderData = {
            customerIp: req.ip || '127.0.0.1',
            continueUrl: `http://localhost:3000/kup-licencje?status=success`, // Production redirect URL add to .env.production
            description: orderDescription,
            currencyCode: 'PLN',
            totalAmount: (foundLicencja.cena * 100).toString(),
            buyer: {
                _id: user._id,
                email: user.email,
                firstName: user.nazwa,
                language: 'pl'
            },
            products: [
                {
                    _id: foundLicencja._id,
                    name: foundLicencja.opis,
                    unitPrice: foundLicencja.cena,
                    duration: foundLicencja.czasTrwania || 1,
                    quantity: 1,
                }
            ]
        };

        const payUResponse = await createPayUOrder(orderData);
        console.log(idToUse);
        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { posiadaneLicencje: {_id:idToUse}} }
        );
        res.status(200).json({ 
            message: "Zamówienie utworzone!", 
            redirectUrl: payUResponse.redirectUri || payUResponse.continueUrl 
        });

    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ message: "Błąd podczas tworzenia płatności.", error: error.message });
    }
});

// PayU Webhook for payment notifications
router.get('/notify/:order', async (req, res) => {
    // PayU sends order notifications here
    const { order } = req.params;
    console.log(`Received payment notification for order: ${order}`);
    if (order && order.status === 'COMPLETED') {
        // Here we would find the order in our DB, 
        // find the corresponding user and licence,
        // and update user.posiadaneLicencje.
        console.log(`Payment completed for order ${order.orderId}`);
        await User.findOneAndUpdate(
            { _id: order.buyer.id },
            { $push: { posiadaneLicencje:  ObjectId(order.products[0]._id)} }
        );
    }

    res.status(200).send();
});

module.exports = router;