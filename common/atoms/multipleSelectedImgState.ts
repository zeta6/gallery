import { atom } from "recoil";

export const multipleSelectedImgState = atom<Array<number>>({
  key: "multipleSelectedImgState",
  default: [],
});
