import { Component } from "../../core/Component";
import template from "./sign-up.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "../../utils/extractFormData";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";

export class SignUp extends Component {
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
      isLoading: !this.state.isLoading,
    });
  };

  registerUser = (evt) => {
    evt.preventDefault(); // предотвращаем перезаргузку страницы, что бы браузер не делал никаких запросов
    const formData = extractFormData(evt.target);
    this.toggleIsLoading();
    authService
      .signUp(formData.email, formData.password)
      .then((data) => {
        useToastNotification({ message: "Success!", type: TOAST_TYPE.success });
        useNavigate(ROUTES.primary);
      })
      .catch((error) => {
        useToastNotification({ message: error.message }); // тип не указываем так как по умолчанию функция принимает тип эрор
      })
      .finally(() => {
        this.toggleIsLoading();
      }); // then - если промис завершился успешно, catch - если промис завершился с ошибкой, finally вызывается в любом случае
  };

  componentDidMount() {
    this.addEventListener("submit", this.registerUser);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.registerUser);
  }
}

customElements.define("sign-up-page", SignUp);
