import { Dayjs } from 'dayjs';
import { useCallback, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import AsteroidsList from '../AsteroidsList';
import DateRangePicker from '../DateRangePicker';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import LoginButton from '../Login/LoginButton';


const Home: React.FC = () => {
  const [[startDate, endDate], setRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDateUpdate = useCallback((range: [Dayjs, Dayjs]): void => {
    setRange(range);
  }, []);

  const goToFavorite = () => {
    navigate('/favorite');
  }

  return (
    <div className="App">
      <header className="App-header">
        <Stack
          width={'100%'}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <IconButton
            aria-label="Favorite List"
            disabled={!user}
            onClick={goToFavorite}
          >
            <StarOutlineIcon />
          </IconButton>
          
          <DateRangePicker onChange={handleDateUpdate} />

          <LoginButton />
        </Stack>
      </header>

      {
        startDate && endDate
          ? <AsteroidsList startDate={startDate} endDate={endDate} />
          : 'Nothing to show'
      }
    </div>
  );
};

export default Home;
