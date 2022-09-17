const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    //
    const { id } = req.params;
    try {
        const result = await api.put(`/api/v1/reviews/${id}`, req.body);
        return res.status(result.status).json(result.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: "error",
                message: "Course service unavailable",
            });
        }
        const { status: statusCode, data } = error.response;
        return res.status(statusCode).json(data);
    }
};
