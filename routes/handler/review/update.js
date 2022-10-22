const { ERROR } = require("../../../helpers/response-formatter");
const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    //
    const { id } = req.params;
    try {
        const result = await api.put(`/api/v1/reviews/${id}`, req.body);
        return res.status(result.status).json(result.data);
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
