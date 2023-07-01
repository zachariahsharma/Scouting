import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput,
  Button,
  Provider as PaperProvider,
  Menu,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useContext} from 'react';
import {DataContext} from './DataContext';
const PreliminaryDataPage = ({navigation}) => {
  const [teamNumber, setTeamNumber] = useState('');
  const [matchNumber, setMatchNumber] = useState('');
  const [name, setName] = useState('');
  const [selectedOption, setSelectedOption] = useState('Auto Start Position');
  const {data, setData} = useContext(DataContext);
  const [menuVisible, setMenuVisible] = useState(false);
  options = ['Barrier', 'Mid', 'Wall'];
  const onPress = () => {
    setData(prevData => ({
      ...prevData,
      teamNumber,
      matchNumber,
      name,
      startposition: selectedOption,
    }));
    navigation.navigate('AutoPage');
  };

  return (
    <PaperProvider>
      <LinearGradient
        colors={['#40c9ff', '#3b5998', '#e81cff']}
        style={styles.container}>
        <View style={styles.card}>
          <TextInput
            label="Team Number"
            mode="outlined"
            keyboardType="numeric"
            onChangeText={setTeamNumber}
            value={teamNumber}
            style={styles.input}
            theme={{colors: {primary: '#40c9ff'}}}
          />
          <TextInput
            label="Match Number"
            mode="outlined"
            keyboardType="numeric"
            onChangeText={setMatchNumber}
            value={matchNumber}
            style={styles.input}
            theme={{colors: {primary: '#3b5998'}}}
          />
          <TextInput
            label="Your Name"
            mode="outlined"
            onChangeText={setName}
            value={name}
            style={styles.input}
            theme={{colors: {primary: '#e81cff'}}}
          />
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                style={styles.menuButton}
                onPress={() => setMenuVisible(true)}>
                {selectedOption}
              </Button>
            }>
            {options.map(option => (
              <Menu.Item
                key={option}
                title={option}
                onPress={() => {
                  setSelectedOption(option);
                  setMenuVisible(false);
                }}
              />
            ))}
          </Menu>
          <Button mode="contained" onPress={onPress} color="#40c9ff">
            Go to Next Page
          </Button>
        </View>
      </LinearGradient>
    </PaperProvider>
  );
};

export default PreliminaryDataPage;

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
  },
  input: {
    marginBottom: 10,
  },
});
