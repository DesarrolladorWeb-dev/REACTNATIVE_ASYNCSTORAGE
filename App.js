import React , {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';
// import  useAsyncStorage  from '@react-native-community/async-storage';
import  AsyncStorage  from '@react-native-community/async-storage';

const App = () => {

  const [inputTexto , guardarInputTexto] = useState('')
  const [nombrestorage, guardarNombreStorage] = useState('')

  useEffect(() => {
    obtenerDatosStorage();
  }, []);


  const guardarDatos = async () => {
    try {
      const nombre = JSON.stringify(inputTexto);
      guardarNombreStorage(inputTexto)

      await AsyncStorage.setItem('nombre', nombre);
    } catch (error) {
      console.log(error);
    }
  }

  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre');
      guardarNombreStorage(nombre)
    } catch (error) {
      console.log(error)
    }
  }
  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre')
      guardarNombreStorage('')
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <>
    <View style={styles.contenedor}>
    {nombrestorage ? <Text>Hola: {nombrestorage}</Text> : null }
      

      <TextInput 
        placeholder='Escribe tu nombre'
        style={styles.input}
        onChangeText={texto => guardarInputTexto(texto)}
      />
      <Button 
        title="Guardar"
        color='#333'
        onPress={() => guardarDatos()}
      />
    {nombrestorage ? (  
    <TouchableHighlight 
      onPress={() => eliminarDatos()}
      style={styles.btnEliminar}>
        <Text style={styles.textoEliminar}>Eliminar Nombre  &times;</Text>
      </TouchableHighlight>
      
    ): null }

    
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor :{
    flex : 1 ,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input:{
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
    margin: 10
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,

  },
  textoEliminar:{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  }
});

export default App