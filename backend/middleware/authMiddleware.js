const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('🔍 Authorization Header:', authHeader); // 👈 LOG IMPORTANTE

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ Token malformado o no enviado');
    return res.status(401).json({ error: 'Token no proporcionado o malformado' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🔐 Token extraído:', token); // 👈 LOG IMPORTANTE

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token válido:', decoded); // 👈 LOG IMPORTANTE
    req.user = decoded;
    next();
  } catch (err) {
    console.log('❌ Error al verificar token:', err.message); // 👈 LOG IMPORTANTE
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = verifyToken;

