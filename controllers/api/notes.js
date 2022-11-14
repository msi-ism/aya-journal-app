const Note = require('../../models/note')
const jwt = require('jsonwebtoken')
const { trusted } = require('mongoose');

module.exports = {
    create
  };
  
  async function create(req, res) {
      try {
          // ^ add note to the database
      console.log('i c u')
      const note = await Note.create(req.body)
      console.log(`here ${note}`)
      // ^ sends token back to client as json
      res.json(note)
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }
  