const Note = require('../../models/note')
const jwt = require('jsonwebtoken')
const { trusted } = require('mongoose');

module.exports = {
    create
  };
  

  async function create(req, res) {
    try {
      // ^ add user to the database
      const noteData = await Note.create(req.body)
    //   // ^ Create JWT Token
    //   const token = createJWT(user)
    //   // ^ sends token back to client as json
      res.json(noteData)
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }
  