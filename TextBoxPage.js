import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Button, Provider as PaperProvider} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useContext} from 'react';
import {DataContext} from './DataContext';
const TextBoxPage = ({navigation}) => {
  const [text, setText] = useState('');
  const {data, setData} = useContext(DataContext);

  const handlePress = () => {
    setData(prevData => ({...prevData, extrathoughts: text}));
    navigation.navigate('ConfirmationPage');
  };

  return (
    <PaperProvider>
      <LinearGradient
        style={styles.container}
        colors={['#40c9ff', '#3b5998', '#e81cff']}>
        <View style={styles.box}>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            onChangeText={setText}
            value={text}
            placeholder="Extra Thoughts?"
          />
          <Button mode="contained" style={styles.button} onPress={handlePress}>
            Next
          </Button>
        </View>
      </LinearGradient>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  box: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    marginBottom: 16,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3b5998',
  },
});

export default TextBoxPage;
