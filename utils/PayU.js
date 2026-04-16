const axios = require('axios');
const querystring = require('querystring');

const PAYU_BASE_URL = process.env.PAYU_BASE_URL || 'https://secure.snd.payu.com'; // Sandbox by default

const getAccessToken = async () => {
    try {
        const response = await axios.post(`${PAYU_BASE_URL}/pl/standard/user/oauth/authorize`, 
            querystring.stringify({
                grant_type: 'client_credentials',
                client_id: process.env.PAYU_CLIENT_ID || '', // Placeholder Sandbox Client ID
                client_secret: process.env.PAYU_CLIENT_SECRET || '' // Placeholder Sandbox Client Secret
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('PayU Auth Error:', error.response?.data || error.message);
        throw error;
    }
};

const createPayUOrder = async (orderData) => {
    const token = await getAccessToken();
    
    try {
        const response = await axios.post(`${PAYU_BASE_URL}/api/v2_1/orders`, 
            {
                ...orderData,
                merchantPosId: process.env.PAYU_POS_ID || '492328',
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                maxRedirects: 0,
                validateStatus: (status) => status >= 200 && status < 400
            }
        );
        return response.data;
    } catch (error) {
        console.error('PayU Order Error:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = { createPayUOrder };