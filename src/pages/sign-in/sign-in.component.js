import { Component } from "../../core/Component";
import template from "./sign-in.template.hbs";

import { ROUTES } from "../../constants/routes";

export class SignIn extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {};
  }
}

customElements.define("sign-in-page", SignIn);
