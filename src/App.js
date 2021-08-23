import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cotizacion } from './components/Cotizacion';
import { Formulario } from './components/Formulario';
import { Spinner } from './components/Spinner';
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

  // State para guardar los datos (moneda, criptomoneda) que se envíen por el formulario
  const [cotizacion, setCotizacion] = useState(initialState);

  // State para obtener los resultados de una cotización
  const [resultado, setResultado] = useState({});

  // Loader mientras hace petición
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // Desestructuramos la cotizacion
    const { moneda, criptomoneda } = cotizacion;
    // Si moneda o criptomoneda estan vacios que no retorne nada
    if (moneda === '' || criptomoneda === '') {
      return;
    }

    const cotizarCriptomoneda = async () => {
      // Mandamos los datos de cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      // Usamos axios para obtener la data
      const { data } = await axios.get(url);

      // Mostrar spinner/loader
      setLoader(true);

      setTimeout(() => {
        setLoader(false);
        // Con "[]" sería de igual forma acceder a propiedades con "."
        // Por ejemplo data.DISPLAY.BITCOIN.MXN == data.DISPLAY[BITCOIN][MXN]
        setResultado(data.DISPLAY[criptomoneda][moneda]);
      }, 3000); // Después de 3 segundos que oculte el loader y muestre el resultado de la cotización
    };

    cotizarCriptomoneda();
  }, [cotizacion]);

  // Renderización condicional
  const componente = loader ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen crypto" />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>

        <Formulario enviarCotizacion={setCotizacion} />

        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
