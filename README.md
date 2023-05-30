# Login

![StockPriceLogin Screenshot](screenshots/Screenshot1.png)

# HomePage

![StockPriceHomepage Screenshot](screenshots/Screenshot2.png)

## Technologies Used

- **React.js** for the frontend user interface
- **Node.js** and Express.js for the backend server
- **MongoDB** for the database
- **React Router** for routing
- **JSON Web Tokens (JWT)** for user authentication

## Getting Started

To rund the App locally on your machine, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/aslezar/giga-growth-ventures-assignment
   ```

2. Navigate to the project directory:

   ```shell
   cd giga-growth-ventures-assignment/server
   ```

3. Install the dependencies for the backend:

   ```shell
   npm install
   ```

4. Install the dependencies for the frontend:

   ```shell
   cd ../client
   npm install
   ```

5. Make a `.env` and update the configuration values with your own:

   - Set the `PORT` PORT number to start server on
   - Set the `MONGO_URI` to your MongoDB connection string
   - Set the `JWT_SECRET` to a secret key for JWT authentication
   - Set the `JWT_LIFETIME` JWT liftime

6. Start the backend server:

   ```shell
   npm run server
   ```

7. Start the frontend development server:

   ```shell
   npm run client
   ```

8. Access the App in your web browser at `http://localhost:3000`.
