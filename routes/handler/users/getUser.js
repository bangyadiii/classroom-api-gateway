require("dotenv").config();
const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_USER } = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res, next) => {
    try {
        const id = req.user.data.id;

        const response = await api.get(`/api/v1/auth/${id}`);
        const result = response.data;

        return res.status(200).json(result);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                meta: { status: "error", message: "Service Unavailable." },
                data: [],
            });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
};
