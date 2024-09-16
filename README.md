
## Prerequisites
- React Js
- Node.js
- MongoDB
- Git

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/harsh0565/Tutedude-Assignment.git
   cd Tutedude-Assignment
   ```

2. **Install backend dependencies:**

   ```sh
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```sh
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `server` directory with the following content:

   ```env
   PORT=8080
   MONGOURL=your_mongodb_connection_string
   JWT_SECRET = your jwt secret || flksdfj^%*&%^&jhkm
   ```

## Running the Application

1. **Start the backend server:**

   ```sh
   cd backend
   npm run dev
   ```

   The server will run on `http://localhost:8080`.

2. **Start the frontend development server:**

   ```sh
   cd ../frontend
   npm run dev
   ```

   The client will run on `http://localhost:5173`.

---

Replace `your_mongodb_connection_string` with your actual MongoDB connection string. This README provides clear setup and run instructions. 

