import dayjs from "dayjs";

import { Model, sequelize, Sequelizee, SequelizeDataTypes } from "../../App.js";
import AutoDriver from "./AutoDriver.js";
import AutoCar from "./AutoCar.js";

const validations = async () => {
  // throw new Error("Aaa");
};

class AutoCarUse extends Model {
  async onSeed() {
    await AutoCarUse.findOrCreate({
      where: { id: 1 },
      defaults: {
        driver_id: 1,
        car_id: 1,
        date_start: "2024-01-01 00:00:00",
        date_final: "2024-01-15 00:00:00",
      },
    });
    await AutoCarUse.findOrCreate({
      where: { id: 2 },
      defaults: {
        driver_id: 2,
        car_id: 2,
        date_start: "2024-01-01 00:00:00",
        date_final: "2024-01-15 00:00:00",
      },
    });
  }
}

AutoCarUse.init(
  {
    id: {
      type: SequelizeDataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    driver_id: {
      type: SequelizeDataTypes.INTEGER,
      allowNull: true,
      validate: {
        async custom(value) {
          if (!value) throw new Error("Campo obrigatório");
          const { Op } = Sequelizee;

          const date_start = dayjs(this.date_start).format("YYYY-MM-DD");
          const date_final = dayjs(this.date_final).format("YYYY-MM-DD");

          const exists = await AutoCarUse.findAll({
            where: {
              id: { [Op.ne]: this.id },
              driver_id: this.driver_id,
              [Op.or]: [
                {
                  [Op.and]: [
                    {
                      date_final: null,
                    },
                    {
                      date_start: {
                        [Op.between]: [date_start, date_final],
                      },
                    },
                  ],
                },
                {
                  [Op.and]: [
                    {
                      date_final: {
                        [Op.ne]: null,
                      },
                    },
                    {
                      date_start: {
                        [Op.between]: [date_start, date_final],
                      },
                    },
                  ],
                },
              ],
            },
          });

          if (exists.length) {
            throw new Error(`Motorista ocupado(a) na data selecionada`);
          }
        },
      },
    },
    car_id: {
      type: SequelizeDataTypes.INTEGER,
      allowNull: true,
      validate: {
        async custom(value) {
          if (!value) throw new Error("Campo obrigatório");
          const { Op } = Sequelizee;

          const date_start = dayjs(this.date_start).format("YYYY-MM-DD");
          const date_final = dayjs(this.date_final).format("YYYY-MM-DD");

          const exists = await AutoCarUse.findAll({
            where: {
              id: { [Op.ne]: this.id },
              car_id: this.car_id,
              [Op.or]: [
                {
                  [Op.and]: [
                    {
                      date_final: null,
                    },
                    {
                      date_start: {
                        [Op.between]: [date_start, date_final],
                      },
                    },
                  ],
                },
                {
                  [Op.and]: [
                    {
                      date_final: {
                        [Op.ne]: null,
                      },
                    },
                    {
                      date_start: {
                        [Op.between]: [date_start, date_final],
                      },
                    },
                  ],
                },
              ],
            },
            logging: console.log,
          });

          if (exists.length) {
            throw new Error(`Veículo ocupado na data selecionada`);
          }
        },
      },
    },
    date_start: {
      type: SequelizeDataTypes.DATE,
      allowNull: true,
      validate: {
        required(value) {
          if (!value) throw new Error("Campo obrigatório");
        },
      },
    },
    date_final: {
      type: SequelizeDataTypes.DATE,
      allowNull: true,
      // validate: {
      //   required(value) {
      //     if (!value) throw new Error("Campo obrigatório");
      //   },
      // },
    },

    observation: {
      type: SequelizeDataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "auto_car_use",
    modelName: "auto_car_use",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

AutoCarUse.belongsTo(AutoDriver, {
  foreignKey: "driver_id",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});

AutoCarUse.belongsTo(AutoCar, {
  foreignKey: "car_id",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});

// AutoCarUse.hasOne(AutoCar, {
//   foreignKey: "car_id",
//   // model: AutoCar,
//   onDelete: "SET NULL",
//   onUpdate: "SET NULL",
// });

// AutoDriver.belongsTo(AutoCarUse);
// AutoCar.belongsTo(AutoCarUse);

export default AutoCarUse;
