//  keep token in memory
export let accessToken: string | null;

export const setToken = (username: string) => {
  accessToken = username;
};

export const getToken = (): string | null => {
  return accessToken;
};
