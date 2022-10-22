const { URL_SERVICE_USER } = process.env;
const apiAdapter = require("../../apiAdapter");

module.exports = async (req, res) => {
    const api = apiAdapter(URL_SERVICE_USER);
    try {
        const response = await api.post("/api/v1/auth/logout", req.body);

        const result = response.data;

        return res.status(result.code).json(result);
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
