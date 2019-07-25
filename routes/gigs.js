const express = require("express");
router = express.Router();
db = require("../config/database");
Gig = require("../models/Gig");

//get gig list
router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs => {
      res.render("gigs", { gigs });
    })
    .catch(err => console.log(err))
);

//display gig form
router.get("/add", (req, res) => res.render("add"));

//add a gig
router.post("/add", (req, res) => {
  const data = {
    title: "Simple Word Press Website",
    technologies: "wordpress, php, html, css",
    budget: "$1000",
    gigDescription:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...eque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
    contactEmail: "user2@gmail.com"
  };

  let { title, technologies, budget, gigDescription, contactEmail } = data;

  //insert into table
  Gig.create({
    title,
    technologies,
    budget,
    gigDescription,
    contactEmail
  })
    .then(gig => res.redirect("/gigs"))
    .catch(err => console.log(err));
});

module.exports = router;
