import { Component } from "../../core/Component";
import template from "./sign-in.template.hbs";
import { ROUTES } from "../../constants/routes";

import "../../components/input/input.component";
import "../../components/button/button.component";
import "../../components/loader/loader.component";
import { eventEmitter } from "../../core/EventEmitter";
import { EVENT_TYPES } from "../../constants/eventTypes";
import { TOAST_TYPE } from "../../constants/toast";
import { useToastNotification } from "../../hooks/useToastNotification";

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

  componentDidMount() {
    setTimeout(() => {
      useToastNotification({ message: "hello" });
    }, 1000);
  }
}

customElements.define("sign-in-page", SignIn);
