import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

interface BlockProps {
  onVolumeChange: (volume: number) => void;
}

const Block: React.FC<BlockProps> = ({ onVolumeChange }) => {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [depth, setDepth] = useState<number>(0);

  useEffect(() => {
    const volume = (length * width * (depth / 12)) / 27;
    onVolumeChange(volume);
  }, [length, width, depth, onVolumeChange]);

  const handleNumberInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value)
      setter(+event.target.value);
    };

  return (
    <>
      <TextField 
        label="Length (ft)" 
        type="integer" 
        value={length} 
        onChange={handleNumberInputChange(setLength)} 
        fullWidth 
        margin="normal" 
      />
      <TextField 
        label="Width (ft)" 
        type="integer" 
        value={width} 
        onChange={handleNumberInputChange(setWidth)} 
        fullWidth 
        margin="normal" 
      />
      <TextField 
        label="Depth (in)" 
        type="integer" 
        value={depth} 
        onChange={handleNumberInputChange(setDepth)} 
        fullWidth 
        margin="normal" 
      />
    </>
  );
};

export default Block;
