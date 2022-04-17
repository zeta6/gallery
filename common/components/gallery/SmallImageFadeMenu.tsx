import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { styled } from "@mui/material";
import { singleDownload } from 'common/utils/singleDownload'
import { savedImgState } from "common/atoms/savedImgState";
import { useRecoilState } from 'recoil';
import handleDel from 'common/utils/handleDel';

interface SmallImageFadeMenuProp {
  imgIndex: number
  imgUrl: string
}

const FadeMenu = styled('div')({  
  zIndex:3, 
  position: 'absolute', 
  top: '10px', 
  right: '50px', 
  width:'30px', 
  height:'30px', 
  textAlign:'center',
  filter: 'brightness(100%)', 
})

const SmallImageFadeMenu = ({imgIndex, imgUrl}: SmallImageFadeMenuProp) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [savedImg, setSavedImg ] = useRecoilState(savedImgState)
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FadeMenu>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='contained'
        sx={{opacity:0.3}}
        color='info'
        size='small'
      >
        ...
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={()=>handleDel(savedImg, setSavedImg, imgIndex)}>삭제</MenuItem>
        <MenuItem onClick={()=>singleDownload(imgUrl)}>다운로드</MenuItem>
      </Menu>
    </FadeMenu>
  );
}

export default SmallImageFadeMenu