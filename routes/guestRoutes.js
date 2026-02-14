import ejs from "ejs";
import  pathModule from "path";
import { fileURLToPath } from "url";
import { getAllArticles, getArticleById } from "../storage/articleStore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname =  pathModule.dirname(__filename);

export function handleGuestRoutes(req, res, path) {

    if (path === "/" && req.method === 'GET') {

        const articles = getAllArticles();
        const viewPath = pathModule.join(__dirname, "../views/home.ejs");

        
        ejs.renderFile(viewPath, { articles }, (err, html) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error rendering page");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });

        return true;

    } 

    if (path.startsWith("/articles") && req.method === 'GET') {

        const id = Number(path.split("/")[2]);

        if (!id) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Article not found");
            return true;
        }

        const article = getArticleById(id);

        if (!article) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Article not found");
            return true;
        }

        const viewPath = pathModule.join(__dirname, "../views/article.ejs");

        ejs.renderFile(viewPath, { article }, (err, html) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error rendering page");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
        
        return true;
    } 

    return false;


}