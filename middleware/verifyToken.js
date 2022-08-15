const jwt = require("jsonwebtoken");
const { JWT_SECRET_TOKEN } = process.env;

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, JWT_SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ status: "error", message: err.message });
        }
        req.user = decoded;
        return next();
    });
};
