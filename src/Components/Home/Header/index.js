import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header() {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={{uri: 'https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png'}} style={{width: 300, height: 100, zIndex: 1}}/>
            </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
        container:{
            backgroundColor: '#F6CF57',
            paddingTop: statusBarHeight,
            flexDirection: 'row',
            paddingStart: 16,
            paddingEnd:16,
            paddingBottom:44
        },
        content:{
            flex:1,
            alignItems: 'center',
            flexDirection:'row',
            justifyContent:'center'
        },
        username:{
            fontSize:18,
            color:'#fff',
            fontWeight: 'bold'
        },
        buttonUser:{
            width:44,
            height:44,
            backgroundColor: 'rgba(255,255,255,0.5)',
            justifyContent:'center',
            alignItems:'center',
            borderRadius: 44/2,
        }
    });