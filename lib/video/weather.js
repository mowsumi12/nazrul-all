var owner = "Islamick Cyber Chat"
var caption = "WEATHER VIDE"
exports.name = '/video/weather';
exports.index = async(req, res, next) => {
    try {
        const n = require('./data/weather.json');
        var video = n[Math.floor(Math.random() * n.length)].trim();
        res.jsonp({
            data: video,
            count: n.length,
            owner: `${owner}`,
            cyber: `${caption}`
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
