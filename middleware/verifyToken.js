import jwt from 'jsonwebtoken';
import User from '../models/User.js';

 const verifyToken = (allowedRoles = ['user']) => async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized - no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Unauthorized - invalid token' });
    }

    // Cek apakah user ada dan valid
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - user not found' });
    }

    // Cek apakah user memiliki role yang diperlukan
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden - insufficient permissions' });
    }

    
    req.userId = decoded.userId;
    req.userRole = user.role;  // simpan role untuk keperluan lebih lanjut
    req.userName = user.name;
    next();
  } catch (error) {
    console.log('Error in verifyToken ', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default verifyToken;