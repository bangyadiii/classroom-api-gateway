const { URL_SERVICE_COURSE } = process.env;
const { ERROR } = require("../../../helpers/response-formatter");
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
        console.log("Error", error.message);
        if (error.code === "ECONNREFUSED") {
            return ERROR(res, 500, "Service Course Unavailable");
        }
        if (error.response) {
            const data = error?.response?.data;
            const status = error?.response?.status;
            return ERROR(res, status, data);
        } else {
            return ERROR(res, 500, error.message);
        }
    }
};
