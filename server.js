const express = require("express");
const mongoose = require('mongoose');
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");
const path = require("path");

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("client/build"));
//
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client/build/index.html"));
//   });
// }
// const port = process.env.PORT || 5000;
//
// app.get("/", (req, res) => res.send("Hello World!"));
// app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));

const PORT = process.env.PORT || 5000;



app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});


app.listen(PORT, async()=>{
  try{
    // await dbConfig();
    console.log(`Listening at ${PORT}`);
  }catch(e){
    console.log(e.message);
  }
})
