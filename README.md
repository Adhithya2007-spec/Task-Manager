# 🚀 Task Manager | Full-Stack Web Application

✨ A modern, responsive, and user-friendly web application designed to simplify daily task management, organise activities, and enhance personal productivity.

## 🌟 Key Features

- 🔐 **User Authentication:** Secure user registration and login.
- 🛡️ **JWT Authorization:** Protected API endpoints and user-specific task access.
- ➕ **Task Creation:** Create tasks with titles, descriptions, and due dates.
- 📋 **Task Management:** View, update, and delete tasks.
- ✅ **Progress Tracking:** Mark tasks as completed or pending.
- 🔎 **Task Filtering:** Filter tasks by All, Pending, and Completed.
- 💾 **Data Persistence:** Store and retrieve user and task information using MongoDB Atlas.
- 🎨 **Responsive UI:** Clean, modern, and intuitive user interface.

## 📦 Application Modules

### 🔐 1. User Authentication Module
- User registration and login.
- Secure password hashing using bcryptjs.
- JWT-based authentication.
- User logout functionality.

### 📝 2. Task Management Module
- Create tasks with titles and descriptions.
- Set due dates for tasks.
- View all saved tasks.
- Update task completion status.
- Delete unwanted tasks.

### 📊 3. Task Organisation Module
- View all tasks in one place.
- Filter tasks by All, Pending, and Completed.
- Monitor task completion status.
- Organise daily activities efficiently.

### 🗄️ 4. Database Management Module
- Store user information in MongoDB Atlas.
- Manage task records using Mongoose.
- Associate tasks with their respective users.
- Retrieve and maintain stored task data.

### 🎨 5. User Interface Module
- Responsive and user-friendly design.
- Interactive task dashboard.
- Simple navigation and task controls.
- Consistent styling and visual presentation.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| 🎨 Frontend | React.js, JavaScript, HTML5, CSS3 |
| ⚙️ Backend | Node.js, Express.js |
| 🗄️ Database | MongoDB Atlas, Mongoose |
| 🔒 Authentication | JWT, bcryptjs |
| 🔗 API Communication | Axios |

## 📁 Project Structure

```text
Task-Manager/
│
├── 📂 backend/
│   ├── 📂 middleware/
│   ├── 📂 models/
│   ├── 📂 routes/
│   ├── 📄 server.js
│   └── 📄 package.json
│
└── 📂 frontend/
    ├── 📂 public/
    ├── 📂 src/
    ├── 📄 index.html
    └── 📄 package.json
```

## 🎯 Project Objective

The primary objective of this project is to develop an efficient task management solution that enables users to organise daily activities, monitor progress, and manage tasks conveniently while demonstrating practical full-stack web development skills.


---

⭐ *Developed with dedication to make everyday task management simpler, smarter, and more organised.*
