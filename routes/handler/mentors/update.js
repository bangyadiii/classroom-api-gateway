const { URL_SERVICE_COURSE } = process.env;
const { ERROR } = require("../../../helpers/response-formatter");
const apiAdapter = require("../../apiAdapter");
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    try {
        const mentorId = req.params.id;
        const result = await api.put(`/api/v1/mentors/${mentorId}`, req.body);
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
