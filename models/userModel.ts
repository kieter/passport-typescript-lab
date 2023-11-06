const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user",
    activeSession: ''
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
    activeSession: ''
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
    activeSession: ''
  },
  {
    id: 4,
    name: "Kieter",
    email: "kieter@kieter.com",
    password: "123",
    role: "admin",
    activeSession: ''
  }
];

const userModel = {
  createGithubUser: (id: number, name: string, email: string = '', password: string = '') => {
    const newUser = {
      id: id,
      name,
      email,
      password,
      role: "admin",
      activeSession: ''
    };
    database.push(newUser);
    return newUser;
  },

  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },

  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  revokeSession: (id: number) => {
    const user = userModel.findById(id);
    if (user) {
      user.activeSession = '';
    }
  },

  addSession: (id: number, sessionId: string) => {
    const user = userModel.findById(id);
    if (user) {
      user.activeSession = sessionId;
    }
  },

  getUsersWithActiveSessions: () => {
    return database.filter((user) => user.activeSession !== '');
  },

  getUserIdBySessionId: (sessionId: string) => {
    const user = database.find((user) => user.activeSession === sessionId);
    if (user) {
      return user.id;
    }
  }
};

export { database, userModel };
