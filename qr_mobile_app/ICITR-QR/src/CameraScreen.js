import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { useNavigation,useRoute,useFocusEffect } from '@react-navigation/native';
import { Button, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

export default function CameraScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const { clientID } = route.params;
  const BASE_URL = 'http://Localhost:3000/api/clients/';

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({ data }) => {
    console.log('Scanned Data:', data);
  
    // Regular expression to match ICTIR20141 followed by any three digits
    const regex = /^ICTIR2024\d{3}$/;
    
    if (regex.test(data) && data.length === 12) {
      console.log('Valid QR Code');
      ToastAndroid.show('Valid QR code', ToastAndroid.SHORT);
      try {
        axios.post(`${BASE_URL}/api/scan`, { 
          participantID: data,
          clientID: clientID
       })
        .then((response) => {
          console.log(response.data);
          navigation.navigate('Success', { data: response.data });
        }
        )
        .catch((error) => {
          console.log(error);
        }
        );
      }
      catch (error) {
        console.log(error);
      }
   
     
    } else {
        console.log('Invalid QR Code');
      ToastAndroid.show('Invalid QR code', ToastAndroid.SHORT);
    }
  };

return (
    <View style={styles.container}>
        <CameraView
            style={styles.camera}
            facing={facing}
            barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
            onBarcodeScanned={handleBarCodeScanned}
        />
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
