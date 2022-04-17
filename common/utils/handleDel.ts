import SavedImg from "common/types/SavedImg";

export const handleDel = (
  savedImg: SavedImg[],
  setSavedImg: (
    valOrUpdater: SavedImg[] | ((currVal: SavedImg[]) => SavedImg[])
  ) => void,
  curImgIndex: number
) => {
  const bool = window.confirm("삭제하시겠습니까?");
  if (bool) {
    const _savedImg = [...savedImg];
    _savedImg.splice(curImgIndex, 1);
    setSavedImg(_savedImg);
  }
};

export default handleDel;
