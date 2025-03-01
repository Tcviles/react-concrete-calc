import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Select, FormControl, Grid } from '@mui/material';

interface StepsProps {
  onVolumeChange: (area: number) => void;
}

const Steps: React.FC<StepsProps> = ({ onVolumeChange }) => {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [rise, setRise] = useState(0);
  const [run, setRun] = useState(0);
  const [numSteps, setNumSteps] = useState(0);

  const [lengthUnit, setLengthUnit] = useState('ft');
  const [widthUnit, setWidthUnit] = useState('ft');
  const [riseUnit, setRiseUnit] = useState('in');
  const [runUnit, setRunUnit] = useState('ft');

  useEffect(() => {
    // Convert all values to feet
    const convertToFeet = (value: number, unit: string) => {
      switch (unit) {
        case 'ft': return value;
        case 'in': return value / 12;
        case 'm': return value * 3.28084;
        case 'cm': return value * 0.0328084;
        default: return value;
      }
    };

    const lengthInFeet = convertToFeet(length, lengthUnit);
    const widthInFeet = convertToFeet(width, widthUnit);
    const riseInFeet = convertToFeet(rise, riseUnit);
    const runInFeet = convertToFeet(run, runUnit);

    // Calculate volume in cubic feet and convert to cubic yards
    const platformVolume = (lengthInFeet * (riseInFeet * numSteps) * widthInFeet) / 27;
    const stepVolume = (runInFeet * riseInFeet * (numSteps - 1) * widthInFeet) / 27;
    const totalArea = platformVolume + stepVolume;
    
    onVolumeChange(totalArea);
  }, [length, width, rise, run, numSteps, lengthUnit, widthUnit, riseUnit, runUnit, onVolumeChange]);

  const handleNumberInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(parseFloat(event.target.value) || 0);
    };

  const unitOptions = ['ft', 'in', 'm', 'cm'];

  return (
    <Grid container spacing={2}>
      {/* Length Field */}
      <Grid item xs={9}>
        <TextField 
          label="Length" 
          type="number" 
          value={length} 
          onChange={handleNumberInputChange(setLength)} 
          fullWidth 
          margin="normal" 
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth margin="normal">
          <Select value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
            {unitOptions.map((unit) => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Width Field */}
      <Grid item xs={9}>
        <TextField 
          label="Width" 
          type="number" 
          value={width} 
          onChange={handleNumberInputChange(setWidth)} 
          fullWidth 
          margin="normal" 
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth margin="normal">
          <Select value={widthUnit} onChange={(e) => setWidthUnit(e.target.value)}>
            {unitOptions.map((unit) => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Rise Field */}
      <Grid item xs={9}>
        <TextField 
          label="Rise" 
          type="number" 
          value={rise} 
          onChange={handleNumberInputChange(setRise)} 
          fullWidth 
          margin="normal" 
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth margin="normal">
          <Select value={riseUnit} onChange={(e) => setRiseUnit(e.target.value)}>
            {unitOptions.map((unit) => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Run Field */}
      <Grid item xs={9}>
        <TextField 
          label="Run" 
          type="number" 
          value={run} 
          onChange={handleNumberInputChange(setRun)} 
          fullWidth 
          margin="normal" 
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth margin="normal">
          <Select value={runUnit} onChange={(e) => setRunUnit(e.target.value)}>
            {unitOptions.map((unit) => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Number of Steps Field */}
      <Grid item xs={12}>
        <TextField 
          label="Number of Steps" 
          type="number" 
          value={numSteps} 
          onChange={handleNumberInputChange(setNumSteps)} 
          fullWidth 
          margin="normal" 
        />
      </Grid>
    </Grid>
  );
};

export default Steps;
