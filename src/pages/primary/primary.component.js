import template from "./primary.template.hbs";
import { Component } from "../../core/Component";
import { ROUTES } from "../../constants/routes";

export class PrimaryPage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {};
  }
}

customElements.define("primary-page", PrimaryPage);
