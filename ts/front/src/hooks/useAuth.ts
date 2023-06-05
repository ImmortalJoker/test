import { useState } from "react";

interface Output {
  user?: string;
  initials: string;
  login: (userName: string) => void;
  logout: () => void;
}

const USER_KEY = 'test_page_asteroid_user';

const useAuth = (): Output => {
  const [user, setUser] = useState<string | undefined>(localStorage.getItem(USER_KEY) ?? undefined);

  const login: Output['login'] = (userName) => {
    setUser(userName);
    localStorage.setItem(USER_KEY, userName);
  };

  const logout: Output['logout'] = () => {
    setUser(undefined);
    localStorage.removeItem(USER_KEY);
  };

  const getInitials = () =>
    user?.split(' ').reduce((acc, item, index) => {
      if (index < 2) {
        acc += item[0];
      }

      return acc;
    }, '');

  return {
    user,
    initials: getInitials() ?? '',
    login,
    logout,
  }
};

export default useAuth;