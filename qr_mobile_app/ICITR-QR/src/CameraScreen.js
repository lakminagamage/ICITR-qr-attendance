import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

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
