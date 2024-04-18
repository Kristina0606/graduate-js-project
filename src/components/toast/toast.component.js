import { EVENT_TYPES } from "../../constants/eventTypes";
import { Component } from "../../core/Component";
import { eventEmitter } from "../../core/EventEmitter";
import { INITIAL_STATE } from "./initialState";
import template from "./toast.template.hbs";
import { getToastType } from "./utils";

export class Toast extends Component {
  constructor() {
    super();

    this.timerID = null;
    this.template = template();
    this.state = { ...INITIAL_STATE };
  }

  hideToast = () => {
    this.setState(INITIAL_STATE);
  };

  showToast = ({ detail }) => {
    this.timerID = setTimeout(this.hideToast, 3000);
    this.setState({
      isShow: true,
      type: getToastType(detail.type),
      message: detail.message,
    });
  }; //принимает объект события (detail) и обновляет состояние компонента.
  //Если приходит событие toastNotification, метод устанавливает флаг isShow в true и обновляет текст сообщения (message) на основе переданного детального сообщения.

  componentDidMount() {
    eventEmitter.on(EVENT_TYPES.toastNotification, this.showToast);
    this.addEventListener("click", this.hideToast);
  }

  componentWillUnmount() {
    eventEmitter.off(EVENT_TYPES.toastNotification, this.showToast);
    this.removeEventListener("click", this.hideToast);
    clearTimeout(this.timerID);
  }
}

customElements.define("ui-toast", Toast);
