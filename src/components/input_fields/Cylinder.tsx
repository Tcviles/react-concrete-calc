import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

interface CylinderProps {
  onVolumeChange: (area: number) => void;
}

const Cylinder: React.FC<CylinderProps> = ({ onVolumeChange }) => {
  const [diameter, setDiameter] = useState(0);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const radius = diameter / 2;
    const area = (Math.PI * radius * radius * (depth / 12)) / 27; // cubic yards
    onVolumeChange(area);
  }, [diameter, depth, onVolumeChange]);

  const handleNumberInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setter(value === '' ? 0 : Number(value));
    };

  return (
    <>
      <TextField label="Diameter (ft)" type="number" value={diameter} onChange={handleNumberInputChange(setDiameter)} fullWidth margin="normal" />
      <TextField label="Depth (in)" type="number" value={depth} onChange={handleNumberInputChange(setDepth)} fullWidth margin="normal" />
    </>
  );
};

export default Cylinder;
