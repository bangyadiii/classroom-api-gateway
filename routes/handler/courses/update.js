const { URL_SERVICE_COURSE } = process.env;
const apiAdapter = require("../../apiAdapter");
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const response = await api.put(`/api/v1/courses/${courseId}`, req.body);

        return res.status(response.status).json(response.data);
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
