const utils = require("./utils.js");

function length(websites) {    
    let promises = websites.map(web => {return utils.website_to_promise(web)});
    promises.forEach(p => {
        p.then(res => {
            console.log(res.name + ", " + res.len);
        })
        .catch(err => console.log(err))
    });
}

const file = 'websites.csv';
utils.find_websites(file).then(res => {
    length(websites);
});