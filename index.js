import http from "http";
import { handleGuestRoutes } from "./routes/guestRoutes.js";
import { handleAdminRoutes } from "./routes/adminRoutes.js";


const server = http.createServer((req, res) => {

    const url = new URL(req.url, "http://localhost:3000");
    const path = url.pathname;

    if (handleGuestRoutes(req, res, path)) {
        return;
    }

    else if (handleAdminRoutes(req, res, path)) {
        return;
    }

    res.writeHead(404, {"content-type": "text/plain"});
    res.end("Page not found");
    
})

server.listen(3000, () => {
    console.log("server running at http://localhost:3000/");
})

// sync "/" path with "/admin" path 