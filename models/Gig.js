const Sequelize = require("sequelize"),
  db = require("../config/database")


const Gig = db.define("gig", {
  title: {
    type: Sequelize.STRING
  },
  technologies: {
    type: Sequelize.STRING
  },
  gigDescription: {
    type: Sequelize.STRING
  },
  budget: {
    type: Sequelize.STRING
  },
  contactEmail: {
    type: Sequelize.STRING
  }
})

module.exports = Gig;