const { URL_SERVICE_COURSE } = process.env;
const { ERROR } = require("../../../helpers/response-formatter");
const apiAdapter = require("../../apiAdapter");
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
    try {
        const config = {
            "Content-Type": "application/json; charset UTF-8",
            Accept: "application/json",
        };
        const response = await api.get(`/api/v1/chapters`, {
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
        if (error.response) {
            const data = error?.response?.data;
            const status = error?.response?.status;
            return ERROR(res, status, data);
        } else {
            return ERROR(res, 500, error.message);
        }
    }
};
