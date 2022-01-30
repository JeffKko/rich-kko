import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useStore } from '../stores/userInfo';
import { richkkoApi } from '../services/api';

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

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 3) / 4 / 2);
const imageWidth = dimensions.width / 2;

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const { jwt, ID: userID } = useStore();
  const [products, setProducts] = useState<Products[]>([]);
  const [watchList, setWatchList] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { data: products } = await richkkoApi.get<Products[]>(
        '/ecBox/pchomeTop',
      );
      setProducts(products.slice(0, 5));
    })();
  }, []);

  useEffect(() => {
    if (!userID) return;

    (async () => {
      const { data: watchList } = await richkkoApi.get<string[]>(
        `/ecBox/user/${userID}/watchList`,
      );

      setWatchList(watchList);
    })();
  }, [userID]);

  const handleClick = () => {
    alert(123);
  };

  const handleClickWatch = async (prodID: string) => {
    if (!userID) {
      navigation.navigate('LoginModal');
      return;
    }

    const index = watchList.findIndex(v => v === prodID);

    if (index > -1) {
      try {
        await richkkoApi.delete<string[]>(
          `/ecBox/user/${userID}/watchList/${prodID}`,
        );

        setWatchList(value => {
          value.splice(index, 1);
          return [...value];
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error?.response?.status === 401) {
            navigation.navigate('LoginModal');
          }
        }
        console.error(error);
      }
    } else {
      try {
        await richkkoApi.post<string[]>(
          `/ecBox/user/${userID}/watchList/${prodID}`,
        );
        setWatchList(value => [...value, prodID]);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error?.response?.status === 401) {
            navigation.navigate('LoginModal');
          }
        }
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Tab One</Text>
        <Text style={styles.title} onPress={handleClick}>
          click me
        </Text>
        <Text>{jwt}</Text>
        <Text>{JSON.stringify(watchList)}</Text>
        <View style={styles.productListContainer}>
          {products.map(v => (
            <Pressable
              key={v.ID}
              onPress={() => {}}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                  opacity: pressed ? 0.8 : 1,
                },
                // styles.wrapperCustom
              ]}
            >
              {({ pressed }) => (
                <View style={styles.product}>
                  <Image
                    style={styles.productImage}
                    source={{ uri: v.picS }}
                    // resizeMode={'cover'}
                  />
                  <View style={styles.productContent}>
                    <Text numberOfLines={2} style={{ width: imageWidth - 16 }}>
                      {v.name}
                    </Text>
                    <Text>{pressed ? 'Pressed!' : 'Press Me'}</Text>
                    <Text>${v.originPrice}</Text>
                    <Pressable
                      onPress={() => handleClickWatch(v.ID)}
                      style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                      })}
                    >
                      {watchList.includes(v.ID) ? (
                        <Ionicons
                          name="ios-heart-sharp"
                          size={24}
                          color="tomato"
                        />
                      ) : (
                        <Ionicons
                          name="ios-heart-outline"
                          size={24}
                          color="gray"
                        />
                      )}
                    </Pressable>
                  </View>
                  {/* <Button
                  title="save"
                  onPress={() => Alert.alert('Simple Button pressed')}
                /> */}
                </View>
              )}
            </Pressable>
          ))}
        </View>
        {/* <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="#80575719"
        /> */}
        {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
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
  productListContainer: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  product: {
    flex: 1,
    width: '50%',
    height: 250,
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
    // resizeMode: 'stretch',
    resizeMode: 'cover',
  },
  productContent: {
    padding: 8,
  },
});
