function check_api_key(apikey) {
    const fs = require('fs');
    try {
        if(!apikey) return {
            error: 1,
            msg: 'আমি বুঝতে পারছি না'
        }
        const data_apikey = require(global.APIKEY);
        if (!data_apikey.find(i => i.apikey == apikey)) {
            return {
                error: 1,
                msg: 'APIKEY ভুল'
            }
        } else {
            let APIKEY = data_apikey.find(i => i.apikey == apikey);
            if (APIKEY.request == 0) {
                return {
                    error: 1,
                    msg: 'আপনার APIKEY মেয়াদ শেষ হয়ে গেছে'
                }
            } 
            else {
                if (APIKEY.type == 'free') {
                    APIKEY.request = APIKEY.request - 1;
                    fs.writeFileSync(global.APIKEY, JSON.stringify(data_apikey, null, 2), 'utf-8');
                    return {
                        error: 0
                    }
                }
                if (APIKEY.type == 'premium') {
                    return {
                        error: 0
                    }
                }
            }
        }
    } catch (e) {
        return {
            error: 1,
            msg: 'আপনার API KEY এর সাথে কিছু ভুল হয়েছে!'
        }
    }
}

module.exports = {
    check_api_key
};
