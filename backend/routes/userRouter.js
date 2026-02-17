const {Router} = require('express')
const userController = require('../controllers/userController.js')
const {verifyToken} = require('../middlewares/verifyToken.js')

const router = Router()

router.post('/signup', userController.signUpUser)
router.post('/login', userController.loginUpUser)
// router.post('/logout', userController.logOutUser)


// router.get('/all', verifyToken, userController.getAllUsers)
// router.get('/auth',verifyToken, userController.verifyAuth)
// router.put('/update', verifyToken, userController.updateUser);
module.exports = router