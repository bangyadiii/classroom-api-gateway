require("dotenv").config();
const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_MEDIA } = process.env;

const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res, next) => {
    try {
        const media = await api.get("/media");
        return res.status(200).json(media.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res
                .status(500)
                .json({ status: "error", message: "Service Unavailable." });
        }

        next(error);
    }
};
