import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './Header';
import PokemonArea from './PokemonArea';

export default function Home() {
 return (
    <View style={styles.container}>
        <Header/>
        <PokemonArea/>
    </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fafafa'
    }
  });