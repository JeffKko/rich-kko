import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { richkkoApi, setAuthHeader } from '../services/api';

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<'TabTwo'>) {
  async function richkkoCall() {
    // setAuthHeader('kko');
    const { data } = await richkkoApi.get('/ecBox/product/12345678');
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Button
        onPress={() => navigation.navigate('LoginModal')}
        title="Sign In"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={richkkoCall}
        title="richkkoCall"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
