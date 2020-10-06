const http = require('http');
const fs = require('fs');
const { isRegExp } = require('util');

// A lot of info coming your way
const server = http.createServer((request, response) => {
    // How requests Work (Part 2)
    console.log(`Looking for route ${request.url}`);
    
    if(request.url === '/') {
        response.writeHead(200, { 'Content-Type' : 'text/html'});
        const readStream2 = fs.createReadStream(__dirname + '/index.html', 'utf8');
        readStream2.pipe(response);
    } else if(request.url === '/users') {
        response.writeHead(200, { 'Content-Type' : 'application/json'});
        const obj = [
            {
                name: 'Flo',
                email: 'flo@me.com'
            },
            {
                name: 'Josh',
                email: 'Josj@me.com'
            }
        ];
        response.end(JSON.stringify(obj));
    } else if(request.url === '/text') {
        response.writeHead(200, { 'Content-Type' : 'text/plain'});
        const readStream = fs.createReadStream(__dirname + '/lorem.txt', 'utf8');
        readStream.pipe(response)
    } else if(request.url === '/about') {
        response.writeHead(200, { 'Content-Type' : 'text/html'});
        const readSteam3 = fs.createReadStream(__dirname + '/about.html', 'utf8');
        readSteam3.pipe(response);
    } else {
        response.writeHead(404, { 'Content-Type' : 'text/html'});
        const readSteam4 = fs.createReadStream(__dirname + '/error.html', 'utf8');
        readSteam4.pipe(response);
    }


    // Request and response objects are filled with headers
    // Headers are objects that hold key value pairs that hold metadata for response
    // Status Code (200 Below) - let us know the status of request
    // As the programmer, we will define our status codes


    // The Content-Type can be
    // a) text/plain - will return plain text, and the stringified version of raw code
    // b) text/html - will return the html page 
    // c) application/json - returns the json 
    // response.writeHead(200, { 'Content-Type' : 'application/json'});
    
    // // This is the stream that WILL send the data - params: (__dirname + '/file', utf8)
    // const readStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    // // This is where the stream SENDS the data
    // readStream.pipe(response)
    
    // response.end('This is my first Node Server');
    // .end - closes the response 

    // const obj = [
    //     {
    //         name: 'Flo',
    //         email: 'flo@me.com'
    //     },
    //     {
    //         name: 'Josh',
    //         email: 'Josj@me.com'
    //     }
    // ];

    // response.end(JSON.stringify(obj));
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});