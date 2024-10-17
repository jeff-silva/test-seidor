import { Op } from "sequelize";
import { Controller } from "../../App.js";
import AutoDriver from "../Models/AutoDriver.js";

export default class AutoDriverController extends Controller {
  model() {
    return AutoDriver;
  }

  routes(app) {
    app.crud("/api/v1/auto_driver", this);
  }

  onSearch(query, req, res) {
    const { Op } = this.Sequelize;

    if (req.query.name) {
      query.where.name = {
        [Op.like]: `%${req.query.name}%`,
      };
    }

    return query;
  }
}
