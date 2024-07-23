## Library Management System API

## Models

### User
- **username**: String
- **password**: String
- **email**: String
- **role**: String (values: "admin", "librarian", "member")

### Book
- **title**: String
- **author**: ObjectId (reference to Author)
- **genre**: String
- **publicationDate**: Date
- **availableCopies**: Number

### Author
- **name**: String
- **birthDate**: Date
- **nationality**: String

## Routes

### User Routes
- **POST /api/users/register**: Register a new user (admin, librarian, member)
- **POST /api/users/login**: Log in a user and get a JWT token
- **GET /api/users/:id**: Get user profile (admin access required)
- **PUT /api/users/:id**: Update user profile (login required)
- **DELETE /api/users/:id**: Delete a user (admin access required)

### Book Routes
- **POST /api/books**: Add a new book (admin access required)
- **GET /api/books**: Get a list of books
- **GET /api/books/:id**: Get details of a specific book
- **PUT /api/books/:id**: Update book details (admin access required)
- **DELETE /api/books/:id**: Delete a book (admin access required)

### Author Routes
- **POST /api/authors**: Add a new author (admin access required)
- **GET /api/authors**: Get a list of authors
- **GET /api/authors/:id**: Get details of a specific author
- **PUT /api/authors/:id**: Update author details (admin access required)
- **DELETE /api/authors/:id**: Delete an author (admin access required)
