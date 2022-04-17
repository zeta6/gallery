import { Button, styled, Container } from "@mui/material"
import testImageUrl from 'common/test-data/testImageUrl'
import Link from 'next/link'
import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { savedImgState } from "common/atoms/savedImgState";
import SelectImgModal from './SelectImgModal'
import SmallImage from './SmallImage'
import handleDelMulti from "common/utils/handleDelMulti";
import { multipleSelectedImgState } from "common/atoms/multipleSelectedImgState";


const download = async(imgUrl: string) => {
  const originalImage=imgUrl
  const image = await fetch(originalImage);
 
  //Split image name
  const nameSplit=originalImage.split("/");
  const  duplicateName=nameSplit.pop();
 
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)
  const link = document.createElement('a')
  link.href = imageURL;
  link.download = ""+duplicateName+"";
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)  
};

const MainContainer = styled('div')({
  display:'flex', 
  flexWrap: 'wrap', 
  alignItems: 'flex-start', 
  alignContent: 'center'
})

export const Gallery = () => {
  const [savedImg, setSavedImg] = useRecoilState(savedImgState)
  const [multipleSelectedImg, setMultipleSelectedImg] = useRecoilState(multipleSelectedImgState)
  useEffect(()=>{
    console.log('savedImg',savedImg)
    setSavedImg(testImageUrl)
  },[])
  return (
    savedImg ?
      <Container maxWidth={false} sx={{overflow:'hidden !important', webkitScrollbar: 'none'}}>
        <SelectImgModal />
      <div style={{marginTop:'15px'}}> 
        <Link href="/">
        <Button variant='outlined'>X</Button>
      </Link>
      <Button variant='outlined' sx={{float:'right', mr:'80px'}}
        onClick={()=>handleDelMulti(savedImg, setSavedImg, multipleSelectedImg, setMultipleSelectedImg)}
      >선택삭제</Button>
      <Button variant='outlined' sx={{float:'right', mr:'20px'}}>다운로드</Button>
      </div>
        {/* 헤더 */}
        <div style={{textAlign:'center'}}>
          <span style={{float:'left', fontSize:'14px'}}>{savedImg.length} 개의 렌더샷 </span>
          <span style={{fontSize:'18px', fontWeight:'700'}}>갤러리</span>
        </div>
        {/* 본문 */}
        <MainContainer>
          {savedImg.map((imgUrl, index) => 
          <SmallImage imgUrl={imgUrl._id} imgIndex={index} key={index}></SmallImage>
            )}
        </MainContainer>
      </Container>
      :
      <></>
  )
}

export default Gallery