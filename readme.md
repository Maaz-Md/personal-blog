# 📝 A Simple  Blog Taken From  [roadmap.sh](https://roadmap.sh/projects/personal-blog) 

A minimal blog content management system built using vanilla Node.js (without Express).  
This project demonstrates file-based CRUD operations, Basic Authentication, and manual route handling.

---

## 🚀 Features

- 📄 Create, Read, Update, Delete (CRUD) articles
- 🔐 Http Basic Authentication for admin routes
- 📁 File-based storage using JSON files
- 🗂 Separate guest and admin route handling
- 📅 Articles sorted by newest date first
- 🎨 Simple clean UI with EJS templates

---


---

## 🖥️ Installation and Setup

Follow these steps to run the project locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Maaz-Md/personal-blog.git

# 2️⃣ Navigate into the project directory
cd personal-blog

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
node index.js

# Then open the app in your browser at 
http://localhost:3000
```

---

## 🔐 Admin Access

Admin routes are protected using Basic Authentication.

For demo purposes, the default credentials are:

Username: admin  
Password: 1234  


These credentials are hardcoded for learning purposes 

## 🌍 Live Demo

#### Click **[here](https://personal-blog-q8ij.onrender.com)** to view deployed app

⚠ Note: Free-tier hosting may cause initial delay due to cold start.