import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import Image from 'next/image'
import { styled } from "@mui/material";
import { curImgIndexState } from "common/atoms/curImgIndexState"
import SmallImageFadeMenu from './SmallImageFadeMenu'
import { multipleSelectedImgState } from "common/atoms/multipleSelectedImgState"



interface SmallImageProp {
  imgUrl: string
  imgIndex: number
}

const SmallImgCheckBox = styled('input')({ 
  zIndex:2, 
  position: 'absolute', 
  top: '10px', 
  left: '10px', 
  width:'20px', 
  height:'20px', 
  filter: 'brightness(100%)', 
  backgroundColor:'#ffffff' 
})

const SmallImgContainer = styled('div')({
  flex: '0 0 17%', 
  height:'auto', 
  width:'auto', 
  margin:'1%', 
  opacity:1, 
  zIndex:1, 
  position: 'relative'}
)

export const SmallImage = ({imgUrl, imgIndex} : SmallImageProp) => {
  const [mouseOver, setMounseOver] = useState(false)
  const [curImgIndex, setCurImgIndex] = useRecoilState(curImgIndexState)
  const [multipleSelectedImg, setMultipleSelectedImg] = useRecoilState(multipleSelectedImgState)
  const [checked, setChecked ] = useState(false)

  const handleCheck = (checkVal : boolean) => {
    if(checkVal) {
      const _multipleSelectedImg = [...multipleSelectedImg]
      _multipleSelectedImg.push(imgIndex)
      setMultipleSelectedImg(_multipleSelectedImg)
    } else {
      const _multipleSelectedImg = [...multipleSelectedImg]
      const _index = _multipleSelectedImg.findIndex((selected) => selected === imgIndex)
      _multipleSelectedImg.splice(_index, 1)
      setMultipleSelectedImg(_multipleSelectedImg)
    }
  }

  useEffect(()=> {
    multipleSelectedImg.includes(imgIndex) ? setChecked(true) : setChecked(false)
  }, [multipleSelectedImg])

  return(
  <SmallImgContainer
    onMouseEnter={() => setMounseOver(true)}
    onMouseLeave={() => setMounseOver(false)}
  >   
    <SmallImgCheckBox checked={checked} onChange={(e)=>handleCheck(e.target.checked)} type="checkbox" sx={{visibility: mouseOver ? "visible" : "hidden" }} />
    <SmallImageFadeMenu imgIndex={imgIndex} imgUrl={imgUrl}></SmallImageFadeMenu>
      <div style={{margin:0,zIndex:1, height:'18vh', aspectRatio: '16 / 9', filter: mouseOver ? 'brightness(50%)' : 'brightness(100%)'}}>
        <Image onClick={()=>setCurImgIndex(imgIndex)} layout="fill" src={imgUrl}></Image>
      </div>
  </SmallImgContainer>
  )
}


export default SmallImage