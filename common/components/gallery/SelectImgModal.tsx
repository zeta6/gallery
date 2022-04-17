import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { Button, styled } from "@mui/material";
import { selectImgUrlState } from "common/atoms/selectImgUrlState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Image from 'next/image'
import { curImgIndexState } from "common/atoms/curImgIndexState";
import { savedImgState } from "common/atoms/savedImgState";
import { singleDownload } from 'common/utils/singleDownload'
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import handleDel from 'common/utils/handleDel'

const SelectImgModalWrapper = styled("div")({
  position: "absolute",
  top: "5%",
  left: "5%",
  height: "88%",
  width:'90%',
  marginTop: '10px',
  zIndex: 2,
});

const SelectImgModalContainer = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  zIndex: 2,
  backgroundColor: "#ffffff",
});

const SelectImgModal = (): EmotionJSX.Element => {
  const [selectImgUrl, setSelectImgUrl] = useRecoilState(selectImgUrlState);
  const [curImgIndex, setCurImgIndex] = useRecoilState(curImgIndexState)
  const [savedImg, setSavedImg ] = useRecoilState(savedImgState)
  useEffect(() => {
    if ( curImgIndex !== -1 ) {
    const url = savedImg[curImgIndex]["_id"]
    setSelectImgUrl(url)
    }
  }, [curImgIndex, savedImg]);
  return curImgIndex !== -1 ? (
    <>
      <SelectImgModalContainer>
        <Button
          sx={{ ml: "5%", mt: "15px", zIndex:3 }}
          variant="contained"
          onClick={() => setCurImgIndex(-1)}
        >
          X
        </Button>
        <Button variant="contained" sx={{ mt: "15px", mr:'100px', float:"right", zIndex:3}} 
          onClick={()=>handleDel(savedImg, setSavedImg, curImgIndex)}>
          <DeleteIcon></DeleteIcon>
        </Button>
        <Button variant="contained" sx={{float:"right", mr:'10px', mt: "15px", zIndex:3}} 
          onClick={()=>singleDownload(selectImgUrl)}>
          다운로드
        </Button>
        <Button variant="contained" sx={{position: 'fixed', top:'48%', left:'20px', zIndex:3}}
          onClick={()=> curImgIndex > 0 && setCurImgIndex(curImgIndex-1)}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </Button>
        <Button variant="contained" sx={{position: 'fixed', top:'48%', right:'20px', zIndex:3}}
          onClick={()=> curImgIndex < savedImg.length -1 && setCurImgIndex(curImgIndex+1)}>
          <ChevronRightIcon></ChevronRightIcon>
        </Button>
        <SelectImgModalWrapper>
          {selectImgUrl && <Image layout="responsive" height="900" width="1600" unoptimized={true} src={selectImgUrl} ></Image>}
        </SelectImgModalWrapper>
      </SelectImgModalContainer>
    </>
  ) : (
    <></>
  );
};

export default SelectImgModal;
