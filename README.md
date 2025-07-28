# Blog API Backend

A fully-featured RESTful API for a blogging platform built with **Node.js**, **Express**, **PostgreSQL**, and **Sequelize ORM**.

## Features

- JWT-based Authentication with bcrypt-hashed passwords
- CRUD operations for Posts
- Commenting system (Create, Update, Delete)
- Toggle Likes on posts
- Image Upload support using `multer`
- Sequelize ORM with PostgreSQL
- Environment-based configuration with `.env`
- Organized MVC-style folder structure
- RESTful API routes

---

## Project Structure

```
blog-api-backend/
├── config/             # Sequelize DB config
├── controllers/        # Controller functions (auth, post, like, comment)
├── middlewares/        # Authentication & File Upload Middleware
├── models/             # Sequelize models
├── routes/             # API route handlers
├── migrations/         # Sequelize migration files
├── seeders/            # Data seeding (optional)
├── uploads/            # Uploaded images
├── .env                # Environment variables
├── .gitignore          # Git ignored files
├── app.js              # Main Express app
├── server.js           # App entry point
└── README.md           # Project documentation
```

---

## Authentication Routes

### Register

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

### Login

```
POST /api/auth/login
```

```json
{
  "email": "hari@example.com",
  "password": "123456"
}
```

> Returns JWT token to be used in Authorization header as `Bearer <token>`.

---

## Post Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET    | `/api/posts` | Public | Get all posts |
| GET    | `/api/posts/:id` | Public | Get a specific post |
| POST   | `/api/posts/` | Auth | Create a new post |
| PUT    | `/api/posts/:id` | Auth | Update your post |
| DELETE | `/api/posts/:id` | Auth | Delete your post |

> You can also upload an image via `multipart/form-data` with `image` field.

---

## Comment Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST   | `/api/comments/:postId` | Auth | Add a comment to a post |
| PUT    | `/api/comments/:id` | Auth | Edit a comment |
| DELETE | `/api/comments/:id` | Auth | Delete a comment |

---

## Like Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST   | `/api/likes/:postId` | Auth | Like or Unlike a post |

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

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=3000
DB_USER=your_db_user
DB_PASS=your_db_pass
DB_NAME=your_db_name
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

### 4. Setup the Database

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
- **Authentication**: JWT + bcrypt
- **File Uploads**: multer
- **Environment Config**: dotenv

---

## Author

**Hari Patel**  
[GitHub](https://github.com/haripatel07)

---

## License

Licensed under the [MIT License](LICENSE).
