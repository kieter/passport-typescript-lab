import {userModel} from "../models/userModel";

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
  };
  return userModel.createGithubUser(id, displayName, primaryEmail);
}

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  createGithubUser,
  getUserByIdSafe
};
