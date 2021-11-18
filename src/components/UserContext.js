import React from 'react';

export interface User {
  username?: string;
  picture?: string;
  isLogged: boolean;
}

export interface UserState {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = React.createContext<UserState>({
  user: { isLogged: false },
  setUser: () => {},
});

export default UserContext;