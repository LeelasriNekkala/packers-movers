# 🚚 Packers & Movers Management System (MERN Stack)

A full-stack **Packers & Movers service platform** built using the **MERN stack (MongoDB, Express, React, Node.js)**.
The application allows users to request moving services, generate quotes, and place orders while admins manage services, quotes, inquiries, and orders.

This project demonstrates **authentication, role-based access control, REST APIs, and full stack integration**.

---

# 🛠 Tech Stack

## Frontend

* React (Vite)
* Axios
* Redux Toolkit
* React Router

## Backend

* Node.js
* Express.js
* JWT Authentication
* Cookie-based authentication

## Database

* MongoDB
* Mongoose ODM

## Testing

* cURL

---

# 📂 Project Structure

client/

public/

src/

api/ # Axios calls

assets/ # images

components/

common/

forms/

layout/

features/

auth/

services/

orders/

pages/

public/

Home.jsx

Login.jsx

Register.jsx

Services.jsx

QuickQuote.jsx

user/

UserDashboard.jsx

RequestService.jsx

NewInquiry.jsx

ViewOrders.jsx

admin/

AdminDashboard.jsx

AddService.jsx

ViewServices.jsx

ViewQuotes.jsx

ViewMessages.jsx

routes/

utils/

App.jsx

main.jsx

server/

config/

db.js

controllers/

auth.controller.js

service.controller.js

quote.controller.js

inquiry.controller.js

order.controller.js

middleware/

auth.middleware.js

role.middleware.js

error.middleware.js

models/

User.js

Service.js

Quote.js

Inquiry.js

Order.js

routes/

auth.routes.js

service.routes.js

quote.routes.js

inquiry.routes.js

order.routes.js

utils/

generateToken.js

server.js

---

# 🔐 Authentication

This project implements **JWT authentication with HttpOnly cookies**.

Features:

* Secure user registration
* Secure login
* Protected routes
* Role-based authorization

Roles:

* **User**
* **Admin**

---

# 👤 Test Credentials

## Admin Login

Email

[leela@gmail.com](mailto:leela@gmail.com)

Password

123456

---

## User Login

Email

[gathvik@gmail.com](mailto:gathvik@gmail.com)

Password

123456

---

# ⚙ Environment Variables

Create `.env` file inside **server folder**

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
---

# 🚀 Running the Project

## Clone Repository

https://github.com/LeelasriNekkala/packers-movers.git

cd packers-movers

---

## Backend Setup

cd server
npm install
npm run dev

Expected output:

Server running on port 3000

MongoDB Connected

---

## Frontend Setup

cd client
npm install
npm run dev

Frontend runs on:

http://localhost:5173

---

# 🧪 API Testing Using cURL

## Register User

curl -X POST http://localhost:3000/api/auth/register 
-H "Content-Type: application/json" 
-d "{"name":"Leelasri","email":"[leela@gmail.com](mailto:leela@gmail.com)","password":"123456","phone":"999999999"}" 
-c cookies.txt

Response:

{
"success": true,
"message": "User registered successfully",
"user": {
"id": "699ea0cf09c80a0083e25808",
"name": "Leelasri",
"email": "[leela@gmail.com](mailto:leela@gmail.com)",
"role": "user"
}
}

---

## Login User

curl -X POST http://localhost:3000/api/auth/login 
-H "Content-Type: application/json" 
-d "{"email":"[leela@gmail.com](mailto:leela@gmail.com)","password":"123456"}" 
-c cookies.txt

Response:

{
"success": true,
"message": "Login successful"
}

---

# 📦 Service Management

## Add Service (Admin)

curl -X POST http://localhost:3000/api/services 
-H "Content-Type: application/json" 
-d "{"title":"Office Shifting","description":"Corporate office relocation service","price":10000}" 
-b cookies.txt

Response:

{
"success": true,
"message": "Service added successfully",
"service": {
"title": "Office Shifting",
"price": 10000
}
}

---

## Get All Services

curl http://localhost:3000/api/services

Response:

{
"success": true,
"count": 2,
"services": [
{
"title": "Office Shifting",
"price": 10000
},
{
"title": "House Shifting",
"price": 5000
}
]
}

---

# 📊 Quote System

## Submit Quote (User)

curl -X POST http://localhost:3000/api/quotes 
-H "Content-Type: application/json" 
-d "{"name":"Srinu","phone":"9876543210","fromLocation":"Hyderabad","toLocation":"Bangalore","moveDate":"2026-03-10","message":"Need packing service also"}" 
-b usercookies.txt

Response:

{
"success": true,
"message": "Quote submitted successfully"
}

---

## Admin View Quotes

curl http://localhost:3000/api/quotes -b admincookies.txt

Response:

{
"success": true,
"count": 1,
"quotes": [...]
}

---

# 📦 Order Creation

curl -X POST http://localhost:3000/api/orders 
-H "Content-Type: application/json" 
-d "{"fromLocation":"Hyderabad","toLocation":"Bangalore","moveDate":"2026-03-10","price":12000}" 
-b admincookies.txt

Response:

{
"success": true,
"message": "Order placed successfully"
}

---

# 📩 Inquiry System

## Create Inquiry

curl -X POST http://localhost:3000/api/inquiries 
-H "Content-Type: application/json" 
-d "{"name":"Ramesh","phone":"9876543210","fromLocation":"Hyderabad","toLocation":"Chennai","moveDate":"2026-03-15","houseSize":"2BHK"}"

Response:

{
"success": true,
"message": "Inquiry submitted successfully"
}

---

# 🔒 Security Features

* Password hashing using **bcrypt**
* JWT authentication
* HttpOnly cookies
* Role-based access control
* Protected routes middleware

---

# 📚 Learning Outcomes

This project demonstrates:

* Full stack MERN architecture
* Authentication with JWT
* Role-based authorization
* RESTful API design
* MongoDB schema design
* Secure backend development
* API testing using cURL

---

# 👨‍💻 Author

Leelasri
MERN Stack Developer
