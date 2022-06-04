const express = require("express");
const router = express.Router();
const passwordResetController = require('../controllers/passwordReset');


router.post("/", passwordResetController.reset_sendemail);
router.get("/:userId/:token/:password", function(req,res){
    res.status(200).render('reset');
})
router.post("/:userId/:token/:password", passwordResetController.reset_password);

module.exports = router;