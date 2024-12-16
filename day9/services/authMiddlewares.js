const jwt = require('jsonwebtoken');
const { JwtService } = require('../jwtService'); // Assuming JwtService is implemented
const { Op } = require('sequelize');
const models = require('../models');

const checkBearerToken = (req, res, next) => {
  // Check if token is provided
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Extract user_id and role from payload
    req.user_id = decoded.user_id;
    req.role = decoded.role;

    // Check if the role matches the portal name
    const portal = req.params.portal;
    if (req.role !== portal) {
      return res.status(403).json({ message: 'Forbidden: Role does not match portal' });
    }

    // Pass control to the next middleware
    next();
  });
};

module.exports = checkBearerToken;
