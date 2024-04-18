export class EventEmitter {
  constructor() {
    this.eventTarget = new EventTarget(); // браузерный класс
  }

  on(type, listener) {
    this.eventTarget.addEventListener(type, listener); //
  } // подписывает класс на какое либо событие

  off(type, listener) {
    this.eventTarget.removeEventListener(type, listener);
  } // отписываемся

  emit(type, data) {
    return this.eventTarget.dispatchEvent(
      new CustomEvent(type, { detail: data })
    );
  } // триггерит данные событие и передает ему какие либо данные через объект
}

export const eventEmitter = new EventEmitter();
