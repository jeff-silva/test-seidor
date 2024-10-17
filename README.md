# Teste Técnico Seidor

Antes de mais nada, obrigado pela oportunidade, será um prazer fazer parte da sua equipe!

## Executando

A aplicação foi feita utilizando `Docker Compose`, então para inicializar basta executar `yarn dev` e tudo estará pronto sem mais configurações.

Quando a aplicação terminar de levantar, você já estará anexado a linha de comando do serviço `backend`, podendo assim executar os testes através do comando `yarn test`.

Tomei a liberdade de criar uma interface simples de frontend para testar a aplicação de forma mais realista mais facilmente. O frontend pode ser acessado pela URL http://localhost:8000.

## Detalhes de organização e funcionamento

Todo a aplicação foi criada de acordo com as exigências do [Teste](https://github.com/jeff-silva/test-seidor/blob/main/backend-ttp-teste-tecnico-pratico.pdf).

Como o teste especifica que deve ser usado `Express.js` para criar as rotas, e eu não conheço um framework que o use, optei por criar a estrutura do zero imaginando que a estruturação também faça parte do teste.

O sistema foi pensado para ser modular, parecido com o modo que o NestJS funciona: na pasta `/backend/src` estão os módulos, que são ativados configurando o atributo "modules" em `/backend/config/app.js`.

Dentro de cada pasta de módulos, temos os arquivo `*Module.js` que é o arquivo principal do módulo, responsável por configurar seus respectivos controllers, models e testes.

Toda a base da aplicação está no arquivo `/backend/src/App.js`, que é responsável por prover as classes que controllers, models e testes irão extender.

As tabelas também foram nomeadas usando o nome do módulo como prefixo, ou seja: todas as tabelas utilizadas pelo módulo `Auto` terão o prefixo `auto_` para ajudar na organização.

Em uma aplicação real, supondo que seja criado um módulo de ecommerce, seria necessário apenas criar a pasta `/backend/src/Shop` com seu arquivo principal `/backend/src/ShopModule.js` dessa forma:

```javascript
import { Module } from "../App.js";

// Controllers
import ShopCartController from "./Controllers/ShopCartController.js";
import ShopOrderController from "./Controllers/ShopOrderController.js";
import ShopProductController from "./Controllers/ShopProductController.js";
import ShopCategoryController from "./Controllers/ShopCategoryController.js";

// Models
import ShopCart from "./Models/ShopCart.js";
import ShopOrder from "./Models/ShopOrder.js";
import ShopProduct from "./Models/ShopProduct.js";
import ShopCategory from "./Models/ShopCategory.js";

// Tests
import ShopTest from "./Tests/ShopTest.js";

// Module
export default class ShopModule extends Module {
  controllers() {
    return {
      ShopCartController,
      ShopOrderController,
      ShopProductController,
      ShopCategoryController,
    };
  }

  models() {
    return {
      ShopCart,
      ShopOrder,
      ShopProduct,
      ShopCategory,
    };
  }

  tests() {
    return { AutoTest };
  }
}
```

Após criar esse arquivo, deve-se registrá-lo em `/backend/config/app.js`.

As rotas são criadas dentro do controller, dentro do método `routes`, dessa forma:

```javascript
import { Controller } from "../../App.js";
import ShopProduct from "../Models/ShopProduct.js";

export default class ShopProductController extends Controller {
  /**
   * O método "app.crud" irá utilizar a model informada aqui.
   */
  model() {
    return ShopProduct;
  }

  /**
   * O parâmetro "app" é simplesmente a instância do express
   * com algumas pequenas alterações.
   */
  routes(app) {
    /**
     * Uma delas é o metodo "crud" que gera automaticamente as rotas básicas
     * para o CRUD, sendo elas:
     *
     * - search
     * - select
     * - create
     * - update
     * - delete
     *
     * • O argumento 1 define a url base para todas as rotas que serão criadas.
     *
     * • O argumento 2 aponta para o controller onde os métodos search, select,
     *   create, update e delete estão. Note que a classe "Controller" ao
     *   qual esta classe se extende já tem esses métodos pré definidos, eles
     *   irão fazer o CRUD na model informada no método "model()" mais acima.
     *
     * • O argumento 3 define as exceções de rotas, onde você pode informar quais
     *   das 5 rotas informadas acima você não deseja para a rota, sendo passadas
     *   no formato de array dessa forma:
     *
     *   app.crud("/api/v1/shop_product", this, ["create", "update", "delete"]);
     *
     * As rotas criadas serão:
     * (search) GET     /api/v1/shop_product
     * (select) GET     /api/v1/shop_product/:id
     * (create) POST    /api/v1/shop_product
     * (update) PUT     /api/v1/shop_product/:id
     * (delete) DELETE  /api/v1/shop_product/:id
     */
    app.crud("/api/v1/shop_product", this);

    /**
     * Ou você pode definir cada rota manualmente, usando as regras do express
     */
    app.get("/api/v1/shop_product/test", this.test);
  }

  static test(req, res) {
    /**
     * O método "success" do controller recebe 3 argumentos para montar
     * a resposta json: requisição (vinda do express), resposta (vinda do express)
     * e os dados que você deseja exibir.
     *
     * Ou você pode também exibir um erro, que consiste na mesma estrutura do método
     * success: this.error(req, res, { message: 'Erro de validação' });
     */
    return this.success(req, res, {
      message: "Rota criada com êxito.",
    });
  }
}
```

## Conclusão

Estou ciente de que não se deve criar uma aplicação assim, do zero, mas o fiz supondo que a estruturação faça parte do teste.

Estou ciente também que seria mais interessante utilizar inversão de controle para fazer os testes de CRUD, mas optei por fazer da forma mais simples por uma questão de tempo.

Espero que eu tenha conseguido atingir as expectativas.

Grato novamente pela oportunidade.
