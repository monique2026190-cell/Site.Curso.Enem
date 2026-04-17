const logMiddleware = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logDetails = {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
        };
        console.log('HTTP Request:', logDetails);
    });
    next();
};
export default logMiddleware;
