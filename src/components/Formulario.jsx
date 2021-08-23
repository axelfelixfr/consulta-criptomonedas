import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useMoneda } from '../hooks/useMoneda';
import { useCriptomoneda } from '../hooks/useCriptomoneda';
import axios from 'axios';
import { Error } from './Error';

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

export const Formulario = ({ enviarCotizacion }) => {
  const [error, setError] = useState(false);

  // State del listado de criptomonedas
  const [criptomOptions, setCriptomOptions] = useState([]);

  const monedasOptions = [
    { id: 1, codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
    { id: 2, codigo: 'MXN', nombre: 'Peso Mexicano' },
    { id: 3, codigo: 'EUR', nombre: 'Euro' },
    { id: 4, codigo: 'GBP', nombre: 'Libra Esterlina' }
  ];
  // Utilizar useMoneda
  const [moneda, ComponentSelectMoneda] = useMoneda(
    'Elige tu moneda',
    '',
    monedasOptions
  );

  // Utilizar useCriptomoneda
  const [criptomoneda, ComponentSelectCripto] = useCriptomoneda(
    'Elige tu criptomoneda',
    '',
    criptomOptions
  );

  // Ejecutar llamado a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const { data } = await axios.get(url);
      setCriptomOptions(data.Data);
    };

    consultarAPI();
  }, []);

  // Cuando se cotiza la moneda
  const handleSubmit = e => {
    e.preventDefault();
    // Validación
    if (moneda === '' || criptomoneda === '') {
      setError(true);
      return;
    }

    // Paso validacion
    setError(false);

    enviarCotizacion({
      moneda,
      criptomoneda
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Error mensaje="Debes llenar ambos campos" />}
      <ComponentSelectMoneda />

      <ComponentSelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};
