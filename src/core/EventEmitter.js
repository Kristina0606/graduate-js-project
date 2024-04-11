export class EventEmitter {
  constructor() {
    this.eventTarget = new EventTarget(); // браузерный класс
  }

  on(type, listener) {
    this.eventTarget.addEventListenert(type, listener); //
  } // подписывает класс на какое либо событие

  off(type, listener) {
    this.eventTarget.removeEventListener(type, listener);
  } // отписываемся

  emit(type, data) {
    return this.eventTarget.dispatchEvent(
      new CustomEvent(type, { detail: data })
    );
  } // публикует события
}

export const eventEmitter = new EventEmitter();
