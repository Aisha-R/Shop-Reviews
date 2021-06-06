const User = require("../models/User.js");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.query()
      .select()
      .where("email", email)
      .limit(1);

    if (userFound.length < 1) {
      return res.sendStatus(401);
    } else {
      const result = await bcrypt.compare(password, userFound[0].password);
      if (result) {
        const user = { email: email, id: userFound[0].ID };
        const accessToken = generateAccessToken(user);
            
        res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 });

        return res.sendStatus(200);
      } else {
        return res.sendStatus(401);
      }
    }
    } catch (error) {

        return res.sendStatus(400);
    }
};

exports.logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  return res.sendStatus(204);
};

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'});
}
