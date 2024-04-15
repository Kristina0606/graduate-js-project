import { Component } from "../../core/Component";
import template from "./home.template.hbs";

import "../../components/router-button/router-button.component";

export class HomePage extends Component {
  constructor() {
    super();
    this.template = template();
  }
}

customElements.define("home-page", HomePage);
