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
    });
    this.state = {
      isLoading: false,
      user: null,
      movies: moviesData,
      favoriteMovies: [],
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

  onClick = ({ target }) => {
    const logoutLink = target.closest(".logout-link");
    const moreButton = target.closest(".more-button");

    if (logoutLink) {
      return this.logout();
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
