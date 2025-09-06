// Load environment variables from the .env file
require('dotenv').config();

// Import necessary libraries
const express = require('express');
const cors = require('cors');
const ImageKit = require('imagekit');

// Initialize the Express app
const app = express();
const port = process.env.PORT || 3001; // Use port 3001 by default

// --- IMPORTANT: Security Configuration ---
// This enables Cross-Origin Resource Sharing (CORS).
// It's crucial for allowing your front-end website to communicate with this server.
// For production, you should restrict this to your actual website's domain for better security.
// Example: app.use(cors({ origin: 'https://your-vcard-app.com' }));
app.use(cors());


// --- ImageKit SDK Initialization ---
// The SDK is initialized with the keys from your .env file.
// This is secure because this code only runs on your server, not in the user's browser.
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


// --- The Authentication Endpoint ---
// This is the URL that your front-end application will contact.
app.get('/auth', (req, res) => {
    try {
        // This function securely generates a temporary token and signature.
        const authenticationParameters = imagekit.getAuthenticationParameters();
        
        // Send the generated parameters back to the front-end as a JSON response.
        res.status(200).json(authenticationParameters);

    } catch (error) {
        console.error("Error generating ImageKit authentication parameters:", error);
        // If something goes wrong, send an error response.
        res.status(500).json({ message: "Could not generate authentication parameters." });
    }
});


// --- Start the Server ---
// This tells your server to start listening for requests on the specified port.
app.listen(port, () => {
    console.log(`ImageKit Auth Server is running on port ${port}`);
});
