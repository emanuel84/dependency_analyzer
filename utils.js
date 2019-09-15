function getRemoteData(url, name) {
    return new Promise((resolve, reject) => {
      // select http or https module, depending on reqested url
      const lib = url.startsWith('https') ? require('https') : require('http');
      const request = lib.get(url, (response) => {
        if (response.statusCode < 200 || response.statusCode > 299) {
           reject(new Error('Failed to load page, status code: ' + response.statusCode));
         }

        const len = response.headers['content-length'];
        const body = [];                
        response.on('data', (chunk) => body.push(chunk));
        response.on('end', () => resolve({'content':body.join(''), 'len':len, 'name': name}));
      });
      request.on('error', (err) => reject(err))
      })
};

function getLocalData(file, name) {
    return new Promise((resolve, reject) => {
        const fs = require("fs");
        var stats = fs.statSync(file);
        var fileSize = stats["size"];
        fs.readFile(file, 'utf-8', function(err, data) {
            resolve({'content':data, 'len': fileSize, 'name': name});
        });
    })

}

function isRemote(string) {
    return (string.startsWith('http://') || string.startsWith('https://'))
}

function find_depencies(string) {   
    const regexp = RegExp("<\s*script[^>]* src=[\"|'][^>]*[\"|']>(.*?)<\s*\/\s*script>",'g');
    const regSrc = RegExp("src=[\"|\'](.*?)[\"|\']", "g");
    let match;
    let dependencies = [];
    while ((match = regexp.exec(string)) !== null) {
      var arr = match[0].match(regSrc);      
      if (arr.length > 0) {
        dependencies.push(arr[0].split("/").pop().replace("\"", "").replace("\'", ""));
      }
    }
    return dependencies;
}

function website_to_promise(web) {
    return (isRemote(web.path)) ?  getRemoteData(web.path, web.name) : getLocalData(web.path, web.name);
}

function find_dependencies_to_promise(web) {
    return new Promise((resolve, reject) => {
        let dependencies = find_depencies(web.content);
        resolve({'name': web.name, 'dependencies': dependencies})
    }) 
}

function websites_to_promises_depencencies(websites) {
    return websites.map(web => { 
                return website_to_promise(web).then(res => find_dependencies_to_promise(res))
           });
}


function find_websites(file) {
    websites = [];

    return new Promise((resolve, reject) => {
        const fs = require("fs");
        fs.readFile(file, 'utf-8', function(err, data) {
            let dataArray = data.split(/\r?\n/);
            dataArray.forEach(line => {
                let arr = line.split(",");
                websites.push({'name': arr[0], 'path': arr[1]});
            });                
            resolve(websites);
        });
    })

}

module.exports = {
    getRemoteData: getRemoteData,
    getLocalData: getLocalData,
    isRemote: isRemote,
    find_depencies: find_depencies,
    website_to_promise: website_to_promise,
    find_dependencies_to_promise: find_dependencies_to_promise,
    websites_to_promises_depencencies: websites_to_promises_depencencies,
    find_websites: find_websites
}