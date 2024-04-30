import template from "./primary.template.hbs";
import { Component } from "../../core/Component";
import { ROUTES } from "../../constants/routes";
import { moviesData } from "./filmsData";
import { useUserStore } from "../../hooks/useUserStore";
import { useToastNotification } from "../../hooks/useToastNotification";
import { useNavigate } from "../../hooks/useNavigate";
import { TOAST_TYPE } from "../../constants/toast";
import { authService } from "../../services/Auth";

export class PrimaryPage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
      searchDropdownClass: "search-dropdown",
    });
    this.state = {
      isLoading: false,
      user: null,
      movies: moviesData,
      filteredMovies: moviesData,
      initialState: moviesData,
      searchText: "",
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  logout = () => {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .logOut()
      .then(() => {
        setUser(null); // обнуляем юзера в сторе
        useToastNotification({ type: TOAST_TYPE.success, message: "Success!" });
        useNavigate(ROUTES.signIn);
      })
      .catch(({ message }) => {
        useToastNotification({ message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  addToLocalStorage(movie) {
    const currentUser = authService.getCurrentUser(); // получаем текущего пользователя
    if (currentUser) {
      const userFavoritesKey = `favorites_${currentUser.uid}`; // создаем ключ для хранения избранных фильмов
      let savedMovies =
        JSON.parse(localStorage.getItem(userFavoritesKey)) || []; // получаем избранные фильмы пользователя или создаем массив
      const isMovieAlreadySaved = savedMovies.some(
        (savedMovies) => savedMovies.id === movie.id
      ); // проверяем был ли фильм уже добавлен в изьранное
      if (!isMovieAlreadySaved) {
        savedMovies.unshift(movie);
        localStorage.setItem(userFavoritesKey, JSON.stringify(savedMovies));
      }
    } else {
      console.log(
        "Пользователь не аунтефицирован. Невозможно добавить фильм в избранное"
      );
    }
  }

  onClick = ({ target }) => {
    // Функция onClick срабатывает при клике на элемент.
    // Она получает объект события в качестве аргумента и деструктурирует свойство 'target'.
    const logoutLink = target.closest(".logout-link");
    const moreButton = target.closest(".more-button");
    const heartIcon = target.closest(".trigger");
    if (logoutLink) {
      return this.logout();
    }

    if (heartIcon) {
      const movieIndex = Array.from(
        heartIcon.closest(".grid").querySelectorAll(".trigger")
      ).indexOf(heartIcon);
      console.log(movieIndex);
      if (movieIndex !== -1) {
        const movie = this.state.filteredMovies[movieIndex];
        this.addToLocalStorage(movie);
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

  setUser() {
    const { getUser } = useUserStore(); // вытаскиваем из глобального стора пользователя
    this.setState({
      ...this.state,
      user: getUser(),
    }); // сохраняем его в стейт
  }

  componentDidMount() {
    this.setUser();
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("primary-page", PrimaryPage);
