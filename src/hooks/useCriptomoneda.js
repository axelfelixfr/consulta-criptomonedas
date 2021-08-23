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

export const useCriptomoneda = (label, initialState, options) => {
  // State del hook
  const [optionSelected, setOptionSelected] = useState(initialState);

  const ComponentSelectCripto = () => (
    <>
      {/* Colocamos el label que se envíe al invocar el hook */}
      <Label htmlFor="moneda">{label}</Label>
      {/* Obtenemos la seleccion de la opción con setOptionSelected  */}
      <Select
        onChange={e => setOptionSelected(e.target.value)}
        value={optionSelected}
        name="moneda"
      >
        <option value="" disabled>
          Seleccione una opcion
        </option>
        {/* Recorremos cada opción que se mande al invocar el hook */}
        {options.map(option => (
          <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>
            {option.CoinInfo.FullName}
          </option>
        ))}
      </Select>
    </>
  );

  // Retornar state y componente
  return [optionSelected, ComponentSelectCripto];
};
