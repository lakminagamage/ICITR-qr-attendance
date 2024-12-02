import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const CameraScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Camera Screen Mounted');
      setCameraReady(true);
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();

      return () => {
        console.log('Camera Screen Unmounted');
        setCameraReady(false);
      };
    }, [])
  );

  useEffect(() => {
    if (hasPermission === true) {
      console.log('Camera permission:', hasPermission);
    } else if (hasPermission === false) {
      ToastAndroid.show('Camera permission denied', ToastAndroid.LONG);
    }
  }, [hasPermission]);

  if (hasPermission === null) {
    return <View />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Scan the QR code on your student ID</Text>
        <View style={styles.cameraContainer}>
          {cameraReady && (
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.back}
              onBarCodeScanned={() => {}}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  text: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cameraContainer: {
    width: 256,
    height: 256,
    borderRadius: 16,
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});

export default CameraScreen;