const axios = require("axios");
require("dotenv").config();

const TIME_OUT = process.env.TIME_OUT;

module.exports = (baseUrl) => {
    return axios.create({
        baseUrl: baseUrl,
        timeout: parseInt(TIME_OUT) || 5000,
    });
};
