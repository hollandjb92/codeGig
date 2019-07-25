const express = require("express");
router = express.Router();
db = require("../config/database");
Gig = require("../models/Gig");
Sequelize = require("sequelize");
Op = Sequelize.Op;


//get gig list
router.get("/", (req, res) =>
  Gig.findAll()
  .then(gigs => res.render("gigs", {
    gigs
  }))
  .catch(err => console.log(err))
);

//display gig form
router.get("/add", (req, res) => res.render("add"));

//add a gig
router.post("/add", (req, res) => {
  let {
    title,
    technologies,
    budget,
    gigDescription,
    contactEmail
  } = req.body;

  let errors = [];

  //Validation for Form Fields
  if (!title) {
    errors.push({
      text: `Please add a title`
    });
  }
  if (!technologies) {
    errors.push({
      text: `Please add some technologies`
    });
  }
  if (!gigDescription) {
    errors.push({
      text: `Please add a description`
    });
  }
  if (!contactEmail) {
    errors.push({
      text: `Please add a contact email`
    });
  }

  //Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      gigDescription,
      contactEmail
    });
  } else {

    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`
    }

    //fix technology text
    technologies = technologies.toLowerCase().replace(/, /g, ",");


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
  }

});

//searching
router.get("/search", (req, res) => {
  let {
    term
  } = req.query;

  Gig.findAll({
      where: {
        technologies: {
          [Op.like]: "%" + term + "%"
        }
      }
    })
    .then(gigs => res.render("gigs", {
      gigs
    }))
    .catch(err => console.log(err))
});

module.exports = router;