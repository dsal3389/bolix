const fs = require('fs');
const http = require('http');


const frontendPath = 'frontend';
const port = 8080;


getFilePath = (file) => {
    /* return path to the requested file */
    const prefix = file.split('/')[1];

    if(prefix == '')
        return frontendPath +'/html/index.html';
    return frontendPath +file;
}

getContentTypeFor = (type) => {
    /* returns the correct content type */
    switch(type){
        case 'js':
            return 'text/javascript';
        
        case 'css':
            return 'text/css';
        
        default:
            return 'text/html';
    };
}

get404Response = (req, res) => {
    /* reading the 404 html file and returning its content */
    const path = getFilePath('/html/pages/404.html');
    fs.readFile(path, (err, content) => {
        res.writeHeader(404, {"Content-Type": "text/html"});
        res.write(content);
        res.end();
    });
    console.warn(`[ ERR 404 HTML ] not found ${req.url}`);
}

getResponse = (req, res, path) => {
    /* getting requested file and returning it content */
    fs.readFile(path, (err, content) => {
        res.write(content);
        res.end();
    });
    console.log(`[ 200 ] send ${path} [${req.url}]`);
};

http.createServer((req, res) => {
    const urlPrefix = req.url.split('/')[1];
    const path = getFilePath(req.url);

    if(!fs.existsSync(path))
        return get404Response(req, res);
    
    res.writeHeader(200, {"Content-Type": getContentTypeFor(urlPrefix)});
    getResponse(req, res, path);
}).listen(port);
console.log(`[ INIT ] server started running on http://localhost:${port}`);
