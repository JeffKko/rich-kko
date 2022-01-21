import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Button } from 'react-native';
import { useEffect } from 'react';
import axios from 'axios';

import { Text, View } from '../components/Themed';

import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';

import { useStore } from '../stores/userInfo';
import { setAuthHeader } from '../services/api';

export default function ModalScreen() {
  const { jwt, setJwt } = useStore();

  const [request, response, promptAsync] = Google.useAuthRequest({
    // responseType: ResponseType.Token
    expoClientId:
      '885937038896-fgvohm4hdsv8sifaf5117tcmbbkrp4p4.apps.googleusercontent.com',
    // iosClientId: 'my-ios-id',
  });

  useEffect(() => {
    (async () => {
      console.log('request');
      console.log(request);

      console.log('response');
      console.log(response);

      if (response?.type === 'success' && response.authentication) {
        const { authentication } = response;
        const { accessToken, expiresIn, issuedAt } = authentication;

        const { data } = await axios.post<string>(
          'http://localhost:8080/api/v1/auth/google',
          {
            accessToken,
            expiresIn,
            issuedAt,
          },
        );

        console.log('get JWT');
        console.log(data);
        setAuthHeader(data);
        setJwt(data);
      }
    })();
  }, [response]);

  function onPressGoogleAuth() {
    promptAsync();
  }

  return (
    <View style={styles.container}>
      <Text>{jwt}</Text>
      <Text style={styles.title}>Login Modal</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        onPress={onPressGoogleAuth}
        title="Google"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
