require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SUCCESS, ERROR } = require("../../../helpers/response-formatter");
const apiAdapter = require("../../apiAdapter");
const {
    URL_SERVICE_USER,
    JWT_SECRET_TOKEN,
    JWT_REFRESH_TOKEN,
    JWT_SECRET_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
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

        const payload = {
            refresh_token: refreshToken,
            user_id: user.id,
        };
        const resp = await api.post("/api/v1/refresh-token", payload);
        return SUCCESS(res, resp.status, "Login succuss", {
            access_token: accessToken,
            refreshToken: refreshToken,
        });
    } catch (error) {
        console.log("Error", error.message);
        if (error.code === "ECONNREFUSED") {
            return ERROR(res, 500, "Service User Unavailable");
        }
        const data = error?.response?.data ?? error.message;
        const status = error?.response?.status ?? 500;
        return res.status(status).json(data);
    }
};
