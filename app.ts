import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "path";
import passportMiddleware from './middleware/passportMiddleware';
require('dotenv').config();


const port = process.env.port || 8000;

const app = express();
const sessionStore = new session.MemoryStore();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: sessionStore
  })
);

import authRoute from "./routes/authRoute";
import indexRoute from "./routes/indexRoute";
import adminRoute from "./routes/adminRoute";
import {getUserIdBySessionId, revokeUserSession} from "./controllers/userController";

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
passportMiddleware(app);

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log((req.session as any).passport);
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);

app.post('/admin/revoke/:sid', (req, res) => {
  const sid = req.params.sid;
  sessionStore.destroy(sid, (err) => {
    if (err) {
      console.log('err', err);
    }
    const activeUserId = getUserIdBySessionId(sid);
    if (activeUserId) {
      revokeUserSession(activeUserId);
    }
    res.redirect('/admin');
  });
});

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
