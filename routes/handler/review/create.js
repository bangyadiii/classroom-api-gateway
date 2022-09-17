const URL_SERVICE_COURSE = process.env.URL_SERVICE_COURSE;
const apiAdapter = require("../../apiAdapter");
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    try {
        const response = await api.post(`/api/v1/reviews`, req.body);
        return res.status(response.status).json(response.data);
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
