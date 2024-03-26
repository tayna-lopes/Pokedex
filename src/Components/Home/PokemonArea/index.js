import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../../Services/Api'

export default function PokemonArea() {
    const [text, setText] = useState('');
    const [infoPokemon, setInfoPokemon] = useState({});
    const [infoPokemonSpecies, setInfoPokemonSpecies] = useState({});
    const [infoPokemonLocation, setInfoPokemonLocation] = useState({});

    const [infoFilled, setInfoFilled] = useState(false);

    const getPokemonByName = async () => {
        const url = 'pokemon/'+text.toLowerCase();
        const { data } = await api.get(url);
        setInfoPokemon(data);
        setPokemonType();
    }
    const setPokemonType = () => {
        let stringTypes = '';
        for( let i=0; i < infoPokemon.types.length;i++){
            stringTypes += infoPokemon.types[i].type.name;

            if(i === infoPokemon.types.length - 2){
                stringTypes += ' and ';
            }
            else if(i !== infoPokemon.types.length - 1){
                stringTypes += ', ';
            }
        }
        return capitalizePhrase(stringTypes);
    }

    const getPokemonSpecies = async () => {
        const urlSpecies = 'pokemon-species/'+text.toLowerCase();
        const { data } = await api.get(urlSpecies);
        setInfoPokemonSpecies(data);
    }

    const getPokemonLocation = async () => {
        const url = 'pokemon/'+text.toLowerCase()+'/encounters';
        const { data } = await api.get(url);
        setInfoPokemonLocation(data);
    }

    const callFunctions = async () => {
        await getPokemonByName();
        await getPokemonSpecies();
        await getPokemonLocation();
        setInfoFilled(true);
    }

    const capitalizePhrase = (phrase) => {
        return phrase.length ? phrase.charAt(0).toUpperCase().replace(/-/g,' ') + phrase.slice(1).replace(/-/g,' ') : phrase
    }

    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>Search Pokémon Data</Text>
            </View>

            <View style={styles.search}>
                <TextInput style={styles.input}
                    placeholder='Search Pokémon by name or number'
                    onChangeText={newText => setText(newText)}
                    defaultValue={text} />
                <TouchableOpacity style={styles.actionButton}
                    onPress={callFunctions}
                    disabled={text == '' ? true : false}>
                    <View style={styles.areaButton}>
                        { text == '' ? (
                            <MaterialCommunityIcons name="magnify" size={30} color="#dadada" />
                        ) : (
                            <MaterialCommunityIcons name="magnify" size={30} color="black" />
                        )}
                    </View>
                </TouchableOpacity>
            </View>

            <View > 
                <View>
                    {infoFilled ? (
                        <>
                        <View style={styles.pokemonInfo}>
                            <View style={styles.infoArea1}>
                                <Image source={{ uri: infoPokemon.sprites.front_default }} style={styles.pokeImage} />
                                <Text style={styles.pokeName}>{infoPokemon.name}</Text>
                                <Text style={styles.pokeNumber}>Nº {infoPokemon.id}</Text>
                            </View>
                            <View style={styles.infoArea2}>
                                <View style={styles.type}>
                                    <Text style={styles.description}>Basic Info: </Text>
                                    <Text>Type: {setPokemonType()}</Text>
                                    <Text>Generation: {infoPokemonSpecies.generation.name.slice(11).toUpperCase()}</Text>
                                    {infoPokemonLocation.length > 0 ? (
                                        <Text>Location: Pokémon {capitalizePhrase(infoPokemonLocation[0].version_details[0].version.name)}, {capitalizePhrase(infoPokemonLocation[0].location_area.name)}.</Text>
                                    ) : (
                                        <Text>Location: Only obtained by evolution or trading. </Text>
                                    )}
                                </View>

                                <Text style={styles.description}>Description: </Text>
                                {infoPokemonSpecies.form_descriptions.length > 0 ?(
                                    <Text style={styles.pokeDesc}>{infoPokemonSpecies.form_descriptions[0].description.replace(/\n/g,' ')}</Text>

                                ) : (
                                    <Text style={styles.pokeDesc}>{infoPokemonSpecies.flavor_text_entries[0].flavor_text.replace(/\n/g,' ')}</Text>
                                    
                                )}
                                
                            </View>

                        </View>
                        
                        </>

                    ) : (
                        <View></View>
                    )}
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingStart: 18,
        paddingEnd: 18,
        marginTop: -24,
        marginStart: 14,
        marginEnd: 14,
        borderRadius: 4,
        paddingTop: 22,
        paddingBottom: 22,
        zIndex: 99
    },
    title: {
        marginStart: 14,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: '#fff'
    },
    search: {
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        height: 40,
        marginTop: 14
    },
    actionButton: {
        marginTop: 3,
        marginEnd: 10
    },
    pokemonInfo:{
        marginTop:14,
        zIndex: 1,
        borderColor: '#dadada',
        borderBlockColor: '#dadada',
        borderWidth: 1,
        borderRadius: 8,
        paddingTop: 14
    },
    buttonUser:{
        width:44,
        height:44,
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 44/2,
    },
    pokeImage:{
        height:70,
        width: 70,
        backgroundColor: '#dadada',
        alignItems:'center',
        borderRadius: 35,
    },
    infoArea1:{
        marginStart: 14,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    infoArea2:{
        margin: 14,
    },
    pokeDesc:{
        fontSize:16,
        flexWrap:'wrap',
        alignItems:'flex-start',
        width: '100%',
    },
    pokeName:{
        fontSize: 30,
        fontWeight:'bold',
        margin: 14,
        textTransform:'capitalize'
    },
    pokeNumber:{
        marginTop: 30
    },
    type: {
        marginBottom: 14
    },
    description:{
        color: '#dadada',
        fontWeight: 'bold'
    }
});