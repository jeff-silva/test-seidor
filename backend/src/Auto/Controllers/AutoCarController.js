import { Controller } from "../../App.js";
import AutoCar from "../Models/AutoCar.js";

export default class AutoCarController extends Controller {
  model() {
    return AutoCar;
  }

  routes(app) {
    app.crud("/api/v1/auto_car", this);
  }

  onSearch(query, req, res) {
    if (req.query.plate) {
      query.where.plate = req.query.plate;
    }

    if (req.query.color) {
      query.where.color = req.query.color;
    }

    if (req.query.brand) {
      query.where.brand = req.query.brand;
    }

    return query;
  }
}
