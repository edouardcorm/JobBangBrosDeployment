const express = require('express');
const { getAllNonAdminUsers,
        getUserbyId,
        signupUser,
        loginUser,
        updateUser,
        deleteUser
 } = require('../controllers/userController');

 const requireAuth = require('../middleware/requireAuth');

const router = express.Router();


// get all users
router.get('/', requireAuth, getAllNonAdminUsers)

//get single user
router.get('/:id', requireAuth, getUserbyId)
// create a user
router.post('/signup', signupUser)

// login a user
router.post('/login', loginUser)

// update a user
router.patch('/:id', requireAuth, updateUser)

// delete a user
router.delete('/:id', requireAuth, deleteUser)

module.exports = router;