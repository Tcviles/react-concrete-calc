import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Select, FormControl, Grid } from '@mui/material';

interface BlockProps {
  onVolumeChange: (volume: number) => void;
}

const Block: React.FC<BlockProps> = ({ onVolumeChange }) => {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [depth, setDepth] = useState<number>(0);

  const [lengthUnit, setLengthUnit] = useState<string>('ft');
  const [widthUnit, setWidthUnit] = useState<string>('ft');
  const [depthUnit, setDepthUnit] = useState<string>('in');

  useEffect(() => {
    // Convert all values to feet before calculating volume
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
    const depthInFeet = convertToFeet(depth, depthUnit);

    const volume = (lengthInFeet * widthInFeet * depthInFeet) / 27; // Convert cubic feet to cubic yards
    onVolumeChange(volume);
  }, [length, width, depth, lengthUnit, widthUnit, depthUnit, onVolumeChange]);

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

      {/* Depth Field */}
      <Grid item xs={9}>
        <TextField 
          label="Depth" 
          type="number" 
          value={depth} 
          onChange={handleNumberInputChange(setDepth)} 
          fullWidth 
          margin="normal" 
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth margin="normal">
          <Select value={depthUnit} onChange={(e) => setDepthUnit(e.target.value)}>
            {unitOptions.map((unit) => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Block;
