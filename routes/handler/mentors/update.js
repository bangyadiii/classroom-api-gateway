const { URL_SERVICE_COURSE } = process.env;
const apiAdapter = require("../../apiAdapter");
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    try {
        const mentorId = req.params.id;
        const result = await api.put(`/api/v1/mentors/${mentorId}`, req.body);
        return res.status(result.status).json(result.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: "error",
                message: "Course service unavailable.",
            });
        }
        return res.status(500).json({
            status: "error",
            message: error.code,
        });
    }
};