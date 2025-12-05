export function handleAdminRoutes(req, res, path) {

    if (path === "/admin/" && req.method == 'GET') {
        res.writeHead(200, {"content-type": "text/plain"});
        res.end("welcome to admin page");
        return true;
    }

    else if (path === "/admin/add/" && req.method == 'GET') {
        res.writeHead(200, {"content-type": "text/plain"});
        res.end("add new article page");
        return true;
    } 
    
    else if (path === "/admin/add/" && req.method == 'POST') {
        res.writeHead(200, {"content-type": "text/plain"});
        res.end("article added");
        return true;
    } 

    else if (path.startsWith("/admin/edit/") && req.method == 'GET') {
        res.writeHead(200, {"content-type": "text/plain"});
        res.end(`Edit article page with id`)
        return true;
    }

    else if (path.startsWith("/admin/edit/") && req.method == 'POST') {
        res.writeHead(200, {"content-type": "text/plain"});
        res.end(`article updated  with id `)
        return true;
    }

    else if (path.startsWith("/admin/delete/") && req.method == 'POST') {
        res.writeHead(200, {"content-type": "text/plain"});
        res.end(`article deleted  with id `);
        return true;
    }
    
    return false;
    
}