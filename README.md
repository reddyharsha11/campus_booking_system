# Campus Booking System API

This is the backend API for a campus resource booking system, built with Node.js, Express, MongoDB, and TypeScript. It provides a secure, RESTful API for user authentication, resource management, and booking creation/conflict prevention.

-----

## Features

  * **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
  * **Password Hashing:** Passwords are never stored in plain text, using `bcrypt` for hashing.
  * **Resource Management:** Endpoints to create, list, and search for campus resources (e.g., "Meeting Room 101", "Physics Lab").
  * **Booking Engine:** Users can book available resources for a specific time slot.
  * **Conflict Prevention:** The API automatically checks for and prevents double bookings (booking conflicts).
  * **User-Specific Data:** Users can view a list of all their own bookings.

-----

## Tech Stack

  * **Backend:** Node.js, Express
  * **Language:** TypeScript
  * **Database:** MongoDB with Mongoose
  * **Authentication:** JSON Web Tokens (JWT)
  * **Password Hashing:** `bcrypt`
  * **CORS:** `cors` package for frontend integration

-----

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

  * [Node.js](https://nodejs.org/en/) (v18 or later recommended)
  * [npm](https://www.npmjs.com/) (comes with Node.js)
  * [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

-----

## Installation & Setup

Follow these steps to get your local development environment running.

**1. Clone the Repository:**

```bash
git clone https://github.com/reddyharsha11/campus_booking_system.git
cd campus_booking_system
```

**2. Install Dependencies:**

```bash
npm install
```

**3. Set Up Environment Variables:**
Create a file named `.env` in the root of the project. This file holds your secret keys and database connection strings.

Copy the contents of `.env.example` (if you have one) or use the template below:

```
# .env file

# Your MongoDB connection string
MONGO_URL=mongodb://localhost:27017/campusBooking

# Your secret key for signing JWT tokens
JWT_SECRET=thisisavérystrongandsecretkey

# The port your server will run on
PORT=1106
```

**4. Run the Development Server:**
This command will compile your TypeScript, start the server, and watch for any file changes.

```bash
npm run dev
```

Your server should now be running at `http://localhost:1106`.

-----

## API Endpoints

All API endpoints are prefixed with `/api`.

### 👤 User Routes (`/api/users`)

| Method | Route | Description | Auth Required? |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Registers a new user. | No |
| `POST` | `/login` | Logs in an existing user, returns a JWT. | No |
| `GET` | `/:id/bookings` | Gets a list of all bookings for a specific user ID. | No (or User) |

### 📚 Resource Routes (`/api/resources`)

| Method | Route | Description | Auth Required? |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Gets a list of all available resources. | No |
| `POST` | `/` | **(Admin)** Creates a new resource. | Admin |
| `GET` | `/search` | Searches resources by name, type, location, etc. (e.g., `/search?query=lab`) | No |
| `POST` | `/book` | Creates a new booking for a resource. Checks for conflicts. | **Yes (JWT)** |

### 📅 Booking Routes (`/api/bookings`)

| Method | Route | Description | Auth Required? |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | **(Admin)** Gets a list of *all* bookings in the system. | Admin |
| `PUT` | `/update/:id` | Updates a booking's details (e.g., status). | **Yes (JWT)** |
| `PUT` | `/cancel/:id` | Cancels a booking (e.g., sets status to 'Cancelled'). | **Yes (JWT)** |
