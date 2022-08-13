const express = require("express");
const router = express.Router();
const userController = require('../Controller/userController')


router.route("/")
    
        .get(userController.getAllUser)
        .post(userController.creatNewUser)
        .patch(userController.updateNewUser)
        .delete(userController.deleteNewUser);

module.exports = router;
