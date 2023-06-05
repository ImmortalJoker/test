import BackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IAsteroid } from "../types/asteroid";
import { getAsteroid } from "../utils/api";
import LoginButton from '../Login/LoginButton';

interface AsteroidProps {
  id: string
}

const Asteroid: React.FC<AsteroidProps> = ({
  id
}) => {
  const [data, setData] = useState<IAsteroid>();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    getAsteroid(id)
      .then(res => {
        setData(res as IAsteroid);
       })
  }, [id]);

  return data ? (
    <div className="App">
      <header className="App-header">
        <Stack
          width={'100%'}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton aria-label="back" onClick={goBack}>
            <BackIcon />
          </IconButton>

          <Typography variant="h5">Asteroid "{data.name}"</Typography>

          <LoginButton />
        </Stack>
      </header>

      <Container maxWidth="sm">
        <Box
          sx={{
            width: 300,
            height: 300,
          }}
        >
          <img alt={data.name} src={data.nasa_jpl_url} />
        </Box>
        
        <Typography variant='body1'>
          <b>absolute_magnitude_h:</b> {data.absolute_magnitude_h}
        </Typography>
        
        <Typography variant='body1'>
          <b>estimated_diameter:</b> {data.estimated_diameter.kilometers.estimated_diameter_max}
        </Typography>
        
        <Typography variant='body1'>
          <b>is_potentially_hazardous_asteroid:</b> {data.is_potentially_hazardous_asteroid ? "Yes": "No"}
        </Typography>

      </Container>
    </div>
  ) : null;
};

export default Asteroid;
