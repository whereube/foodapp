export const corsMiddleware = (req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    // You can also set other CORS headers here if needed
    res.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next(); // Pass control to the next middleware
};