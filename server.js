(function(){
    var requestHanddler = require('./request-handler');
    var logger = require('./logger');
    var url  = require('url');
    var http = require('http');
    var portToServe = 8008;

    http.createServer(serverToServe).listen(portToServe);
    logger.info('Server Started on ', portToServe);
    function serverToServe(request, response){
        if(url.parse(request.url).pathname == '/' || url.parse(request.url).pathname == '/index.html'){
            requestHanddler.returnIndex(response);
        }else{
            switch(true){
                case /ˆfavicon.ico\b/.test(url.parse(request.url).pathname):
                    requestHanddler.returnFile(response,request);
                    break;
                case /.css\b/.test(url.parse(request.url).pathname):
                    requestHanddler.returnCss(response,request);
                    break;
                default:
                    requestHanddler.returnHtml(response,request);
                    break;
            }
        }
    };
})();