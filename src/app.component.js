import { Component } from "./core/Component";
import template from "./app.template.hbs";

import "./core/Router";

import "./pages/home/home.component";
import "./pages/not-found/not-found.component";
import "./pages/primary/primary.component";
import "./pages/favorites/favorites.component";
import "./pages/sign-in/sign-in.component";
import "./pages/sign-up/sign-up.component";

export class App extends Component {
  constructor() {
    super();
    this.template = template();
    this.state = {};
  }
}

customElements.define("my-app", App);
