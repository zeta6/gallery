import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material'
import Link from '../src/Link';

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          mt: 15,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Gallery reproduction using next.js
        </Typography>
        <Link href="/gallery" color="secondary">
          <Button sx={{mt: 3}} variant='contained'>
            go to gallery
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
