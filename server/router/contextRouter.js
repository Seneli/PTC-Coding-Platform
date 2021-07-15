const router = require('express').Router();

const User = require('../models/userModels');
const Admin = require('../models/adminModel');

const jwt = require('jsonwebtoken');
const jwtPassword = require('../config/default.json').jwtPassword;
const jwtAdminPassword = require('../config/default.json').jwtAdminPassword;

router.get('/', async (req, res) => {
  try {
    const token = req.cookies.token || false;
    const adminToken = req.cookies.adminToken || false;

    //if the user has a regular token
    if (token !== false) {
      const verifiedId = jwt.verify(token, jwtPassword);

      await User.findById(verifiedId.user, (err, data) => {
        if (err) {
          console.log('ERROR' + err);
          res.status(500).error(err);
        } else {
          return res.json({
            loggedIn: true,
            admin: false,
            name: `${data.firstName} ${data.lastName}`,
            email: `${data.email}`,
          });
        }
      });
    }

    //if the user has an admin token
    if (adminToken !== false) {
      const verifiedId = jwt.verify(adminToken, jwtAdminPassword);

      await Admin.findById(verifiedId.user, (err, data) => {
        if (err) {
          console.log('ERROR' + err);
          res.status(500).error(err);
        } else {
          return res.json({
            loggedIn: true,
            admin: true,
          });
        }
      });
    }

    //if neither are true then the user is not logged in
    if (!adminToken && !token) res.json({ loggedIn: false });
  } catch (err) {
    res.status(500).json({
      error: 'we catching an error in context router',
      loggedIn: false,
    });
  }
});

module.exports = router;
