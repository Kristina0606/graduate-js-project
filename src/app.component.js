import { Component } from "./core/Component";
import template from "./app.template.hbs";
import { ROUTES } from "./constants/routes";

export class App extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });

    this.state = {
      firstName: "alex",
      lastName: "klim",
    };
  }
}

customElements.define("my-app", App);
