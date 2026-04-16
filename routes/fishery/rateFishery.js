const express = require('express');
const router = express.Router();
const Lowisko = require('../../models/lowisko');
const { verifyToken } = require('../../utils/JWT_Token');

router.post("/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { ocena } = req.body;
    const uzytkownikId = req.user.id;
    console.log("Received rating:", { id, ocena, uzytkownikId });

    if (!ocena || ocena < 1 || ocena > 5) {
        return res.status(400).json({ message: "Ocena musi być w przedziale 1-5!" });
    }

    try {
        const lowisko = await Lowisko.findById(id);
        console.log("Lowisko found:", lowisko);
        if (!lowisko) {
            return res.status(404).json({ message: "Łowisko nie zostało znalezione!" });
        }

        // Check if user already rated
        const existingRatingIndex = lowisko?.oceny?.findIndex(o => o?.uzytkownik?.toString() === uzytkownikId);
        console.log("Existing rating index:", existingRatingIndex);
        if (existingRatingIndex !== -1) {
            // Update existing rating
            console.log("Updating existing rating...");
            lowisko.oceny[existingRatingIndex].ocena = ocena;
        } else {
            // Add new rating
            console.log("Adding new rating...");
            lowisko.oceny.push({ uzytkownik: uzytkownikId, ocena: ocena });
        }

        // Recalculate average and count
        lowisko.iloscOcen = lowisko.oceny.length;
        const totalSum = lowisko.oceny.reduce((acc, curr) => acc + curr.ocena, 0);
        console.log("Total sum of ratings:", totalSum);
        lowisko.sredniaOcen = parseFloat((totalSum / lowisko.iloscOcen).toFixed(1));
        console.log("New average rating:", lowisko.sredniaOcen);

        await lowisko.save();
        res.status(200).json({ message: "Ocena została zapisana!", lowisko });
    } catch (err) {
        res.status(500).json({ message: "Błąd podczas oceniania łowiska!", error: err });
    }
});

module.exports = router;
