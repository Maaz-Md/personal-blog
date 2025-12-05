export function handleGuestRoutes(req, res, path) {

    if (path === "/" && req.method == 'GET') {
        res.writeHead(200, {"content-type": "text/plain"});
        res.end("welcome to home page");
        return true;

    } 

    if (path.startsWith("/articles/") && req.method == 'GET') {
        res.writeHead(200, {"content-type": "text/plain"});
        res.end(`Articles page with id` );
        return true;
    } 

    return false;


}