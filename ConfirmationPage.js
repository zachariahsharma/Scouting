import React, {useContext, useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Alert, Animated} from 'react-native';
import {Button, Provider as PaperProvider} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import ProgressBar from 'react-native-progress/Bar';
import {DataContext} from './DataContext';
import {FileSystem} from 'react-native-fs';
const ConfirmationPage = ({navigation}) => {
  const {data, setData} = useContext(DataContext);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handlePress = () => {
    navigation.navigate('PreliminaryDataPage', {
      wipe: true,
    });
  };

  const sendData = async () => {
    setUploading(true);

    try {
      console.log(data);
      const response = await axios.post(
        'https://93cc-2605-ef80-2c-f4-00-6c-a0da.ngrok-free.app',
        data,
        {
          onUploadProgress: progressEvent => {
            setProgress(progressEvent.loaded / progressEvent.total);
          },
        },
      );
      setData(prevdata => ({}));
      Alert.alert('Success', 'Data uploaded successfully!');
    } catch (error) {}

    setUploading(false);
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    sendData();
  }, []);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <PaperProvider>
      <LinearGradient
        colors={['#40c9ff', '#3b5998', '#e81cff']}
        style={styles.container}>
        <View style={styles.card}>
          <Animated.Text
            style={[styles.congratulatoryText, {opacity: fadeAnim}]}>
            Congratulations! Your submission was successful.
          </Animated.Text>
          {uploading ? (
            <>
              <ProgressBar progress={progress} color="#40c9ff" />
              <Text style={styles.text}>Uploading data...</Text>
            </>
          ) : (
            <></>
          )}
          <Button
            mode="contained"
            onPress={handlePress}
            color="#40c9ff"
            style={styles.button}>
            Back to Preliminary Data Page
          </Button>
        </View>
      </LinearGradient>
    </PaperProvider>
  );
};

export default ConfirmationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratulatoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
});
