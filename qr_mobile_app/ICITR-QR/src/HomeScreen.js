import React, { useState } from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = () => {
  const navigation = useNavigation();
  const clientID='client1';
  const [selectedClient, setSelectedClient] = useState('client1');

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the QR Scanner</Text>
      <Image source={require('../assets/logo.png')} />

   

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedClient}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedClient(itemValue)}
        >
          <Picker.Item label="Client 1" value="client1" />
          <Picker.Item label="Client 2" value="client2" />
          <Picker.Item label="Client 3" value="client3" />
        </Picker>
      </View>

      
      
      
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate('Camera',{ clientID})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  pickerContainer: {
    width: '80%',
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default HomeScreen;
