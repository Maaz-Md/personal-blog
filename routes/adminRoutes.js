import ejs from "ejs";
import  pathModule from "path";
import { fileURLToPath } from "url";
import querystring from "querystring";
import { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } from "../storage/articleStore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname =  pathModule.dirname(__filename);

export function handleAdminRoutes(req, res, path) {

    if (path === "/admin" && req.method == 'GET') {


        const articles = getAllArticles();
        const viewPath = pathModule.join(__dirname, "../views/admin.ejs");
        
        ejs.renderFile(viewPath, { articles }, (err, html) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error rendering admin dashboard");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
        
        return true;

  
    }

    else if (path === "/admin/add" && req.method == 'GET') {

        const viewPath = pathModule.join(__dirname, "../views/add.ejs");

        ejs.renderFile(viewPath, {}, (err, html) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error rendering add article page");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
        
        return true;
        
    } 
    
    else if (path === "/admin/add" && req.method == 'POST') {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        })

        req.on("end", () => {
            const formData = querystring.parse(body);

            const article = {
                title: formData.title,
                body: formData.body,
                date: formData.date
            };

            try {
                const createdArticle = createArticle(article);

                // Redirect to "/admin" path after POST request 
                res.writeHead(302, {
                    Location: "/admin"
                });
                res.end();

            }  catch (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error creating article");
            }
        });

        return true;
    } 

    
    else if (path === "/admin/edit" && req.method === "GET") {

        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = url.searchParams.get("id");

        const article = getArticleById(id);

        if (!article) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Article not found");
            return true;
        }

        const filePath = pathModule.join(__dirname, "../views/edit.ejs");

        ejs.renderFile(filePath, { article }, (err, html) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Template error");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });

        return true;
        
    }

    else if (path.startsWith("/admin/edit") && req.method == 'POST') {
       

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const formData = querystring.parse(body);

            const id = Number(formData.id);

            const updates = {
                title: formData.title,
                date: formData.date,
                body: formData.body
            };

            const updatedArticle = updateArticle(id, updates);

            if (!updatedArticle) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Article not found");
                return;
            }

            res.writeHead(302, { Location: "/admin" });
            res.end();
        });

        return true;


    }

    else if (path.startsWith("/admin/delete") && req.method == 'POST') {
       const id = path.split("/").pop();

       if (Number.isNaN(id)) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Invalid article ID");
            return true;
        }

        const deletedArticle = deleteArticle(id);

        if (!deletedArticle) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Article not found");
            return true;
        }

        res.writeHead(302, { Location: "/admin" });
        res.end();
        return true;
        
    }
    
    return false;
    
}