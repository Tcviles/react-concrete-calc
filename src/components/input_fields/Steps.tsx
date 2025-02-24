import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

interface StepsProps {
  onVolumeChange: (area: number) => void;
}

const Steps: React.FC<StepsProps> = ({ onVolumeChange }) => {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [rise, setRise] = useState(0);
  const [run, setRun] = useState(0);
  const [numSteps, setNumSteps] = useState(0);

  useEffect(() => {
    const platformVolume = (length * (rise * numSteps) * width) / 27;
    const stepVolume = (run * rise * (numSteps - 1) * width) / 27;
    const totalArea = platformVolume + stepVolume;
    onVolumeChange(totalArea);
  }, [length, width, rise, run, numSteps, onVolumeChange]);

  return (
    <>
      <TextField label="Length (ft)" type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} fullWidth margin="normal" />
      <TextField label="Width (ft)" type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} fullWidth margin="normal" />
      <TextField label="Rise (in)" type="number" value={rise} onChange={(e) => setRise(Number(e.target.value))} fullWidth margin="normal" />
      <TextField label="Run (ft)" type="number" value={run} onChange={(e) => setRun(Number(e.target.value))} fullWidth margin="normal" />
      <TextField label="Number of Steps" type="number" value={numSteps} onChange={(e) => setNumSteps(Number(e.target.value))} fullWidth margin="normal" />
    </>
  );
};

export default Steps;
