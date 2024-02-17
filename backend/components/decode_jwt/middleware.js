// Import the jsonwebtoken library
const jwt = require('jsonwebtoken');

// Middleware function to decode the authentication token and extract user ID
const decodeTokenMiddleware = (req, res, next) => {
  // Retrieve the token from the request cookie
  const token = req.cookies.token;

  // Verify the token and extract the payload (user ID)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle invalid or expired token
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Extract the user ID from the decoded payload
    req.userId = decoded.userId;
    next();
  });
};

module.exports = decodeTokenMiddleware;
