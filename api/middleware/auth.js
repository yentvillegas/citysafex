import jwt  from 'jsonwebtoken';
export function validateToken(req, res, next) {
    const SECRET_KEY = process.env.SECRET_KEY; // misma clave que en server.js

console.log('SECRET_KEY', SECRET_KEY)
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1]; // formato: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Token faltante' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.tokenDecoded = decoded; // guardamos datos del usuario decodificados
        next(); // continúa con la ruta
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
}
