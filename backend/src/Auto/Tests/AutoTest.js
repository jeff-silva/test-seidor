import { Test } from "../../App.js";

export default class AutoTest extends Test {
  async testAutoCar({ test, assert }) {
    await test("Veículo", async (t) => {
      await test("Criar Veículo", async (t) => {
        this.autoCar = await this.request({
          method: "post",
          url: "http://localhost:3000/api/v1/auto_car",
          data: { plate: "BAR2E20", color: "#ffffff", brand: "Fiat" },
        });

        assert.strictEqual(true, this.autoCar.status == 200);
      });

      await test("Alterar Veículo", async (t) => {
        const { entity } = this.autoCar.data;
        this.autoCar = await this.request({
          method: "put",
          url: `http://localhost:3000/api/v1/auto_car/${entity.id}`,
          data: { plate: "BAR2E21" },
        });

        assert.strictEqual(true, this.autoCar.status == 200);
      });
    });
  }

  async testAutoDrive({ test, assert }) {
    await test("Motorista", async (t) => {
      await test("Criar Motorista", async (t) => {
        this.autoDriver = await this.request({
          method: "post",
          url: "http://localhost:3000/api/v1/auto_driver",
          data: { name: "João" },
        });

        assert.strictEqual(true, this.autoDriver.status == 200);
      });

      await test("Alterar Motorista", async (t) => {
        const { entity } = this.autoDriver.data;
        this.autoDriver = await this.request({
          method: "put",
          url: `http://localhost:3000/api/v1/auto_driver/${entity.id}`,
          data: { name: "João da Silva" },
        });

        assert.strictEqual(true, this.autoDriver.status == 200);
      });
    });
  }

  async testAutoCarUse({ test, assert }) {
    await test("Uso de Veículo", async (t) => {
      await test("Criar Uso de Veículo válido", async (t) => {
        this.autoCarUse = await this.request({
          method: "post",
          url: "http://localhost:3000/api/v1/auto_car_use",
          data: {
            driver_id: this.autoDriver.data.entity.id,
            car_id: this.autoCar.data.entity.id,
            use_start: "2024-01-01 00:00:00",
            use_final: "2024-01-15 00:00:00",
          },
        });

        assert.strictEqual(true, this.autoCarUse.status == 200);
      });

      await test("Criar Uso de Veículo inválido", async (t) => {
        this.autoCarUseInvalid = await this.request({
          method: "post",
          url: "http://localhost:3000/api/v1/auto_car_use",
          data: {
            driver_id: this.autoDriver.data.entity.id,
            car_id: this.autoCar.data.entity.id,
            use_start: "2024-01-03 00:00:00",
            use_final: "2024-01-10 00:00:00",
          },
        });

        assert.strictEqual(true, this.autoCarUseInvalid.status == 500);
      });
    });
  }

  async testAutoCarDelete({ test, assert }) {
    await test("Deletar Dados", async (t) => {
      await test("Deletar uso de veículo", async (t) => {
        const { entity } = this.autoCarUse.data;

        const remove = await this.request({
          method: "delete",
          url: `http://localhost:3000/api/v1/auto_car_use/${entity.id}`,
        });

        assert.strictEqual(true, remove.data.success);
      });

      await test("Deletar veículo", async (t) => {
        const { entity } = this.autoCar.data;
        const remove = await this.request({
          method: "delete",
          url: `http://localhost:3000/api/v1/auto_car/${entity.id}`,
        });

        assert.strictEqual(true, remove.data.success);
      });

      await test("Deletar motorista", async (t) => {
        const { entity } = this.autoDriver.data;
        const remove = await this.request({
          method: "delete",
          url: `http://localhost:3000/api/v1/auto_driver/${entity.id}`,
        });

        assert.strictEqual(true, remove.data.success);
      });
    });
  }
}
