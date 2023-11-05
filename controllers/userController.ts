import { userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const getUserByIdSafe = (id: number) => {
  try {
    return userModel.findById(id);
  } catch (e) {
    return null;
  }
}

const createGithubUser = (id: number, displayName: string, primaryEmail: string) => {
  const newUser = {
    id,
    name: displayName,
    email: primaryEmail,
    password: '',
    // TODO: change this back to user
    role: "admin"
  };
  return userModel.createGithubUser(id, displayName, primaryEmail);
}

const addSession = (id: number, sessionId: string) => {
  userModel.addSession(id, sessionId);
}

const getUsersWithActiveSessions = () => {
  return userModel.getUsersWithActiveSessions();
}

function isUserValid(user: any, password: string) {
  return user.password === password;
}

const getUserIdBySessionId = (sessionId: string) => {
  return userModel.getUserIdBySessionId(sessionId);
}

const revokeUserSession = (id: number) => {
  userModel.revokeSession(id);
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  createGithubUser,
  getUserByIdSafe,
  addSession,
  getUsersWithActiveSessions,
  getUserIdBySessionId,
  revokeUserSession
};
