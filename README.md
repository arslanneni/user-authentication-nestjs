# User Authentication with NestJS

This project is a **user authentication system** built using **NestJS**, **PostgreSQL**, and **JWT**. It supports secure login functionality with password encryption and token-based authentication.

---

## Stack and Technologies

### Backend
- **[NestJS](https://nestjs.com/):** A progressive Node.js framework for building efficient and scalable server-side applications.
- **[TypeScript](https://www.typescriptlang.org/):** Provides strong typing for JavaScript to reduce runtime errors.
- **[PostgreSQL](https://www.postgresql.org/):** A powerful, open-source relational database.
- **[TypeORM](https://typeorm.io/):** ORM for database integration and operations.
- **[argon2](https://github.com/ranisalt/node-argon2):** For secure password hashing.
- **[JWT](https://jwt.io/):** Used for stateless, token-based authentication.

### Utilities
- **[dotenv](https://github.com/motdotla/dotenv):** For environment-based configuration.

---

## Functionality

### Key Features
1. **Secure Password Encryption**:
   - User passwords are hashed using **argon2** before storing them in the database, ensuring strong security.
   
2. **Token-Based Authentication**:
   - On successful login, a **JWT (JSON Web Token)** is generated with user-specific details and sent to the client. This token can be used for further authentication in protected routes.

3. **Environment-Specific Configuration**:
   - Sensitive data such as the JWT secret and database credentials are managed securely via a `.env` file.

### Flow of User Authentication
1. **User Login**:
   - The system verifies the user's email.
   - The provided password is compared against the hashed password stored in the database using **argon2**.
   
2. **JWT Token Generation**:
   - On successful login, a JWT is generated with the user's `id` and `email` as payload and returned to the client.

3. **Database Integration**:
   - All user details, including hashed passwords and token status, are stored in a PostgreSQL database.

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- [PostgreSQL](https://www.postgresql.org/) (v12 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

2. **Install Dependencies:**:
   ```bash
   npm install

3. **Configure Environment Variables:**:
   ```bash
   JWT_SECRET=your_jwt_secret
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=testdb

4. **Configure Environment Variables:**:
   ```bash
   npm run start:dev

