const axios = require("axios");

module.exports = (baseUrl) => {
    return axios.crete({
        baseUrl: baseUrl,
        timeout: 5000,
    });
};
