const {
    JWT_REFRESH_TOKEN,
    JWT_SECRET_TOKEN,
    JWT_SECRET_TOKEN_EXPIRED,
    URL_SERVICE_USER,
} = process.env;
const jwt = require("jsonwebtoken");
const apiAdapter = require("../../apiAdapter");
const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res, next) => {
    try {
        const { refresh_token, email } = req.body;
        if (!refresh_token || !email) {
            return res
                .status(400)
                .json({ status: "error", message: "input invalid" });
        }
        const result = await api.get("/api/v1/refresh-token", {
            params: { refresh_token: refresh_token },
        });
        jwt.verify(refresh_token, JWT_REFRESH_TOKEN, (error, decoded) => {
            if (error) {
                return res
                    .status(403)
                    .json({ status: "error", message: error.message });
            }
            console.log(decoded.data.email);
            if (email !== decoded.data.email) {
                return res
                    .status(403)
                    .json({ status: "error", message: "email is not valid" });
            }
            const token = jwt.sign({ data: decoded.data }, JWT_SECRET_TOKEN, {
                expiresIn: JWT_SECRET_TOKEN_EXPIRED,
            });
            return res.status(200).json({
                status: "success",
                message: "berhasil mendapatkan token",
                data: {
                    access_token: token,
                },
            });
        });
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res
                .status(500)
                .json({ status: "error", message: "service unavailable." });
        }

        const { status, data } = error.response;
        return res.status(status).json({ status: "error", message: data });
    }
};
