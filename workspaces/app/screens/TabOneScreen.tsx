import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import axios from 'axios';
import { useEffect, useState } from 'react';

interface Products {
  ID: string;
  cateID?: string;
  describe?: string;
  name: string;
  originPrice: number;
  picB?: string;
  picS: string;
  price?: number;
}

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<Products[]>(
        'http://localhost:8080/api/v1/ecBox/pchomeTop',
      );

      setProducts(data.slice(0, 3));
    })();
  }, []);

  const handleClick = () => {
    alert(123);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Tab One</Text>
        <Text style={styles.title} onPress={handleClick}>
          click me
        </Text>
        {products.map(v => (
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
              },
              // styles.wrapperCustom
            ]}
          >
            {({ pressed }) => (
              <>
                <Image
                  style={styles.stretch}
                  source={{ uri: v.picS, width: 200, height: 200 }}
                />
                <Text>{v.name}</Text>
                <Text>{pressed ? 'Pressed!' : 'Press Me'}</Text>
                <Pressable
                  onPress={() => navigation.navigate('LoginModal')}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={'tomato'}
                    style={{ marginRight: 15 }}
                  />
                </Pressable>
                {/* <Button
                  title="save"
                  onPress={() => Alert.alert('Simple Button pressed')}
                /> */}
              </>
            )}
          </Pressable>
        ))}
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="#80575719"
        />
        <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
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
  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
});
