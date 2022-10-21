require("dotenv").config();
const { ERROR } = require("../../../helpers/response-formatter");
const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_ORDER_PAYMET } = process.env;

const api = apiAdapter(URL_SERVICE_ORDER_PAYMET);

module.exports = async (req, res) => {
    try {
        const response = await api.post(`/api/v1/notifications`, req.body);
        const result = response.data;

        return res.status(200).json(result);
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
