import { Database } from "../db/index.js";

export class AuthServices {
  constructor() {
    this.db = new Database("auth", "users", "userName");
  }

  async register(user) {
    await this.db.open();
    return this.db.insert(user);
  }

  async login(userName, password) {
    await this.db.open();
    const users = await this.db.getAll();
    const userLogged = users.find(
      (user) => user.userName === userName && user.password === password
    );

    if (userLogged) {
      localStorage.setItem("user", userLogged.userName);
    } else {
      localStorage.removeItem("user");
    }

    return userLogged;
  }

  async getUsers() {
    await this.db.open();
    return this.db.getAll();
  }
}
