import template from "./primary.template.hbs";
import { Component } from "../../core/Component";
import { ROUTES } from "../../constants/routes";
import { moviesData } from "./filmsData";

export class PrimaryPage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      movies: moviesData,
      links: [
        {
          label: "Log out",
          href: ROUTES.home,
        },
      ],
    };
  }
}

customElements.define("primary-page", PrimaryPage);
