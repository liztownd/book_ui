import {
  FunctionComponent,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface IUserContext {
  user: IUser | undefined;
  setUser: Dispatch<SetStateAction<IUserContext["user"]>>;
  login: (email: string) => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

interface Props {}

export const Provider: FunctionComponent<Props> = ({ children }) => {
  const apiBaseUrl = "https://thawing-sierra-15233.herokuapp.com/api/v1";

  const [user, setUser] = useState<IUser | undefined>();

  const login = async (email: string) => {
    const url = `${apiBaseUrl}/users`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((res) => {
      return res.json();
    });

    setUser({ email: response.email, id: response.id });
  };

  return (
    <UserContext.Provider value={{ user, setUser, login }}>
      {children}
    </UserContext.Provider>
  );
};

export interface IUser {
  email: string;
  id: number;
}

export type IUserInput = {
  email: string;
};
