import http from "http";
import { handleGuestRoutes } from "./routes/guestRoutes.js";
import { handleAdminRoutes } from "./routes/adminRoutes.js";
import { handleStaticFiles } from "./staticHandler.js";



const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;

    if ( handleStaticFiles(req, res, path)) {
        return;
    }
    
    if (handleGuestRoutes(req, res, path)) {
        return;
    }

    if (handleAdminRoutes(req, res, path)) {
        return;
    }

    res.writeHead(404, {"content-type": "text/plain"});
    res.end("Page not found");
    
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
