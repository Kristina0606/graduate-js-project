import template from "./favorites.template.hbs";
import { Component } from "../../core/Component";

export class FavoritesPage extends Component {
  constructor() {
    super();
    this.template = template();
  }
}

customElements.define("favorites-page", FavoritesPage);
