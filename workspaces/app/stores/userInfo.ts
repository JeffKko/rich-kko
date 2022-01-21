import create, { GetState, SetState } from 'zustand';
import { StoreApiWithPersist } from 'zustand/middleware';

interface UserInfoState {
  jwt: string;
  setJwt: (arg0: string) => void;
}

export const useStore = create<
  UserInfoState,
  SetState<UserInfoState>,
  GetState<UserInfoState>,
  StoreApiWithPersist<UserInfoState>
>(set => ({
  jwt: '',
  setJwt: jwt =>
    set(state => ({
      jwt,
    })),
}));
