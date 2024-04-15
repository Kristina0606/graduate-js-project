import { Component } from "../../core/Component";
import template from "./router-button.template.hbs";
import { eventEmitter } from "../../core/EventEmitter";
import { EVENT_TYPES } from "../../constants/eventTypes";

export class RouterButton extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {
      className: this.getAttribute("class-name"),
      caption: this.getAttribute("caption"),
    };
  }

  onClick = (evt) => {
    evt.preventDefault();
    eventEmitter.emit(EVENT_TYPES.changeRoute, { target: this.state.href });
  };

  componentDidMount() {
    this.addEventListener("click");
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("route-button", RouterButton);
