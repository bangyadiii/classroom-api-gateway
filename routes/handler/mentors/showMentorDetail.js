const URL_SERVICE_COURSE = process.env.URL_SERVICE_COURSE;
const apiAdapter = require("../../apiAdapter");
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    try {
        const mentorId = req.params.id;
        const result = await api.get(`/api/v1/mentors/${mentorId}`);
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
