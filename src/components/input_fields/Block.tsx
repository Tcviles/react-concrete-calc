import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

interface BlockProps {
  onVolumeChange: (area: number) => void;
}

const Block: React.FC<BlockProps> = ({ onVolumeChange }) => {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const area = length * width * (depth / 12) / 27;
    onVolumeChange(area);
  }, [length, width, depth, onVolumeChange]);

  const handleNumberInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setter(value === '' ? 0 : Number(value));
    };

  return (
    <>
      <TextField 
        label="Length (ft)" 
        type="number" 
        value={length} 
        onChange={handleNumberInputChange(setLength)} 
        fullWidth 
        margin="normal" 
      />
      <TextField 
        label="Width (ft)" 
        type="number" 
        value={width} 
        onChange={handleNumberInputChange(setWidth)} 
        fullWidth 
        margin="normal" 
      />
      <TextField 
        label="Depth (in)" 
        type="number" 
        value={depth} 
        onChange={handleNumberInputChange(setDepth)} 
        fullWidth 
        margin="normal" 
      />
    </>
  );
};

export default Block;
