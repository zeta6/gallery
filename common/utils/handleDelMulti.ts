import SavedImg from "common/types/SavedImg";
import { SetterOrUpdater } from "recoil";

export const handleDelMulti = (
  savedImg: SavedImg[],
  setSavedImg: (
    valOrUpdater: SavedImg[] | ((currVal: SavedImg[]) => SavedImg[])
  ) => void,
  multipleSelectedImg: number[],
  setMultipleSelectedImg: SetterOrUpdater<number[]>
) => {
  const selectedArr = [...multipleSelectedImg];
  const bool = window.confirm("삭제하시겠습니까?");
  if (bool) {
    const _savedImg = [...savedImg];
    selectedArr.sort((a, b) => {
      return b - a;
    });
    selectedArr.forEach((selectedIndex) => _savedImg.splice(selectedIndex, 1));
    setSavedImg(_savedImg);
    setMultipleSelectedImg([]);
  }
};

export default handleDelMulti;
