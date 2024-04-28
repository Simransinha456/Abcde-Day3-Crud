/**
 *
 * ShoppingCart
 *
 */ import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar/navbar';
import Create from './create';

interface Props {}
export const ShoppingCart = memo((props: Props) => {
  const { t, i18n } = useTranslation();

  return (
    <Div>
      {t('')}
      <p>Hello this is my shopping page</p>
      <Navbar />
      <Create />
    </Div>
  );
});

const Div = styled.div``;
