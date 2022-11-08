const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { trusted } = require('mongoose');


module.exports = {
  create,
  login,
  checkToken
};

function checkToken(req, res) {
  // ^ req.user will always be there for you when a token is sent
  console.log('req.user', req.user)
  res.json(req.exp)
}



async function create(req, res) {
  try {
    // ^ add user to the database
    const user = await User.create(req.body)
    // ^ Create JWT Token
    const token = createJWT(user)
    // ^ sends token back to client as json
    res.json(token)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}


// ^ Helper Function
function createJWT(user) {
  return jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'})
}

// ^ Check user function

async function login(req, res) {
  try {
    // ^ 
    const user = await User.findOne({email: req.body.email})
    console.log(user)
    if (!user) throw new Error('Nope')
    const decodedPassword = await bcrypt.compare(req.body.password, user.password)
    if (!decodedPassword) throw new Error('Nope') 
    const token = createJWT(user)
    res.json(token)

  } catch (error) {
    res.status(400).json('Bad Credentials')
    
  }
}




// Baby step...
//   res.json({
//     user: {
//       name: req.body.name,
//       email: req.body.email
//     }
//   });
// }
