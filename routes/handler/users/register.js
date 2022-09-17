require("dotenv").config();
const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_USER } = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res, next) => {
    try {
        const user = await api.post("/api/v1/auth/register", req.body);
        console.log(user);
        return res.status(200).json(user.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                meta: { status: "error", message: "Service Unavailable." },
                data: [],
            });
        }
        console.log("error response", error);
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
};
