import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
} from '@mui/material';
import squareSlabImg from '../media/square_slab.png';
import roundSlabImg from '../media/round_slab.png';
import wallImg from '../media/wall.png';
import footerImg from '../media/footer.png';
import squareColumnImg from '../media/square_column.png';
import roundColumnImg from '../media/round_column.png';
import stepsImg from '../media/steps.png';
import curbAndGutterImg from '../media/curb_and_gutter.png';
import Cylinder from './input_fields/Cylinder';
import Block from './input_fields/Block';
import CurbAndGutter from './input_fields/CurbAndGutter';
import Steps from './input_fields/Steps';


const ConcreteCalculator = () => {
  const [calculatorFor, setCalculatorFor] = useState('Square Slab');
  const [quantity, setQuantity] = useState(1);
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [result, setResult] = useState(0);
  const [cost, setCost] = useState(0);

  const handleVolumeChange = (newVolume: number) => {
    const totalResult = newVolume * quantity;
    setResult(totalResult);
    setCost(totalResult * costPerUnit);
  };

  const getInputComponent = () => {
    switch (calculatorFor) {
      case 'Square Slab':
      case 'Square Column':
      case 'Wall':
      case 'Footer':
        return <Block onVolumeChange={handleVolumeChange} />;
      case 'Round Slab':
      case 'Round Column':
        return <Cylinder onVolumeChange={handleVolumeChange} />;
      case 'Steps':
        return <Steps onVolumeChange={handleVolumeChange} />;
      case 'Curb & Gutter':
        return <CurbAndGutter onVolumeChange={handleVolumeChange} />;
      default:
        return null;
    }
  };

  const getImageSrc = () => {
    switch (calculatorFor) {
      case 'Square Slab': return squareSlabImg;
      case 'Round Slab': return roundSlabImg;
      case 'Wall': return wallImg;
      case 'Footer': return footerImg;
      case 'Square Column': return squareColumnImg;
      case 'Round Column': return roundColumnImg;
      case 'Steps': return stepsImg;
      case 'Curb & Gutter': return curbAndGutterImg;
      default: return '';
    }
  };

  return (
    <Container maxWidth="xs">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Concrete Calculator</Typography>
          <FormControl fullWidth margin="normal">
            <Select
              id="calculate-for"
              value={calculatorFor}
              onChange={(e) => setCalculatorFor(e.target.value)}
            >
              <MenuItem value="Square Slab">Square Slab</MenuItem>
              <MenuItem value="Round Slab">Round Slab</MenuItem>
              <MenuItem value="Wall">Wall</MenuItem>
              <MenuItem value="Footer">Footer</MenuItem>
              <MenuItem value="Square Column">Square Column</MenuItem>
              <MenuItem value="Round Column">Round Column</MenuItem>
              <MenuItem value="Steps">Steps</MenuItem>
              <MenuItem value="Curb & Gutter">Curb & Gutter</MenuItem>
            </Select>
          </FormControl>

          {getImageSrc() && (
            <img
              src={getImageSrc()}
              alt={calculatorFor}
              style={{ width: '70%', margin: '20px auto', display: 'block' }}
            />
          )}

          {getInputComponent()}

          <TextField label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} fullWidth margin="normal" />
          <TextField label="Optional Cost (per cubic yard)" type="number" value={costPerUnit} onChange={(e) => setCostPerUnit(Number(e.target.value))} fullWidth margin="normal" />

          {result > 0 && <Typography variant="h6" marginTop={2}><strong>Concrete needed:</strong> {result.toFixed(2)} cubic yards</Typography>}
          {cost > 0 && <Typography variant="h6"><strong>Total Cost:</strong> ${cost.toFixed(2)}</Typography>}
        </CardContent>
      {/* Small "Made by tviles.com" footer */}
      <Typography variant="body2" align="right" sx={{ marginTop: 2, marginRight: 2, fontSize: '10px', color: 'gray' }}>
        Made by <a href="https://tviles.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'gray' }}>Tviles.com</a>
      </Typography>
      </Card>
    </Container>
  );
};

export default ConcreteCalculator;
