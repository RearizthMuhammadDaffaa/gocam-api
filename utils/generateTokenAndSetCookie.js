import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId, role) => {
  // Buat token JWT dengan userId dan role
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token akan berlaku selama 7 hari
  });

  // Setel token di cookie
  res.cookie('token', token, {
    httpOnly: true, // Cookie hanya bisa diakses oleh server, bukan JavaScript di browser
    secure: process.env.NODE_ENV === 'production', // Secure hanya digunakan di produksi
    sameSite: 'strict', // Cookie hanya dikirim ke server yang sama
    maxAge: 7 * 24 * 60 * 60 * 1000, // Masa berlaku cookie selama 7 hari
  });

  return token;
};