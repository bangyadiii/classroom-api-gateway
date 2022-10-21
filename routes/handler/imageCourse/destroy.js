const { ERROR } = require("../../../helpers/response-formatter");
const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    const { id } = req.params;
    try {
        const upload = await api.delete(`/api/v1/image-course/${id}`);
        return res.status(upload.status).json(upload.data);
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
