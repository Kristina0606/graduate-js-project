import template from "./primary.template.hbs";
import { Component } from "../../core/Component";

export class PrimaryPage extends Component {
  constructor() {
    super();
    this.template = template();
  }
}

customElements.define("primary-page", PrimaryPage);
