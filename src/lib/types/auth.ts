export type Unauthed = {
  authenticated: false;
};

export type Authed = {
  authenticated: true;
  id: string;
  username: string;
  admin: boolean;
};
