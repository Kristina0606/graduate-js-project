import { Component } from "./core/Component";
import template from "./app.template.hbs";
import { ROUTES } from "./constants/routes";

import "./core/Router";

import "./pages/home/home.component";
import "./pages/sign-in/sign-in.component";
import "./pages/sign-up/sign-up.component";
import "./pages/primary/primary.component";
import "./pages/favorites/favorites.component";
import "./pages/film/film.component";
import "./pages/not-found/not-found.component";
import "./components/toast/toast.component";
import "./components/input/input.component";
import "./components/button/button.component";
import "./components/loader/loader.component";
import { authService } from "./services/Auth";
import { useToastNotification } from "./hooks/useToastNotification";
import { store } from "./store/Store";
import { useUserStore } from "./hooks/useUserStore";

export class App extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isLoading: false,
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading, //  инвертируется (если было true, станет false, и наоборот).
    });
  }; // используется для переключения состояния isLoading

  initializeApp() {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .authorizeUser()
      .then((user) => {
        if (user.uid) {
          setUser({ ...user });
        }
      })
      .catch((error) => {
        useToastNotification({ message: error.message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  }
  // проверяем авторизован ли пользователь

  componentDidMount() {
    this.initializeApp();
  }
}

customElements.define("my-app", App);
