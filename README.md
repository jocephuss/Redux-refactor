# Redux Refactor E-Commerce Platform

This project is an e-commerce platform originally built with the Context API and refactored to use Redux for global state management. This refactor provides improved scalability and maintains state management outside of the React ecosystem. The application also integrates with Stripe for payment processing and uses GraphQL for data queries.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Features](#features)
- [License](#license)

## Project Overview
This project is a MERN stack application where users can:
- Browse products, view product details, and add items to a shopping cart.
- Sign up, log in, and manage an account.
- Checkout using Stripe for payment processing.

### Refactor Summary
- **Context API** was replaced with **Redux Toolkit** for global state management.
- **Redux Slices** were created to manage different sections of the state, including authentication, cart, category, product, and user details.
- **GraphQL** is used for querying and mutating data, while **Apollo Client** manages these queries on the frontend.
- **Stripe** is integrated for secure and reliable payment processing.

## Technologies Used
- **Front-End**: React, Redux Toolkit, Apollo Client, Stripe, Vite
- **Back-End**: Node.js, Express, MongoDB, Mongoose, GraphQL
- **Other Tools**: IndexedDB for offline storage, JWT for authentication

## Setup and Installation

### Prerequisites
- Node.js and npm
- MongoDB
- Stripe account for payment processing (test keys can be used)

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone <(https://github.com/jocephuss/Redux-refactor.git)>
   cd Redux-refactor

###
Install Server Dependencies:

bash
Copy code
cd server
npm install
Install Client Dependencies:

bash
Copy code
cd ../client
npm install
Set Up Environment Variables:

Create .env files in both the client and server directories if they are not already included.
Add the following variables:
Server (server/.env):
plaintext
Copy code
MONGODB_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
Client (client/.env):
plaintext
Copy code
REACT_APP_STRIPE_PUBLIC_KEY=<Your Stripe Public Key>
Run Seed Script:

Navigate to the server directory and run the seed command:
bash
Copy code
npm run seed
Start the Application:

Open two terminals: one for the server and one for the client.
In the server terminal:
bash
Copy code
npm start
In the client terminal:
bash
Copy code
npm run dev
Build for Production:

To build the client for production, run:
bash
Copy code
cd client
npm run build
Usage
Home Page:

Browse products and filter by categories.
View the product list and add items to your cart.
Cart:

Click on the cart icon to view items.
Increase, decrease, or remove items from the cart.
Proceed to checkout with Stripe.
Authentication:

Sign up and log in to view personalized order history and enable checkout functionality.
Order History:

View past orders and details associated with each order.
File Structure
Key Files and Directories
plaintext
Copy code

###

Key Changes Made,
Refactored Components: All components previously using GlobalState now use Redux. Examples include ProductItem.jsx, CartItem.jsx, Detail.jsx, OrderHistory.jsx, and Success.jsx.
Removed Context API Files: GlobalState.jsx and reducers.js were removed.
Updated store.js: Consolidated individual slices and configured them in store.js.
Features
Product Catalog: View and filter products by category.
Shopping Cart: Add, remove, and update item quantities.
Order Checkout: Secure payment processing via Stripe.
User Authentication: Sign up, log in, and view order history.
Offline Support: Uses IndexedDB for caching cart data offline.
License
This project is licensed under the MIT License.
