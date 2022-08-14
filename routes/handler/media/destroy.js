const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_MEDIA } = process.env;
const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res, next) => {
    //
    try {
        const upload = await api.delete(`/media/${req.params.id}`, req.body);
        return res.json(upload.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res
                .status(500)
                .json({ status: "error", message: "service unavailable" });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
};
