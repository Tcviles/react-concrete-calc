import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

interface CurbAndGutterProps {
  onVolumeChange: (area: number) => void;
}

const CurbAndGutter: React.FC<CurbAndGutterProps> = ({ onVolumeChange }) => {
  const [curbDepth, setCurbDepth] = useState(0);
  const [curbHeight, setCurbHeight] = useState(0);
  const [gutterWidth, setGutterWidth] = useState(0);
  const [flagThickness, setFlagThickness] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const curbVolume = (curbDepth * (curbHeight + flagThickness) * length) / 27;
    const gutterVolume = (gutterWidth * flagThickness * length) / 27;
    onVolumeChange(curbVolume + gutterVolume);
  }, [curbDepth, curbHeight, gutterWidth, flagThickness, length, onVolumeChange]);

  return (
    <>
      <TextField label="Curb Depth (ft)" type="number" value={curbDepth} onChange={(e) => setCurbDepth(Number(e.target.value))} fullWidth margin="normal" />
      <TextField label="Curb Height (ft)" type="number" value={curbHeight} onChange={(e) => setCurbHeight(Number(e.target.value))} fullWidth margin="normal" />
      <TextField label="Gutter Width (ft)" type="number" value={gutterWidth} onChange={(e) => setGutterWidth(Number(e.target.value))} fullWidth margin="normal" />
      <TextField label="Flag Thickness (ft)" type="number" value={flagThickness} onChange={(e) => setFlagThickness(Number(e.target.value))} fullWidth margin="normal" />
      <TextField label="Length (ft)" type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} fullWidth margin="normal" />
    </>
  );
};

export default CurbAndGutter;
