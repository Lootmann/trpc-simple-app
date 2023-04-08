const LOCALSTORAGE_KEY = "hogeUserName";

export const setToken = (username: string) => {
  localStorage.setItem(LOCALSTORAGE_KEY, username);
};

export const getToken = (): string | null => {
  return localStorage.getItem(LOCALSTORAGE_KEY);
};
