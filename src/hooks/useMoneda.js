import React, { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

export const useMoneda = (label, initialState, options) => {
  // State del hook
  const [optionSelected, setOptionSelected] = useState(initialState);

  const ComponentSelectMoneda = () => (
    <>
      <Label htmlFor="moneda">{label}</Label>
      <Select
        onChange={e => setOptionSelected(e.target.value)}
        value={optionSelected}
        name="moneda"
      >
        <option value="" disabled>
          Seleccione una opcion
        </option>
        {options.map(option => (
          <option key={option.id} value={option.codigo}>
            {option.nombre}
          </option>
        ))}
      </Select>
    </>
  );

  // Retornar state y componente
  return [optionSelected, ComponentSelectMoneda];
};
