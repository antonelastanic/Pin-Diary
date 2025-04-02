const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//registracija

//REGISTER
router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user._id);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//login

router.post("/login", async (req, res) => {
    try{
        //trazenje korisnika
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
          }

        //validacija lozinke
        await bcrypt.compare(
            req.body.password, 
            user.password,
            (err, result) => {
                if(result) {
                    return res.status(200).json({ _id: user._id, username: user.username });;
                }

                console.log(err);
                return res.status(401).json({ message: "Invalid Credentials" });
            
        });
        
    } catch(err){
        console.log(err);
        res.status(401).send(err.message);
    }
});

module.exports = router;