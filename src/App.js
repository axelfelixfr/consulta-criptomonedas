import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cotizacion } from './components/Cotizacion';
import { Formulario } from './components/Formulario';
import imagen from './cryptomonedas.png';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const initialState = {
    moneda: '',
    criptomoneda: ''
  };

  const [cotizacion, setCotizacion] = useState(initialState);

  const [resultado, setResultado] = useState({});

  useEffect(() => {
    const { moneda, criptomoneda } = cotizacion;
    if (moneda === '' || criptomoneda === '') {
      return;
    }

    const cotizarCriptomoneda = async () => {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const { data } = await axios.get(url);

      setResultado(data.DISPLAY[criptomoneda][moneda]);
    };

    cotizarCriptomoneda();
  }, [cotizacion]);

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen crypto" />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>

        <Formulario enviarCotizacion={setCotizacion} />

        <Cotizacion resultado={resultado} />
      </div>
    </Contenedor>
  );
}

export default App;
