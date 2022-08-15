const { URL_SERVICE_USER } = process.env;
const apiAdapter = require("../../apiAdapter");

module.exports = async (req, res, next) => {
    const api = apiAdapter(URL_SERVICE_USER);
    try {
        const response = await api.post("/api/v1/auth/logout", req.body);

        const result = response.data;

        return res.status(result.code).json(result);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                meta: { status: "error", message: "Service Unavailable." },
                data: [],
            });
        }
        next(error);
    }
};
