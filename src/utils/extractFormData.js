export const extractFormData = (form) => {
  const data = new FormData(form); // FormData автоматически захватывает поля из переданной HTML формы.
  const result = {};

  data.forEach((value, key) => {
    // используется метод forEach для перебора всех элементов в data
    result[key] = value;
  }); // Таким образом, result содержит все значения полей формы,
  // где ключами будут имена полей, а значениями - введенные пользователем данные.
  // key - имя поля, value - данные, которые ввел пользователь

  return result;
};
