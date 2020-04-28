import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';

import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Animated } from 'react-native';

import Header from '../../components/Header';
import Tabs from '../../components/Tabs';
import Menu from '../../components/Menu';

import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  CardFooter,
  Anotation,
} from './styles';

export default function Main() {
  const translateY = new Animated.Value(0);
  let offset = 0;

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY } = event.nativeEvent;
      let opened = false;
      offset += translationY;

      translateY.setOffset(offset);
      translateY.setValue(0);

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Menu translateY={translateY} />

        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChanged}>
          <Card
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [-200, 0, 420],
                    outputRange: [-50, 0, 420],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}>
            <CardHeader>
              <Icon name='attach-money' size={28} color='#666' />
              <Icon name='visibility-off' size={28} color='#666' />
            </CardHeader>

            <CardContent>
              <Title>Saldo Disponível</Title>
              <Description>AKZ 300.990,90</Description>
            </CardContent>

            <CardFooter>
              <Anotation>
                Transferência de AKZ 500.990,90 recebida de Mateus
                Aalexandrehoje às 06:0min.
              </Anotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>
      <Tabs translateY={translateY} />
    </Container>
  );
}
