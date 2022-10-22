const { ERROR } = require("../../../helpers/response-formatter");
const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    try {
        const response = await api.get("/api/v1/lessons", {
            params: {
                ...req.query,
            },
        });
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log("Error", error.message);
        if (error.code === "ECONNREFUSED") {
            return ERROR(res, 500, "Service Course Unavailable");
        }
        const data = error?.response?.data ?? error.message;
        const status = error?.response?.status ?? 500;
        return res.status(status).json(data);
    }
};
