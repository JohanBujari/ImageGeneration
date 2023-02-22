const express = require("express");

const dotenv = require('dotenv');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require ("./mongodb/connect");
const postRoutes = require("./routes/postRoutes");
const dalleRoutes = require("./routes/dallERoutes");
const register = require("./routes/register");
const login = require("./routes/login");
const logout = require('./routes/logout');
const profile = require('./routes/profile');
const userEdit = require('./routes/userEdit');
dotenv.config();


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/profile/:id', profile);
app.use('/api/user-edit/:id', userEdit);
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started at port https://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
