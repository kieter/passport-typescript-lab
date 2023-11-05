import express from "express";
import passport from 'passport';
import {ensureAdmin} from "../middleware/checkAuth";
import {getUsersWithActiveSessions} from "../controllers/userController";
const router = express.Router();

// TODO: only admins can access this route (use ensureAuthenticated)
// TODO: show all sessions with a revoke button

router.get("/", ensureAdmin, (req, res  ) => {
  // console.log('admin route')
  // const sessions = Object.keys((req as any).sessionStore.sessions).map((key) => JSON.parse((req as any).sessionStore.sessions[key]));
  const sessions = getUsersWithActiveSessions();
  // // const sessions = (req as any).sessionStore.sessions
  // console.log('sessions', sessions)
  // console.log('sessionStore', (req as any).sessionStore);
  console.log('getUsersWithActiveSessions', getUsersWithActiveSessions());

  res.render("admin", {user: req.user, sessions});
})

// router.get("/revoke/:id", ensureAdmin, (req, res) => {
//   const id = req.params.id;
// });

export default router;
