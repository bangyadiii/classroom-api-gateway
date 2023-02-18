const { URL_SERVICE_COURSE } = process.env;
const { ERROR } = require("../../../helpers/response-formatter");
const apiAdapter = require("../../apiAdapter");
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    try {
        const result = await api.get("/api/v1/mentors");
        return res.status(result.status).json(result.data);
    } catch (error) {
        console.log("Error", error.message);
        if (error.code === "ECONNREFUSED") {
            return ERROR(res, 500, "Service course unavailable");
        }
        const msg = error?.response?.data ?? error.message;
        const status = error?.response?.status ?? 500;
        return ERROR(res, status, msg);
    }
};
