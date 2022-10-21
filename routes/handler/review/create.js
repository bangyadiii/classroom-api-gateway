const URL_SERVICE_COURSE = process.env.URL_SERVICE_COURSE;
const { ERROR } = require("../../../helpers/response-formatter");
const apiAdapter = require("../../apiAdapter");
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        const response = await api.post(`/api/v1/reviews`, req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log("Error", error.message);
        if (error.code === "ECONNREFUSED") {
            return ERROR(res, 500, "Service User Unavailable");
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
