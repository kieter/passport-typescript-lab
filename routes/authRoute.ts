import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";
import {SessionData} from "express-session";
const router = express.Router();

declare module 'express-session' {
  export interface SessionData {
    message?: string;
  }
}

router.get("/login", forwardAuthenticated, (req, res) => {
  const message = req.session.message || '';
  res.render("login", { message });
})
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log('err', err);
      return next(err);
    }
    if (!user) {
      console.log('user', user);
      console.log('info', info)
      if (info.message === 'Missing credentials') {
        req.session.message = `Couldn't find user with email: ${req.body.email}`;
      }
      if (info.message === 'Your login details are not valid. Please try again') {
        req.session.message = `Password is incorrect`
      }
      return res.redirect("/auth/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/dashboard");
    });
  })(req, res, next);
});


router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
