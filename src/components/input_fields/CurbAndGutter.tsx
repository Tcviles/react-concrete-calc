import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';

interface CurbAndGutterProps {
  onVolumeChange: (area: number) => void;
}

const CurbAndGutter: React.FC<CurbAndGutterProps> = ({ onVolumeChange }) => {
  const [curbDepth, setCurbDepth] = useState(0);
  const [curbHeight, setCurbHeight] = useState(0);
  const [gutterWidth, setGutterWidth] = useState(0);
  const [flagThickness, setFlagThickness] = useState(0);
  const [length, setLength] = useState(0);

  const [curbDepthUnit, setCurbDepthUnit] = useState('ft');
  const [curbHeightUnit, setCurbHeightUnit] = useState('ft');
  const [gutterWidthUnit, setGutterWidthUnit] = useState('ft');
  const [flagThicknessUnit, setFlagThicknessUnit] = useState('ft');
  const [lengthUnit, setLengthUnit] = useState('ft');

  useEffect(() => {
    // Convert all values to feet before calculation
    const convertToFeet = (value: number, unit: string) => {
      switch (unit) {
        case 'ft': return value;
        case 'in': return value / 12;
        case 'm': return value * 3.28084;
        case 'cm': return value * 0.0328084;
        default: return value;
      }
    };

    const curbDepthInFeet = convertToFeet(curbDepth, curbDepthUnit);
    const curbHeightInFeet = convertToFeet(curbHeight, curbHeightUnit);
    const gutterWidthInFeet = convertToFeet(gutterWidth, gutterWidthUnit);
    const flagThicknessInFeet = convertToFeet(flagThickness, flagThicknessUnit);
    const lengthInFeet = convertToFeet(length, lengthUnit);

    const curbVolume = (curbDepthInFeet * (curbHeightInFeet + flagThicknessInFeet) * lengthInFeet) / 27;
    const gutterVolume = (gutterWidthInFeet * flagThicknessInFeet * lengthInFeet) / 27;
    
    onVolumeChange(curbVolume + gutterVolume);
  }, [curbDepth, curbHeight, gutterWidth, flagThickness, length, curbDepthUnit, curbHeightUnit, gutterWidthUnit, flagThicknessUnit, lengthUnit, onVolumeChange]);

  const handleNumberInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(parseFloat(event.target.value) || 0);
    };

  const unitOptions = ['ft', 'in', 'm', 'cm'];

  return (
    <Grid container spacing={2} padding={1}>
      {/* Curb Depth Field */}
      <Grid item xs={6}>
        <TextField 
          label="Curb Depth" 
          type="integer"
          value={curbDepth} 
          onChange={handleNumberInputChange(setCurbDepth)} 
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Unit</InputLabel>
          <Select value={curbDepthUnit} onChange={(e) => setCurbDepthUnit(e.target.value)}>
            {unitOptions.map((unit) => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Curb Height Field */}
      <Grid item xs={6}>
        <TextField 
          label="Curb Height" 
          type="integer"
          value={curbHeight} 
          onChange={handleNumberInputChange(setCurbHeight)} 
          fullWidth 
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Unit</InputLabel>
          <Select value={curbHeightUnit} onChange={(e) => setCurbHeightUnit(e.target.value)}>
            {unitOptions.map((unit) => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Gutter Width Field */}
      <Grid item xs={6}>
        <TextField 
          label="Gutter Width" 
          type="integer"
          value={gutterWidth} 
          onChange={handleNumberInputChange(setGutterWidth)} 
          fullWidth 
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Unit</InputLabel>
          <Select value={gutterWidthUnit} onChange={(e) => setGutterWidthUnit(e.target.value)}>
            {unitOptions.map((unit) => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Flag Thickness Field */}
      <Grid item xs={6}>
        <TextField 
          label="Flag Thickness" 
          type="integer"
          value={flagThickness} 
          onChange={handleNumberInputChange(setFlagThickness)} 
          fullWidth 
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Unit</InputLabel>
          <Select value={flagThicknessUnit} onChange={(e) => setFlagThicknessUnit(e.target.value)}>
            {unitOptions.map((unit) => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Length Field */}
      <Grid item xs={6}>
        <TextField 
          label="Length" 
          type="integer"
          value={length} 
          onChange={handleNumberInputChange(setLength)} 
          fullWidth 
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Unit</InputLabel>
          <Select value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
            {unitOptions.map((unit) => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CurbAndGutter;
