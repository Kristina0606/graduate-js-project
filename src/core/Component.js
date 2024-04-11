import Handlebars from "handlebars";

export class Component extends HTMLElement {
  constructor() {
    super();
    this.state = {};
    this.props = {};
    this.template = null; // для работы с компайлингом
  }

  setState(state) {
    ///// обновляем состояние объекта
    this.state = state;
    this.compile();
  }

  compile() {
    /// использует текущий шаблон, компилирует его с помощью Handlebars.compile
    // и обновляет содержимое элемента с помощью полученного HTML.  => перерисовывет верстку
    const template = Handlebars.compile(this.template);
    this.innerHTML = "";
    this.innerHTML = template(this.state);
  }

  connectedCallback() {
    // Вызывается, когда компонент добавляется в DOM.
    this.compile();
    this.componentDidMount();
  }

  disconnectedCallback() {
    // Вызывается, когда компонент удаляется из DOM.
    this.componentWillUnmount;
  }

  componentDidMount() {} //  Этот метод может быть переопределен в дочерних классах
  // для выполнения дополнительных действий после добавления компонента в DOM.

  componentWillUnmount() {} //  Этот метод может быть переопределен в дочерних классах
  // для выполнения дополнительных действий после удаления компонента из DOM.
}
