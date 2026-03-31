const https = require('https');
const querystring = require('querystring');

const verifyTurnstileToken = async (token) => {
    if (!token) return false;

    // Use Cloudflare's testing secret key if no real one is provided in .env
    const secret = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

    const postData = querystring.stringify({
        secret: secret,
        response: token
    });

    const options = {
        hostname: 'challenges.cloudflare.com',
        port: 443,
        path: '/turnstile/v0/siteverify',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(body);
                    resolve(result.success);
                } catch (e) {
                    resolve(false);
                }
            });
        });

        req.on('error', (e) => {
            console.error('Turnstile verification error:', e);
            resolve(false);
        });

        req.write(postData);
        req.end();
    });
};

module.exports = { verifyTurnstileToken };