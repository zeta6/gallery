import { atom } from "recoil";
import SavedImg from "common/types/SavedImg";

export const savedImgState = atom<Array<SavedImg>>({
  key: "selectImgModalOpenState",
  default: [],
});
