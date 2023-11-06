import express from "express";
import passport from 'passport';
import {ensureAdmin} from "../middleware/checkAuth";
import {getUsersWithActiveSessions} from "../controllers/userController";
const router = express.Router();

router.get("/", ensureAdmin, (req, res  ) => {
  const sessions = getUsersWithActiveSessions();

  res.render("admin", {user: req.user, sessions});
})

export default router;
