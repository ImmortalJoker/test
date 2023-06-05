import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { Stack } from '@mui/system';
import './DateRangePicker.css';

interface DateRangePickerProps {
  onChange: (range: [Dayjs, Dayjs]) => void;
}

const now = dayjs();

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const [startDate, setStartDate] = useState<Dayjs>(() => now);
  const [endDate, setEndDate] = useState<Dayjs>(() => now.add(1, 'd'));
  const [errorMessage, setError] = useState<string | null>(null);

  const handleStart = (value: Dayjs | null): void => { 
    if (!value) return;

    if (value.isAfter(endDate)) {
      setError('Start Date should always be less than End Date');
    } else {
      setError(null);
    }
    
    setStartDate(value);
  };
  
  const handleEnd = (value: Dayjs | null): void => { 
    if (!value) return;

    if (value.isBefore(startDate)) {
      setError('End Date should always be greater than Start Date');
    } else {
      setError(null);
    }

    setEndDate(value);
  };

  useEffect(() => {
    if (errorMessage === null) {
      onChange([startDate, endDate]);
    }
  }, [startDate, endDate, errorMessage, onChange])

  return (
    <div className='container'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <DatePicker<Dayjs> 
            label="Choose start date" 
            value={startDate} 
            onChange={handleStart}
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
          />

          <DatePicker<Dayjs> 
            label="Choose end date" 
            value={endDate} 
            onChange={handleEnd}
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}

export default DateRangePicker;
