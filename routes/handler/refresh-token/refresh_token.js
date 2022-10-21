const {
    JWT_REFRESH_TOKEN,
    JWT_SECRET_TOKEN,
    JWT_SECRET_TOKEN_EXPIRED,
    URL_SERVICE_USER,
} = process.env;
const jwt = require("jsonwebtoken");
const { ERROR, SUCCESS } = require("../../../helpers/response-formatter");
const apiAdapter = require("../../apiAdapter");
const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    try {
        const { refresh_token, email } = req.body;
        if (!refresh_token || !email) {
            return ERROR(res, 400, "Input is invalid");
        }
        const result = await api.get("/api/v1/refresh-token", {
            params: { refresh_token: refresh_token },
        });
        jwt.verify(refresh_token, JWT_REFRESH_TOKEN, (error, decoded) => {
            if (error) {
                return ERROR(res, 403, "FORBIDDEN", error.message);
            }
            if (email !== decoded.data.email) {
                return ERROR(res, 400, "FORBIDDEN", "Email is not valid");
            }
            const token = jwt.sign({ data: decoded.data }, JWT_SECRET_TOKEN, {
                expiresIn: JWT_SECRET_TOKEN_EXPIRED,
            });
            return SUCCESS(res, 200, "Berhasil mendapatkan token", {
                access_token: token,
            });
        });
    } catch (error) {
        console.log("Error", error.message);
        if (error.code === "ECONNREFUSED") {
            return ERROR(res, 500, "Service User Unavailable");
        }
        if (error.response) {
            const data = error?.response?.data;
            const status = error?.response?.status;
            return ERROR(res, status, data);
        } else {
            return ERROR(res, 500, error.message);
        }
    }
};
