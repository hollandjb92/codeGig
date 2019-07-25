const exphbs = require("express-handlebars"),
  db = require("./config/database"),
  bodyParser = require("body-parser"),
  express = require("express"),
  path = require("path");

//TEST DB
db.authenticate()
  .then(_ => console.log("Databse connected..."))
  .catch(err => console.log("Error: " + err));

const app = express();
const PORT = process.env.PORT || 3000;

//Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Set Static folder
app.use(express.static(path.join(__dirname, "public")));

//Index route
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

// Gig routes
app.use("/gigs", require("./routes/gigs"));

app.listen(PORT, console.log(`Server running on port ${PORT}`));
