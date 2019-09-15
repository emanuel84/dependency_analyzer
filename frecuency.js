const utils = require("./utils.js");

function frecuency(websites) {
    let promises = utils.websites_to_promises_depencencies(websites);
    Promise.all(promises).then(res => {
        let arr_frec = {};
        res.forEach(r => {
            r.dependencies.forEach( d => {
                arr_frec[d] = (d in arr_frec) ? arr_frec[d] + 1 : 1;
            })
        });
        Object.keys(arr_frec).forEach(k => 
            console.log(k + ', ' + arr_frec[k])
        );
    })
}

const file = 'websites.csv';
utils.find_websites(file).then(res => {
    frecuency(websites);
});