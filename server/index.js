import bcrypt from "bcryptjs";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";
dotenv.config();
export const app = express();
const PORT = 3333;
const secretKey = "your_secret_key"; 
const MONGO_URL = "mongodb+srv://jobify:jobify1234@cluster0.mxmqnga.mongodb.net";

export const client = new MongoClient(MONGO_URL);
client.connect();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/employee/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      status: 0,
      message: "Invalid employee ID format!",
    });
  }

  try {
    const result = await client
      .db("Jobify")
      .collection("employeeList")
      .findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).send({
        status: 0,
        message: "Employee not found!",
      });
    }

    res.send({
      status: 1,
      employee: result,
    });

  } catch (err) {
    console.error("Error retrieving employee:", err);
    res.status(500).send({
      status: 0,
      message: "Error retrieving employee. Please try again later.",
    });
  }
});

function findUserByEmail() {
  return async (email) => {
    const user = await client
      .db("Jobify")
      .collection("userLogin")
      .findOne({ email: email });
    return user;
  };
}

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  async function signupUser(name, email, hashedPassword,userID) {
    await client.db("Jobify").collection("userLogin").insertOne({
      name: name,
      email: email,
      password: hashedPassword,
      userID : userID
    });
  }
  const getUserEmail = findUserByEmail();
  const userEmail = await getUserEmail(email);

  if (userEmail) {
    res.status(400).send({ status: 0, message: "User already exists" });
  } else {
    const userID = `${name.replace(/\s+/g, '').toUpperCase()}${Math.floor(
      100000 + Math.random() * 900000
    )}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    await signupUser(name, email, hashedPassword,userID);
    res.status(200).send({ status: 1, message: "Successfully signed up", userID: userID });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const getUserEmail = findUserByEmail();

  const userEmail = await getUserEmail(email);

  if (userEmail) {
    const isPasswordValid = await bcrypt.compare(password, userEmail.password);
    const name = userEmail.name;
    if (isPasswordValid) {
      const token = jwt.sign({ userID: userEmail.userID },secretKey, {
        expiresIn: "1h",
      });
      res
        .send({
          status: 1,
          message: "Successfully logged in",
          userID: userEmail.userID,
          token,
          name
          
        })
        .status(200);
    } else {
      res.status(400).send({ status: 0, message: "Invalid Credentials" });
    }
  } else {
    res.status(400).send({ status: 0, message: "User does not exist" });
  }
});

app.post("/newEemployee", async (req, res) => {
  const { name, email, mobile, selectedRole , gender, course } = req.body;
  const createDate = new Date().toISOString().split('T')[0];

  try {
    const existingEmployee = await client.db("Jobify").collection("employeeList").findOne({
      $or: [{ email }, { mobile }]
    });

    if (existingEmployee) {
      const conflictField = existingEmployee.email === email ? "email" : "mobile number";
      return res.status(400).send({
        status: 0,
        message: `Employee ${conflictField} already exists!`,
      });
    }

    await client.db("Jobify").collection("employeeList").insertOne({
      name, email, mobile, selectedRole, gender, course,  createDate
    });

    return res.status(200).send({
      status: 1,
      message: "Employee created successfully!",
    });

  } catch (err) {
    console.error("Error creating employee:", err);
    return res.status(500).send({
      status: 0,
      message: "Error creating employee. Please try again later.",
    });
  }
});


app.get("/employeesList", async (req, res) => {

  const result = await client
    .db("Jobify")
    .collection("employeeList")
    .find({}).toArray();
  res.send({ status: 1, employeesList : result });
});

app.put("/updateEmployee/:id", async (req, res) => {
  const { name, email, mobile, selectedRole, gender, course,} = req.body;
  const { id } = req.params;

  try {
      const updateResult = await client
          .db("Jobify")
          .collection("employeeList")
          .updateOne(
              { _id: new ObjectId(id) },  // Convert id to ObjectId if stored as ObjectId
              { $set: { name, email, mobile, selectedRole, gender, course,} }
          );

      console.log("Update Result:", updateResult);

      if (updateResult.matchedCount === 0) {
          return res.status(404).send({
              status: 0,
              message: "Employee not found!",
          });
      }

      res.status(200).send({
          status: 1,
          message: "Employee details updated!",
      });
  } catch (err) {
      console.error("Error updating employee:", err);
      res.status(500).send({
          status: 0,
          message: "Error updating employee details!",
      });
  }
});

app.delete("/deleteEmployee/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const deleteResult = await client
          .db("Jobify")
          .collection("employeeList")
          .deleteOne({ _id: new ObjectId(id) });

      console.log("Delete Result:", deleteResult);

      if (deleteResult.deletedCount === 0) {
          return res.status(404).send({
              status: 0,
              message: "Employee not found!",
          });
      }

      res.status(200).send({
          status: 1,
          message: "Employee deleted successfully!",
      });
  } catch (err) {
      console.error("Error deleting employee:", err);
      res.status(500).send({
          status: 0,
          message: "Error deleting employee!",
      });
  }
});

app.listen(PORT, () => console.log(`The port is running on ${PORT}`));