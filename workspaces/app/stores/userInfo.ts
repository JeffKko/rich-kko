import create, { GetState, SetState } from 'zustand';
import { StoreApiWithPersist } from 'zustand/middleware';

interface UserInfoStore {
  jwt: string;
  ID: string;
  name: string;
  email: string;
  exp: number;
  setJwt: (arg0: string) => void;
  setUserInfo: (arg0: UserInfo) => void;
}

export interface UserInfo {
  jwt: string;
  ID: string;
  name: string;
  email: string;
  exp: number;
}

export const useStore = create<
  UserInfoStore,
  SetState<UserInfoStore>,
  GetState<UserInfoStore>,
  StoreApiWithPersist<UserInfoStore>
>(set => ({
  jwt: '',
  ID: '',
  name: '',
  email: '',
  exp: 0,
  setJwt: jwt =>
    set(state => ({
      ...state,
      jwt,
    })),
  setUserInfo: userInfo =>
    set(state => ({
      ...state,
      ...userInfo,
    })),
}));
