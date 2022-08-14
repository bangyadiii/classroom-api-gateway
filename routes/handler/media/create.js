const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_MEDIA } = process.env;
const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res, next) => {
    //
    try {
        const upload = await api.post("/media", req.body);
        return res.json(upload.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                meta: { status: "error", message: "service unavailable" },
                data: [],
            });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
};
