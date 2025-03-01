import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';

interface CylinderProps {
  onVolumeChange: (area: number) => void;
}

const Cylinder: React.FC<CylinderProps> = ({ onVolumeChange }) => {
  const [diameter, setDiameter] = useState(0);
  const [depth, setDepth] = useState(0);

  const [diameterUnit, setDiameterUnit] = useState('ft');
  const [depthUnit, setDepthUnit] = useState('in');

  useEffect(() => {
    // Convert all values to feet before calculating
    const convertToFeet = (value: number, unit: string) => {
      switch (unit) {
        case 'ft': return value;
        case 'in': return value / 12;
        case 'm': return value * 3.28084;
        case 'cm': return value * 0.0328084;
        default: return value;
      }
    };

    const diameterInFeet = convertToFeet(diameter, diameterUnit);
    const depthInFeet = convertToFeet(depth, depthUnit);

    const radius = diameterInFeet / 2;
    const volume = (Math.PI * radius * radius * depthInFeet) / 27; // Convert cubic feet to cubic yards

    onVolumeChange(volume);
  }, [diameter, depth, diameterUnit, depthUnit, onVolumeChange]);

  const handleNumberInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(parseFloat(event.target.value) || 0);
    };

  const unitOptions = ['ft', 'in', 'm', 'cm'];

  return (
    <Grid container spacing={2}>
      {/* Diameter Field */}
      <Grid item xs={9}>
        <TextField 
          label="Diameter" 
          type="number" 
          value={diameter} 
          onChange={handleNumberInputChange(setDiameter)} 
          fullWidth 
          margin="normal" 
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth margin="normal">
          <Select value={diameterUnit} onChange={(e) => setDiameterUnit(e.target.value)}>
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

export default Cylinder;
