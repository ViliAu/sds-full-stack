const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ?
        'index.html' : req.url);

    // Get extension
    const ext = path.extname(filePath);

    // Set content type
    let contentType = 'text/html';

    switch (path.extname(filePath)) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }
    // Check if contentType is text/html but no .html file extension
    if (contentType == "text/html" && ext == "") filePath += ".html";

    fs.readFile(filePath, (err, content) => {
        // Error
        if(err) {
            // Page not found
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-type': 'text/html'});
                    res.end(content, 'utf8');
                });
            }
            // Some other error
            else {
                res.writeHead(500);
                res.end(`Server error: ${err.code}`);
            }
        }
        // Success
        else {
            res.writeHead(200, {'Content-type': contentType});
            res.end(content, 'utf8');
        }
    });
});

const port = process.env.port || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));
