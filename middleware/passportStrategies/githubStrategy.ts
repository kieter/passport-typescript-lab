import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import {createGithubUser, getUserById, getUserByIdSafe} from "../../controllers/userController";
require('dotenv').config();


const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },

    async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
      console.log('github verify callback')
      const {id, displayName, emails} = profile;
      const primaryEmail = emails[0].value;
      let user;
      user = getUserByIdSafe(profile.id);
      if (!user) {
        user = createGithubUser(id, displayName, primaryEmail);
        return done(null, user);
      }
      return done(null, user);
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
