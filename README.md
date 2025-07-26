# Blog API Backend

A fully-featured RESTful API for a blogging platform built with **Node.js**, **Express**, **PostgreSQL**, and **Sequelize ORM**.

## Features

- ✅ User Registration & Login with JWT Authentication
- 🔐 Password hashing using bcrypt
- 🧾 CRUD for Posts, Comments, and Likes *(Coming soon)*
- 📦 Sequelize ORM for database interaction
- 🌱 Environment configuration with `dotenv`
- 📂 Organized folder structure (MVC-style)
- 🌐 RESTful routing and error handling

## 📁 Project Structure

```
blog-api-backend/
├── config/             # Sequelize DB config
├── controllers/        # Controller functions
├── middlewares/        # Middleware (auth, error handling)
├── models/             # Sequelize models
├── routes/             # Route files (auth, posts, etc.)
├── migrations/         # Sequelize migration files
├── seeders/            # Dummy data population (optional)
├── .env                # Environment variables
├── .gitignore          # Ignored files in Git
├── app.js              # Express app setup
├── server.js           # Entry point
└── README.md           # Project documentation
```

## 🧪 API Endpoints

### 🔐 Auth Routes

#### Register

```
POST /api/auth/register
```

```json
{
  "username": "hari",
  "email": "hari@example.com",
  "password": "123456"
}
```

#### Login

```
POST /api/auth/login
```

```json
{
  "email": "hari@example.com",
  "password": "123456"
}
```

#### Successful Login Response

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "username": "hari",
    "email": "hari@example.com",
    "role": "user"
  }
}
```

> Use the token in the `Authorization: Bearer <token>` header for protected routes.

---

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/haripatel07/blog-api-backend.git
cd blog-api-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure `.env`

Create a `.env` file:

```env
PORT=3000
DB_USER=your_db_username
DB_PASS=your_db_password
DB_NAME=your_db_name
DB_HOST=localhost
JWT_SECRET=your_secret_key
```

### 4. Setup Database

```bash
npx sequelize db:create
npx sequelize db:migrate
```

### 5. Run the Server

```bash
npm start
```

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT & bcrypt
- **Environment Config**: dotenv

---

## TODO

- [x] User Authentication (Register & Login)
- [ ] Post CRUD Routes
- [ ] Comment & Like Routes
- [ ] Pagination & Search
- [ ] Image Uploads with Multer / Cloudinary

---

## Author

**Hari Patel**  
[GitHub](https://github.com/haripatel07)

---

## License

This project is licensed under the MIT License.
