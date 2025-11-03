# 🏡 Airbnb Clone (Node.js + Express + MongoDB + EJS)

This project is a **full-stack Airbnb Clone** built using **Node.js**, **Express**, **MongoDB (Mongoose)**, and **EJS** templating engine.  
It follows the **MVC (Model-View-Controller)** architecture and allows users to sign up as **Host** or **Guest**, explore listings, and manage accommodations dynamically.

---

## 🚀 Features

- 🔐 User Authentication (Login & Signup)
- 👥 Role-based Access (Guest / Host)
- 🏠 Host can create, view, and manage property listings
- ❤️ Guests can view and mark properties as favourites
- 🧭 Fully dynamic frontend using **EJS templates**
- 🗃️ MongoDB for storing all user and property data
- ⚙️ MVC architecture for scalable and maintainable codebase

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Backend** | Node.js, Express.js |
| **Frontend** | EJS, JavaScript, CSS |
| **Database** | MongoDB with Mongoose |
| **Architecture** | MVC (Model-View-Controller) |
| **Other Tools** | Nodemon, ESLint |
```
```
## 📁 Folder Structure
```
AIRBNB/
│
├── .github/ # GitHub related files
├── .vscode/ # VS Code settings
│
├── controllers/ # Controllers - handle app logic
│ ├── authController.js
│ ├── error.js
│ ├── hostController.js
│ ├── storeController.js
|
├── model/ # Mongoose models (for MongoDB)
│ ├── home.js
| ├── favorite.js
│
├── public/ # Static files (CSS, JS, images)
│
├── routes/ # Route handlers
│ ├── authRouter.js
│ ├── hostRouter.js
│ ├── storeRouter.js
│
├── utils/ # Utility/helper functions
│
├── view/ # EJS views (Frontend templates)
│ ├── auth/
│ ├── host/
│ ├── Partials/
│ └── store/
│
├── app.js # Main application entry point
├── eslint.config.mjs # ESLint configuration
├── nodemon.json # Nodemon setup
├── package.json # Project dependencies
└── package-lock.json
```

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository
```bash
https://github.com/manishsingh8/Airbnb.git
cd airbnb-clone

```
Install dependencies
```
npm install
```
Run the project
```
npm start
```
🧩 Folder Explanation

| Folder/File      | Description                                              |
| ---------------- | -------------------------------------------------------- |
| **controllers/** | Contains logic for handling requests/responses           |
| **models/**      | Mongoose schemas for MongoDB collections                 |
| **routes/**      | Express route definitions                                |
| **views/**       | EJS templates for UI rendering                           |
| **public/**      | Static assets like CSS, JS, and images                   |
| **app.js**       | Entry point that sets up Express, routes, and middleware |

✨ Author
```
Manish Singh
Email: manishsingh04031998@gmail.com
Frontend Developer | Node.js & React Enthusiast
```


