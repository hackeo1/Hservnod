(function() {
    var fs = require('fs');
    var url  = require('url');
    var logger = require('./logger');

    exports.returnFile = returnFile;
    exports.returnCss = returnCss;
    exports.returnIndex = returnIndex;
    exports.returnNotFound = returnNotFound;
    exports.returnHtml = returnHtml;

    function returnFile(response, request){
        var pathname = url.parse(request.url).pathname;
        fs.readFile('./'+pathname ,function(err,data){
            if (err) {
                logger.warning('file ', pathname, ' # Not Found');
                returnNotFound(response);
            }else{
                logger.info('file ', pathname);
                response.writeHead(200);
                response.write(data);
                response.end();
            }
        });
    };

    function returnCss(response, request){
        var pathname = url.parse(request.url).pathname;
        fs.readFile('./'+pathname ,function(err,data){
            if (err) {
                logger.warning('css ', pathname, ' # Not Found');
                returnNotFound(response);
            }else{
                logger.info('css ', pathname);
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.write(data);
                response.end();
            }
        });
    };

    function returnHtml(response, request){
        var pathname = url.parse(request.url).pathname;
        fs.readFile('./'+pathname+'.html' ,function(err,data){
            if (err) {
                logger.warning('html ', pathname, ' # Not Found');
                returnNotFound(response);
            }else{
                logger.info('html ', pathname);
                response.writeHead(200);
                response.write(data);
                response.end();
            }
        });
    };

    function returnIndex(response){
        fs.readFile('./index.html',function(err,data){
            logger.info('html ', '/index.html');
            response.write(data);
            response.end();
        });
    };

    function returnNotFound(response){
        fs.readFile('./404.html',function(err,data){
            logger.warning('html ', '/404.html');
            response.writeHead(404)
            response.write(data);
            response.end();
        });
    };

})();