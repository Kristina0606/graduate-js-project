import { Component } from "../../core/Component";
import template from "./not-found.template.hbs";
import { ROUTES } from "../../constants/routes";

export class NotFound extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {};
  }
}

customElements.define("not-found", NotFound);
