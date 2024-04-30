import template from "./favorites.template.hbs";
import { Component } from "../../core/Component";
import { ROUTES } from "../../constants/routes";
import { authService } from "../../services/Auth";

export class FavoritesPage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
      movies: this.state.movies,
    });
    this.state = {
      movies: JSON.parse(localStorage.getItem("savedMovies")) || [],
    };
  }

  updatedMoviesFromLocalStorage() {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const userFavoriteKey = `favorites_${currentUser.uid}`;
      const savedMovies =
        JSON.parse(localStorage.getItem(userFavoriteKey)) || [];
      this.setState({ movies: savedMovies });
    }
  }

  removeMovie = (index) => {
    const { movies } = this.state;
    const currentUser = authService.getCurrentUser(); // получаем текущего пользователя
    if (currentUser) {
      const userFavoriteKey = `favorites_${currentUser.uid}`;
      const updatedMovies = movies.filter((_, i) => i !== index);
      localStorage.setItem(userFavoriteKey, JSON.stringify(updatedMovies));
      this.setState({ movies: updatedMovies }); // после удаления эдемента из избранного обновляем состояние компонента, чтобы отобразить обновленный список фильмов
    } else {
      console.log(
        "Пользователь не аунтефицирован. Невозможно удалить фильм из избранное"
      );
    }
  };

  onClick = ({ target }) => {
    const removeButton = target.closest(".remove-button");
    const moreButton = target.closest(".more-button");

    if (removeButton) {
      const movieIndex = Array.from(
        removeButton.closest(".grid").querySelectorAll(".remove-button")
      ).indexOf(removeButton);
      if (movieIndex !== -1) {
        this.removeMovie(movieIndex);
      }
    }

    if (moreButton) {
      const movieId = moreButton.dataset.movieId;
      if (movieId) {
        const filmPageUrl = `${ROUTES.film}/${movieId}`;
        window.location.assign(filmPageUrl);
      }
    }
  };

  componentDidMount() {
    this.addEventListener("click", this.onClick);
    this.updatedMoviesFromLocalStorage();
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("favorites-page", FavoritesPage);
