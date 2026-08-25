# 🍔 CartBit

> A complete Food Delivery Backend API built with Node.js, Express.js and MongoDB.

CartBit is a **Food Delivery Backend System** designed to manage customers, restaurants, providers, food items, categories, orders, and online payments. The project provides RESTful APIs with authentication, role-based authorization, image uploads, and **Razorpay payment integration**.

---

## 🚀 Features

### 👤 User Management

* User Registration & Login
* <img width="1917" height="905" alt="Screenshot 2026-08-25 151805" src="https://github.com/user-attachments/assets/84efc820-baff-4b7b-b94b-5dd88064a60b" />
* User CRUD Operations
* JWT Authentication
* Role-Based Authorization
* Password Hashing

* <img width="1917" height="867" alt="Screenshot 2026-08-25 151902" src="https://github.com/user-attachments/assets/59cf33cb-b422-4070-a1c1-fb5bc3d927e6" />


### 🏪 Restaurant Management

* Create Restaurant
*  <img width="1916" height="902" alt="Screenshot 2026-08-25 152242" src="https://github.com/user-attachments/assets/e73e5099-4721-4011-baef-f66ec74d018e" />
* Get Restaurant Details
* Update Restaurant
* Delete Restaurant
* Restaurant Open/Close Status
* Restaurant & Provider Relationship


### 👨‍🍳 Provider Management

* Provider CRUD Operations
* * <img width="1917" height="907" alt="Screenshot 2026-08-25 152432" src="https://github.com/user-attachments/assets/12f88203-f724-4f0b-b7ce-f767c3eae9a9" />
* Provider Verification
* Restaurant Management
* Document Upload
* Bank Account Details

### 👨‍💼 Admin Management

* Admin Authentication
* User Management
* Restaurant Management
* Provider Management
* Food Management
* Category Management
* Order Management
* Dashboard Statistics

### 🍕 Food Management

* Create Food
* <img width="1911" height="901" alt="Screenshot 2026-08-25 152923" src="https://github.com/user-attachments/assets/3e030309-7d5b-4d28-b62c-421cb857ba0d" />
* Get Food
* Update Food
* Delete Food
* Restaurant-wise Food
* Category-wise Food
* Food Image Upload

### 📂 Category Management

* Create Category
* Get Category
* Update Category
* Delete Category
* Category Image Upload

### 🛒 Order Management

* Create Order
* <img width="1916" height="901" alt="Screenshot 2026-08-25 153620" src="https://github.com/user-attachments/assets/8b5d01c2-aeaf-410a-99ac-d6a19153b1d5" />
* Get Orders
* Update Order
* Delete Order
* Order Status Management
* Multiple Food Items per Order
* Automatic Subtotal Calculation
* Automatic Total Amount Calculation

### 💳 Razorpay Payment

* Razorpay Test Mode Integration
* <img width="1917" height="897" alt="Screenshot 2026-08-25 153723" src="https://github.com/user-attachments/assets/53a4f944-0293-4f5a-82a0-2a358d2d3cf2" />
* Create Razorpay Order
* Razorpay Checkout
* Payment Verification
* Razorpay Signature Verification
* Payment Status Management
* <img width="1917" height="971" alt="Screenshot 2026-08-25 154639" src="https://github.com/user-attachments/assets/4f72381c-066d-4637-a60f-d61ac8917c5c" />
* Failed Payment Handling

---

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**

### Authentication & Security

* **JWT**
* **bcrypt**
* **Helmet**
* **CORS**
* **Express Rate Limit**
* **Cookie Parser**
* **Mongo Sanitize**
* **XSS Clean**
* **HPP**

### Image & File Upload

* **Multer**
* **Cloudinary**

### Payment Gateway

* **Razorpay**

### Tools

* **Postman**
* **Git & GitHub**
* **VS Code**
* **Nodemon**

---

## 🏗️ Project Architecture

```text
                    ┌───────────────┐
                    │    Client     │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  Express API  │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          Authentication  Controllers   Middleware
              │             │             │
              └─────────────┼─────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    MongoDB    │
                    └───────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   Cloudinary  │
                    └───────────────┘

                            +
                            
                    ┌───────────────┐
                    │   Razorpay    │
                    │    Payment    │
                    └───────────────┘
```

---

## 📁 Project Structure

```text
CartBit/
│
├── config/
│   ├── db.js
│   └── razorpay.js
│
├── controllers/
│   ├── user.controller.js
│   ├── admin.controller.js
│   ├── restaurant.controller.js
│   ├── provider.controller.js
│   ├── food.controller.js
│   ├── category.controller.js
│   ├── order.controller.js
│   └── payment.controller.js
│
├── middleware/
│   ├── auth.js
│   ├── checkRole.js
│   └── HttpError.js
│
├── models/
│   ├── User.js
│   ├── Restaurant.js
│   ├── Provider.js
│   ├── Food.js
│   ├── Category.js
│   ├── Order.js
│   └── Payment.js
│
├── routes/
│   ├── user.routes.js
│   ├── admin.routes.js
│   ├── restaurant.routes.js
│   ├── provider.routes.js
│   ├── food.routes.js
│   ├── category.routes.js
│   ├── order.routes.js
│   └── payment.routes.js
│
├── public/
│   └── payment.html
│
├── config/
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 🔐 Authentication

CartBit uses **JWT-based authentication** to secure protected APIs.

### User Roles

```text
Admin
Customer
Provider
```

Each role has different permissions and access to different resources.

---

## 💳 Razorpay Payment Flow

```text
Customer
    │
    ▼
Create Order
    │
    ▼
Create Razorpay Order
    │
    ▼
Razorpay Checkout
    │
    ▼
Complete Payment
    │
    ▼
Receive Payment Details
    │
    ▼
Verify Razorpay Signature
    │
    ▼
Update Payment Status
    │
    ▼
Payment Successful
```

---

## 🛒 Order Flow

```text
Select Food
     ↓
Add Food to Order
     ↓
Calculate Subtotal
     ↓
Calculate Total Amount
     ↓
Create Order
     ↓
Choose Payment Method
     ↓
Razorpay Payment
     ↓
Verify Payment
     ↓
Confirm Order
```

---

## 🔒 Security

CartBit implements multiple backend security mechanisms:

* 🔑 JWT Authentication
* 🔐 Password Hashing
* 👮 Role-Based Authorization
* 🛡️ Helmet Security Headers
* 🚦 Rate Limiting
* 🌐 CORS Protection
* 🧹 MongoDB Query Sanitization
* 🛡️ XSS Protection
* 🔒 HTTP Parameter Pollution Protection
* 🔑 Environment Variables for Secrets

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/ankitmor96/CartBit.git
```

### 2. Go to Project Directory

```bash
cd CartBit
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RAZORPAY_API_KEY=your_razorpay_key
RAZORPAY_API_SECRET=your_razorpay_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 5. Start Development Server

```bash
npm run dev
```

Server will run on:

```text
http://localhost:5000
```

---

## 🧪 API Testing

All APIs can be tested using **Postman**.

Main API modules:

```text
User
Admin
Restaurant
Provider
Food
Category
Order
Payment
```

---

## 📊 Main Modules

| Module     | CRUD | Authentication | Role Based Access |
| ---------- | :--: | :------------: | :---------------: |
| User       |   ✅  |        ✅       |         ✅         |
| Admin      |   ✅  |        ✅       |         ✅         |
| Restaurant |   ✅  |        ✅       |         ✅         |
| Provider   |   ✅  |        ✅       |         ✅         |
| Food       |   ✅  |        ✅       |         ✅         |
| Category   |   ✅  |        ✅       |         ✅         |
| Order      |   ✅  |        ✅       |         ✅         |
| Payment    |   —  |        ✅       |         ✅         |

---

## 🔮 Future Improvements

* 📍 Real-Time Order Tracking
* ⭐ Restaurant & Food Reviews
* 🔎 Advanced Food Search
* 📱 WhatsApp Notifications
* 🚴 Delivery Partner Management
* 📊 Advanced Admin Dashboard
* 🔔 Real-Time Order Notifications
* 🌐 Production Payment Integration

---

## 👨‍💻 Developer

### Ankit Mor

**Full-Stack Web Developer | MERN Stack**

GitHub: **[@ankitmor96](https://github.com/ankitmor96)**

---

## ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

**Made with ❤️ using Node.js, Express.js & MongoDB**

