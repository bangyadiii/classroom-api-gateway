require("dotenv").config();
const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_USER } = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await api.put(`/api/v1/auth/${id}`, req.body);
        console.log(response);
        const result = response.data;

        return res.status(200).json(result);
    } catch (error) {
        console.log("Error", error.message);
        if (error.code === "ECONNREFUSED") {
            return ERROR(res, 500, "Service User Unavailable");
        }
        const data = error?.response?.data ?? error.message;
        const status = error?.response?.status ?? 500;
        return res.status(status).json(data);
    }
};
