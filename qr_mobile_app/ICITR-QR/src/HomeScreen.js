import React, { useState } from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedClient, setSelectedClient] = useState("");

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the QR Scanner</Text>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title1}>Select a client</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedClient}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedClient(itemValue)}
        >
          <Picker.Item label="Client 1" value="5bf8fed6-8e92-4618-9bba-1603e5dc736e" />
          <Picker.Item label="Client 2" value="7ddf697b-732a-4a25-b74f-a4d5f482ef10" />
          <Picker.Item label="Client 3" value="66d71bd5-9adc-4c53-bc84-0527caf29dfb" />
        </Picker>
      </View>

      
      
      
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate('Camera',{ selectedClient})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  logo: {

    marginBottom: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  title1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
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
