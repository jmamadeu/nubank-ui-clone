import React from 'react';

import Icon from '@expo/vector-icons/MaterialIcons';

import { Container, Top, Logo, Title } from './styles';

import logoImg from '../../assets/Nubank_Logo.png';

export default function Header() {
  return (
    <>
      <Container>
        <Top>
          <Logo source={logoImg} />
          <Title>Mateus Aalexandre</Title>
        </Top>
        <Icon name='keyboard-arrow-down' size={25} color='#fff' />
      </Container>
    </>
  );
}
