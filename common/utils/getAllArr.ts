import SavedImg from "common/types/SavedImg";

export const getAllArr = (savedImg: SavedImg[]) => {
  const all: number[] = Array.from({ length: savedImg.length }, (x, i) => i);
  return all;
};

export default getAllArr;
