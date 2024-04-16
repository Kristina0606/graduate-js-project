import { Component } from "../../core/Component";
import template from "./sign-in.template.hbs";
import { ROUTES } from "../../constants/routes";

import "../../components/input/input.component";
import "../../components/button/button.component";

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
