import template from "./favorites.template.hbs";
import { Component } from "../../core/Component";

import { ROUTES } from "../../constants/routes";

export class FavoritesPage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {};
  }
}

customElements.define("favorites-page", FavoritesPage);
