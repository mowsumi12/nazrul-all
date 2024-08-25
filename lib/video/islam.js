var owner = "Islamick Cyber Chat"
var caption = "ISLAMICK VIDE"
exports.name = '/video/islam';
exports.index = async(req, res, next) => {
    try {
        const n = require('./data/islam.json');
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
