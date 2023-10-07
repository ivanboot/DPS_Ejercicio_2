import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { Text,Card } from 'react-native-paper';
import { Formulario } from './src/components/Formulario';
import { ListadoClientes } from './src/components/ListadoClientes';

export default function App() {
  const [automoviles, setAutomoviles] = useState([]);

  useEffect(() => {
    const getAutomovilStorage = async () => {
      try {

        const automovilesAlmacenados = await AsyncStorage.getItem('automovil');
        if (automovilesAlmacenados) {
          setAutomoviles(JSON.parse(automovilesAlmacenados))
        }
      } catch (error) {
        console.log(error);
      }
    }

    getAutomovilStorage();
  }, []);

  const setAutomovilStorage = async (automovilesJSON) => {
    try {
      await AsyncStorage.setItem("automoviles", automovilesJSON);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      
        <Card style={styles.cardContainer}>
          <Card.Content >
         
            <Text variant='headlineSmall'>Lista de servicios</Text>
            
          </Card.Content>
        </Card>

        <Text style={styles.titulo}> {automoviles.length > 0 ? ''
                : 'No hay registros aun...'} </Text>
              <FlatList
                style={styles.listado}
                data={automoviles}
                renderItem={({ item }) => <ListadoClientes item={item}/>}
                keyExtractor={automovil => automovil.id}
              />

        <Formulario
          automoviles={automoviles}
          setAutomoviles={setAutomoviles}
          setAutomovilStorage={setAutomovilStorage}
        />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#D4E2D4',
    height: "100%"
  },
  cardContainer:{
    marginVertical: 25,
    backgroundColor: '#FAF3F0',
  },
  listado:{
    width:'90%',
  }
});
