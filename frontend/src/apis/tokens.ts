// TODO: Do not use localStorage
export let accessToken: string | null;

export const setToken = (username: string) => {
  localStorage.setItem("accessToken", username);
};

export const getToken = (): string | null => {
  return localStorage.getItem("accessToken");
};
