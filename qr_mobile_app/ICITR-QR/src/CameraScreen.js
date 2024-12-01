import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanned, setIsScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setIsScanned(true);
    console.log('Scanned Data:', data);

    // Generate a string based on the scanned data
    const generatedString = `Generated: ${data}`;
    console.log('Generated String:', generatedString);

    // Show a toast message
    ToastAndroid.show(`Scanned: ${data}`, ToastAndroid.SHORT);

    // Reset scanning after a short delay
    setTimeout(() => setIsScanned(false), 2000);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permissions...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera. Please enable camera permissions in settings.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scan the QR Code</Text>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={isScanned ? undefined : handleBarCodeScanned}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cameraContainer: {
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
});

export default CameraScreen;
