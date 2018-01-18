const config  = require('./model/config'),
      restify = require('restify'),
      fs = require('fs'),
      path = require('path');

const server = restify.createServer({
    name    : config.name,
    version : config.version
});


server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use((req, res, next) => [ console.log(new Date(), req.method, req.url), next() ]);
server.get(/static\/?(js|css|media)\/.*/, restify.plugins.serveStatic({ directory: __dirname + '/src/public' }));


server.get(/.*/, (req, res) => {
    try { 
        fs.readFile(__dirname + '/src/public/index.html', (err, data) => [ res.setHeader('Content-Type', 'text/html'), res.writeHead(200), res.end(data) ]);
    } catch(e) { 
        res.end(e);
    }
});


server.listen(80, () => console.log(server.name, server.url));