import { Component } from "../../core/Component";
import template from "./sign-up.template.hbs";

import { ROUTES } from "../../constants/routes";

export class SignUp extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {};
  }
}

customElements.define("sign-up-page", SignUp);
