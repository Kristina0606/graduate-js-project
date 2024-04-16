import template from "./film.template.hbs";
import { Component } from "../../core/Component";

import { ROUTES } from "../../constants/routes";

export class FilmPage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {};
  }
}

customElements.define("film-page", FilmPage);
