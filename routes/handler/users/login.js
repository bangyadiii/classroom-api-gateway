require("dotenv").config();
const jwt = require("jsonwebtoken");
const apiAdapter = require("../../apiAdapter");
const {
    URL_SERVICE_USER,
    JWT_SECRET_TOKEN,
    JWT_REFRESH_TOKEN,
    JWT_SECRET_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res, next) => {
    try {
        const response = await api.post("/api/v1/auth/login", req.body);
        const user = response.data.data.user;
        const accessToken = jwt.sign(
            {
                data: { id: user.id, email: user.email, role: user.role },
            },
            JWT_SECRET_TOKEN,
            { expiresIn: JWT_SECRET_TOKEN_EXPIRED }
        );
        const refreshToken = jwt.sign(
            {
                data: { id: user.id, email: user.email, role: user.role },
            },
            JWT_REFRESH_TOKEN,
            { expiresIn: JWT_REFRESH_TOKEN_EXPIRED }
        );

        await api.post("/api/v1/refresh-token", {
            refresh_token: refreshToken,
            user_id: user.id,
        });

        return res
            .status(200)
            .json({ access_token: accessToken, refresh_token: refreshToken });
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                meta: { status: "error", message: "Service Unavailable." },
                data: [],
            });
        }
        return res.status(500).json(error);
    }
};
