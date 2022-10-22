const { ERROR } = require("../../../helpers/response-formatter");
const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_MEDIA } = process.env;
const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res, next) => {
    try {
        const upload = await api.delete(`/media/${req.params.id}`, req.body);
        return res.status(upload.status).json(upload.data);
    } catch (error) {
        console.log("Error", error.message);
        if (error.code === "ECONNREFUSED") {
            return ERROR(res, 500, "Service Media Unavailable");
        }
        const data = error?.response?.data ?? error.message;
        const status = error?.response?.status ?? 500;
        return res.status(status).json(data);
    }
};
