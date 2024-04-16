import { Component } from "../../core/Component";
import template from "./sign-up.template.hbs";
import { ROUTES } from "../../constants/routes";

import "../../components/input/input.component";
import "../../components/button/button.component";
import "../../components/router-link/router-link.component";

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
