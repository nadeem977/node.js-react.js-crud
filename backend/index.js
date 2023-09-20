const express = require("express");
const cors = require("cors");
const BooksRoute = require("./routes/BooksRoute");
const { DBauthentication } = require("./mongoDB");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());
app.use("/books", BooksRoute);

app.listen(PORT, (req, res) => {
  console.log("listen success :", PORT);
});

// signup API
app.post("/signup", async (req, res) => {
  try {
    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.email ||
      !req.body.password ||
      !req.body.profileImge
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: First Name, Last Name, email ,password ,profile Imge",
      });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUers = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashPassword,
      profileImge:req.body.profileImge
    };
    const data = await DBauthentication();
    const axistinguser = await data.find({ email: req.body.email }).toArray();
    if (axistinguser.length > 0) {
      console.log("Email already exists");
      return res.status(409).send({ message: "This email already exists" });
    }
    const result = await data.insertOne(newUers);
    console.log(result);
    return res.status(201).send({ data: "signup successfil" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// login API
app.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Send both email and password fields.",
      });
    }
    const email = req.body.email;
    const data = await DBauthentication();
    const user = await data.findOne({ email });

    if (!user) {
      return res.status(401).send({
        message: "Invalid email or password.",
      });
    }
    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (matchPassword) {
      const token = jwt.sign({ email: user.email }, "your-secret-key", {
        expiresIn: "1h",
      });
      const respon = await data.updateOne(
        { email: user.email },
        { $set: { isLoggedIn: true } }
      );
      console.log(respon);
      res.status(200).json({
        message: "Login successful.",
        token: token,
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          profileImge:user.profileImge
        },
      });
    } else {
      return res.status(401).send({
        message: "Invalid email or password.",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.post("/logout", async (req, res) => {
  const email = await req.body.email;
  try {
    if (email) {
      const data = await DBauthentication();
      await data.updateOne({ email: email }, { $set: { isLoggedIn: false } });
      res.status(200).json({ message: "Logout successful." });
    }
  } catch (error) {
    console.log(error);
    res.send({ messeage: "logout request failed" }).status(500);
  }
});

app.get("/users", async (req, res) => {
  try {
    const data = await DBauthentication();
    const result = await data.find().toArray();
    console.log(result);
    return res.status(200).json({
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
