import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);
type DoneFunctionSerialize = (err: any, id?: any) => void;
type DoneFunctionDeserialize = (err: any, user?: any) => void;

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      password: string;
    }
  }
}


passport.serializeUser(function (user: Express.User, done: DoneFunctionSerialize): void {
  done(null, user.id);
});


passport.deserializeUser(function (id: number, done: DoneFunctionDeserialize) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
