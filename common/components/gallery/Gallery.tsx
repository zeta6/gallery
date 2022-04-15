import { Button, Container } from "@mui/material"
import testImageUrl from 'common/test-data/testImageUrl'

interface SmallImageProp {
  imageUl: string
}


const SmallImage = ({imageUl} : SmallImageProp) => {
  return(
  <div style={{width:'300px', height:'300px', background: `url(${imageUl}`}}>
    <div>
      <button>chk</button>
      <button>...</button>
    </div>
    <div>
      일인칭뷰어
    </div>
  </div>
  )
}

export const Gallery = () => {
  return (
    <>
      <Button>X</Button>
      <Container>
        {/* 헤더 */}
        <div>
          4 개의 렌더샷 갤러리 모든렌더샷 모든 화질
        </div>
        {/* 본문 */}
        <div style={{display:'flex'}}>
          <SmallImage imageUl={testImageUrl[0]._id}></SmallImage>
          <SmallImage imageUl={testImageUrl[1]._id}></SmallImage>
          <SmallImage imageUl={testImageUrl[2]._id}></SmallImage>
        </div>
      </Container>
    </>
  )
}

export default Gallery