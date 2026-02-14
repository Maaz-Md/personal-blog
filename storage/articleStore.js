import fs from "fs";
import path, { join }  from "path";
import { fileURLToPath } from "url";

//get the filepath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//get the absolute path
const articles_Dir = path.join(__dirname, "../data/articles");


// check if data/articles directory exists
if (!fs.existsSync(articles_Dir)) {
    fs.mkdirSync(articles_Dir, { recursive: true });
}


//helper function to get all articles with thier filepaths
function readArticlesWithPath() {

    //returns an array of file names
    const files = fs.readdirSync(articles_Dir);

    //map method returns new array of article objects
    return files.map(file => {
        const filePath = path.join(articles_Dir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const article =  JSON.parse(fileContent);

        return { article, filePath };
      
    });

}

//helper functions to get a article with its filepath
function findArticleById(id) {
    const numericId = Number(id);
    const entries = readArticlesWithPath();

    for (const entry of entries) {
        if (entry.article.id === numericId) {
        return entry; 
        }
    } 

    return null;

}



export function getAllArticles() {
    return readArticlesWithPath().map(entry => entry.article);
}


export function getArticleById(id) {

    const result = findArticleById(id);
    return result ? result.article : null;
}


export function createArticle({ title, body, date }) {

     const entries = readArticlesWithPath();

    let maxId = 0;

    for (const { article } of entries) {
        if (article.id > maxId) {
            maxId = article.id;
        }

    }

    //Generate new id;
    const newId = maxId + 1;

    const newArticle = {
        id: newId,
        title,
        body,
        date
    };

    const fileName = `article-${newId}.json`;
    const articlePath = path.join(articles_Dir, fileName);

    fs.writeFileSync(articlePath, JSON.stringify(newArticle));

    
    return newArticle;

}

export function updateArticle(id, updates) {

   const result = findArticleById(id)

   if (!result) {
      return null;
   }

   const { article, filePath } = result;

    const editedArticle = {
        ...article,
        ...updates,
        id: article.id
    }

    fs.writeFileSync(filePath,  JSON.stringify(editedArticle));
    return editedArticle;

}



export function deleteArticle(id) {
    const result = findArticleById(id)

    if (!result) {
        return null;
    }

    const { article, filePath } = result;

        
    fs.unlinkSync(filePath);
            
    return article;
}

