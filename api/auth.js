// api/auth.js

// Make sure to install imagekit: npm install imagekit
const ImageKit = require('imagekit');

// Initialize ImageKit using environment variables for security
const imagekit = new ImageKit({
  publicKey: process.env.VITE_IMAGEKIT_PUBLIC_KEY || process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.VITE_IMAGEKIT_PRIVATE_KEY || process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.VITE_IMAGEKIT_URL_ENDPOINT || process.env.IMAGEKIT_URL_ENDPOINT
});

// This is the main serverless function handler
module.exports = (req, res) => {
  // --- IMPORTANT: CORS Headers ---
  // This allows your web application to make requests to this server function.
  // For production, you should replace '*' with your app's actual domain for better security.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Browsers send a "preflight" OPTIONS request to check permissions before the actual request.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  // --- End of CORS Handling ---

  // Generate the temporary, secure authentication parameters
  const authenticationParameters = imagekit.getAuthenticationParameters();

  // Send the parameters back to the front-end application as a JSON response
  res.status(200).json(authenticationParameters);
};
