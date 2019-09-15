const utils = require("./utils.js");

function dependencies(websites) {
    let promises = utils.websites_to_promises_depencencies(websites);
    promises.forEach(p => {
        p.then(res => {
            res.dependencies.forEach( d => {
                console.log(res.name + ', ' + d);
            })        
        })
        .catch(err => console.log(err))
    });
}

const file = 'websites.csv';
utils.find_websites(file).then(res => {
    dependencies(websites);
});