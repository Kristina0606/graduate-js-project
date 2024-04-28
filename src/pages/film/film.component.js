import template from "./film.template.hbs";
import { Component } from "../../core/Component";
import { moviesData } from "../primary/filmsData.js";
import { ROUTES } from "../../constants/routes.js";

export class FilmPage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      movie: moviesData,
    };
  }

  componentDidMount() {
    const pathArray = window.location.pathname.split("/");
    const movieId = pathArray[pathArray.length - 1];
    const movie = moviesData.find((movie) => movie.id === +movieId);
    if (movie) {
      this.setState({ movie });
    }
  }
}

customElements.define("film-page", FilmPage);
