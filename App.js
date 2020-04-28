import React from 'react';
import { StatusBar, View } from 'react-native';

import Main from './src/pages/Main';

export default function App() {
  const hexaColor = '#8B10AE';

  return (
    <>
      <View style={{ flex: 1, backgroundColor: hexaColor }}>
        <StatusBar barStyle='light-content' backgroundColor={hexaColor} />
        <Main />
      </View>
    </>
  );
}
