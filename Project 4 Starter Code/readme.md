# OneHand

Donation platform for Jordan - my Project 4 at MERAKI Academy.

## What is this?

This is a website where people can donate to campaigns in Jordan. I built it using React for the frontend and Node.js for the backend.

## Features

- Users can register and login
- Browse donation categories
- Search for campaigns
- Add donations to cart
- Admins can manage everything

## Technologies

- React
- Node.js & Express
- MongoDB
- JWT authentication

## Installation

1. Clone the project
```
git clone your-repo-url
```

2. Install backend
```
cd backend
npm install
```

3. Install frontend
```
cd frontend
npm install
```

4. Add .env file in backend folder with:
```
PORT=5000
MONGO_URI=your_mongodb_connection
SECRET_KEY=your_secret
```

5. Run backend
```
cd backend
npm start
```

6. Run frontend
```
cd frontend
npm start
```

## Main Routes

**Users:**
- POST /users/register
- POST /users/login

**Categories:**
- GET /categories
- POST /categories (admin)

**Packages:**
- GET /packages
- GET /packages/search
- POST /packages (admin)

**Donations:**
- POST /donations
- GET /donations (admin)

## Challenges

The hardest parts were:
- Managing time between bootcamp and my pharmacy
- Connecting frontend to backend
- Getting pagination to work
- Making everything look consistent

## What I Learned

- Context API
- Protected routes
- MongoDB queries
- How to debug on my own

## Future Plans

- Add payment system
- Email confirmations
- Arabic language

---

Ahmad Al-Hayari  
MERAKI Academy Batch 16  
December 2025