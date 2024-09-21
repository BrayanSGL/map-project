import { Database } from "../db/index.js";

export class RouteServices {
  constructor() {
    this.db = new Database("MiDataBase", "routes");
  }

  async addRoute(route) {
    await this.db.open();
    const user = await localStorage.getItem("user");
    route.user = user;
    return this.db.insert(route);
  }

  async getRoutes() {
    await this.db.open();
    const routes = await this.db.getAll();
    const user = await localStorage.getItem("user");
    return routes.filter((route) => route.user === user);
  }

  async deleteRoute(id) {
    await this.db.open();
    return this.db.delete(id);
  }
}
