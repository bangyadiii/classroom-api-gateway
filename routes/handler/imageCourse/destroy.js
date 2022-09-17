const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    const { id } = req.params;
    try {
        const upload = await api.delete(`/api/v1/image-course/${id}`);
        return res.status(upload.status).json(upload.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                meta: { status: "error", message: "service media unavailable" },
                data: [],
            });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
};
