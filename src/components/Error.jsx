import React from 'react';
import styled from '@emotion/styled';

const MensajeError = styled.p`
  background-color: #b7322c;
  padding: 0.8rem;
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Bebas Neue', cursive;
`;

export const Error = ({ mensaje }) => {
  return <MensajeError>{mensaje}</MensajeError>;
};
