const router = require('express').Router();

const { userById } = require('../controllers/user');
const {
  requireSignIn,
  isAuth,
  isAdmin
} = require('../controllers/auth');
const { read, update } = require('../controllers/user');

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  })
});
router.get('/user/:userId', requireSignIn, isAuth, read);
router.put('/user/:userId', requireSignIn, isAuth, update);

router.param('userId', userById);

module.exports = router;