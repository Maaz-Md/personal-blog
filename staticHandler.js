import fs from "fs";
import pathModule from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathModule.dirname(__filename)

export function handleStaticFiles(req, res, path) {

    if (path !== "/styles.css") {
        return false;
    }

    const filePath = pathModule.join(__dirname,  "public", "styles.css");

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("File not found");
        } else {
            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);
        }
    });

    return true; 
}