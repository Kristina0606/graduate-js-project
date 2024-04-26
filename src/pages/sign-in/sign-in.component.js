import { Component } from "../../core/Component";
import template from "./sign-in.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "../../utils/extractFormData";
import { useToastNotification } from "../../hooks/useToastNotification";
import { useNavigate } from "../../hooks/useNavigate";
import { authService } from "../../services/Auth";
import { TOAST_TYPE } from "../../constants/toast";
import { useUserStore } from "../../hooks/useUserStore";

export class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      errors: {
        email: "",
      },
      isLoading: false,
    };

    this.template = template({
      routes: ROUTES,
    });
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading, //  инвертируется (если было true, станет false, и наоборот).
    });
  }; // используется для переключения состояния isLoading

  signInUser = (evt) => {
    evt.preventDefault(); // предотвращаем перезаргузку страницы, что бы браузер не делал никаких запросов
    const { setUser } = useUserStore();
    const formData = extractFormData(evt.target); // извлекает данные из формы в объект formData
    this.toggleIsLoading(); // отображения индикатора загрузки
    authService
      .signIn(formData.email, formData.password)
      .then((data) => {
        setUser({ ...data.user });
        useToastNotification({ message: "Success!", type: TOAST_TYPE.success });
        useNavigate(ROUTES.primary);
      })
      .catch((error) => {
        useToastNotification({ message: error.message }); // тип не указываем так как по умолчанию функция принимает тип эрор
      })
      .finally(() => {
        this.toggleIsLoading(); // finally переключает загрузку обратно на false
      }); // then - если промис завершился успешно, catch - если промис завершился с ошибкой, finally вызывается в любом случае
  };

  componentDidMount() {
    this.addEventListener("submit", this.signInUser);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.signInUser);
  }
}

customElements.define("sign-in-page", SignIn);
