import template from "./favorites.template.hbs";
import { Component } from "../../core/Component";
import { ROUTES } from "../../constants/routes";

export class FavoritesPage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      favoriteMovies: [],
    };
    this.render();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
    this.addEventListener("click", this.handleRemoveButtonClick.bind(this));
  }

  render() {
    const storedMovies = localStorage.getItem("favoriteMovies");
    if (storedMovies) {
      this.state.favoriteMovies = JSON.parse(storedMovies);
    } else {
      console.log("No saved movies in local storage");
    }
    this.template = template({
      routes: ROUTES,
      favoriteMovies: this.state.favoriteMovies,
    });
  }

  handleRemoveButtonClick(event) {
    if (event.target && event.target.classList.contains("remove-button")) {
      const index = parseInt(event.target.getAttribute("data-index"));
      this.state.favoriteMovies.splice(index, 1);
      localStorage.setItem(
        "favoriteMovies",
        JSON.stringify(this.state.favoriteMovies)
      );
      this.render();
      location.reload();
    }
  }
}

customElements.define("favorites-page", FavoritesPage);
