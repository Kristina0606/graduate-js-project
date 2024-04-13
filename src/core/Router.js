import Route from "route-parser";

import { ROUTES } from "../constants/routes";
import { eventEmitter } from "./EventEmitter";
import { EVENT_TYPES } from "../constants/eventTypes";

export class Router extends HTMLElement {
  // маршрутизатор
  constructor() {
    super();
    this.activeRoute = {};
    this.outlet = this.querySelector("app-outlet");
  } //  находит элемент с селектором “app-outlet” и сохраняет его в свойство outlet. Также создается пустой объект activeRoute.

  get routes() {
    return Array.from(this.querySelectorAll("app-route")).map((route) => ({
      path: new Route(route.getAttribute("path")),
      title: route.getAttribute("title"),
      component: route.getAttribute("component"),
    }));
  } // Этот геттер возвращает массив объектов маршрутов.
  //Метод querySelectorAll находит все элементы с селектором “app-route” и преобразует их в объекты маршрутов.
  // Каждый маршрут представлен объектом с полями path, title и component.

  setDocumentTitle(title) {
    document.title = title || document.title;
  } // Устанавливает заголовок документа (страницы) в переданное значение title или оставляет текущий заголовок.

  findActiveRoute(url) {
    const activeRoute = this.routes.find((route) => route.path.match(url));
    const params = activeRoute?.path?.match(url);

    return { ...activeRoute, params };
  } // Ищет активный маршрут для указанного URL. Если маршрут найден, возвращает объект с полями component, title и params (параметры маршрута).

  navigate(url) {
    const matchedRoute = this.findActiveRoute(url);
    if (matchedRoute.component) {
      window.history.pushState(null, "", url);
      this.render(matchedRoute);
    } else {
      window.history.pushState(null, "", ROUTES.notFound);
      this.render(this.routes[this.routes.length - 1]);
    }
  } //  Навигирует по указанному URL. Если найден соответствующий маршрут,
  // обновляет URL в истории браузера и вызывает метод render для отображения соответствующего компонента.
  // В противном случае перенаправляет на страницу “notFound”.

  setComponentParams(params, view) {
    for (let key in params) {
      view.setAttribute(key, params[key]);
    }
  } // Устанавливает атрибуты компонента view на основе переданных параметров params.

  render(activeRoute) {
    const { component, title, params } = activeRoute;
    const view = document.createElement(component);
    this.setComponentParams(params, view);
    this.setDocumentTitle(title);
    this.outlet.innerHTML = "";
    this.outlet.append(view);
  } // Создает новый элемент компонента на основе активного маршрута.
  // Устанавливает атрибуты компонента, заголовок документа, очищаем элемент outlet и отображает компонент в элементе outlet.

  onPopState = () => {
    const activeRoute = this.findActiveRoute(window.location.pathname);
    this.render(activeRoute);
  }; // вызывает метод render для обновления компонента при изменении URL.

  onChangeRoute = (evt) => {
    this.navigate(evt.detail.target);
  }; // Обработчик события изменения маршрута, который вызывает метод navigate для навигации по новому URL.

  connectedCallback() {
    this.navigate(window.location.pathname);
    window.addEventListener("popstate", this.onPopState);
    eventEmitter.on(EVENT_TYPES.changeRoute, this.onChangeRoute);
  } // Вызывается при подключении элемента к DOM. Начальная навигация по текущему URL и добавление обработчика события “popstate”.

  disconnectedCallback() {
    window.removeEventListener("popstate", this.onPopState);
    eventEmitter.off(EVENT_TYPES.changeRoute, this.onChangeRoute);
  } //  метод, который вызывается, когда элемент удаляется из DOM
}

customElements.define("app-router", Router);
