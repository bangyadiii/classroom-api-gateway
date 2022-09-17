const { URL_SERVICE_COURSE } = process.env;
const apiAdapter = require("../../apiAdapter");
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    try {
        const userId = req.user.data.id;
        const courseId = req.body.courseId;
        const result = await api.post("/api/v1/mycourses", {
            user_id: userId,
            course_id: courseId,
        });
        return res.status(result.status).json(result.data);
    } catch (error) {
        console.log(error);
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: "error",
                message: "Course service unavailable",
            });
        }
        return res.status(500).json({
            status: "error",
            message: "pokok error",
        });
    }
};
