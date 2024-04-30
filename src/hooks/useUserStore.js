import { store } from "../store/Store";

export const useUserStore = () => {
  const setUser = (user) => {
    store.setState({ user }); // устанавливает пользователя
    localStorage.setItem("user", JSON.stringify(user));
    console.log("user", user);
  };

  const getUser = () => {
    return store.getState().user;
  }; // возвращает пользователя

  const removeUser = () => {
    store.setUser({ user: null });
  };

  return {
    setUser,
    getUser,
    removeUser,
  };
};
