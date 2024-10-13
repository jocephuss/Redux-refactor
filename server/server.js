const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Set up CORS
  const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  // Serve static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // Use Apollo middleware for GraphQL endpoint
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Start the server once the database connection is open
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Start Apollo Server
startApolloServer();
