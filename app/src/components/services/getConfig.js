var dev = require('../../constants/development.json');
var prod = require('../../constants/production.json');
const getConfig = () => {
    if(process.env.NODE_ENV === 'development') {
        return dev;
    } else if (process.env.NODE_ENV === 'production') {
        return prod;
    } else {
        return dev;
    }
}

export default getConfig;
