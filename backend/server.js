const userRoutes = require("./routes/userRoutes");
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use("/api/users", userRoutes);
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);
// Test route
app.get('/', (req, res) => {
    res.send('Task Manager Backend is Running!')
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully!')

        // Start server only after database connects
        const PORT = process.env.PORT || 5000

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
  console.error("MongoDB Connection Error:", err.message);

  if (err.reason && err.reason.servers) {
    for (const [address, server] of err.reason.servers) {
      console.log("\nServer:", address);
      console.log("Server error:", server.error);
    }
  }
});