// /auth router
const passport = require("passport");
const router = require("express").Router();

// google login
router.get("/login/google", passport.authenticate("google", { scope: ["profile"] }), (req, res) => {
    console.log("google log in")
    // res.send("this is goolge log in...");
});

// google oauth redirect url
router.get("/login/google/redirect", passport.authenticate("google"), (req, res) => {
    // console.log(req.user);
    res.redirect("/");
})

router.get("/logout",(req,res)=>{
    req.logOut(); // logout
    res.redirect("/"); // back to homepage
})

module.exports = router;