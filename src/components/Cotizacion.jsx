import React from 'react';
import styled from '@emotion/styled';

const CotizacionDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
  font-size: 18px;

  span {
    font-weight: bold;
  }
`;

const Precio = styled.p`
  font-size: 30px;

  span {
    font-weight: bold;
  }
`;

export const Cotizacion = ({ resultado }) => {
  // Si el objeto de resultado esta vacío que regrese nulo
  if (Object.keys(resultado).length === 0) return null;

  // A continuación se muestran todas las propiedades del objeto
  return (
    <CotizacionDiv>
      <Precio>
        El precio es: <span>{resultado.PRICE}</span>
      </Precio>
      <Info>
        El precio más alto del día es: <span>{resultado.HIGHDAY}</span>
      </Info>
      <Info>
        El precio más bajo del día es: <span>{resultado.LOWDAY}</span>
      </Info>
      <Info>
        Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span>
      </Info>
      <Info>
        Última actualización: <span>{resultado.LASTUPDATE}</span>
      </Info>
    </CotizacionDiv>
  );
};
