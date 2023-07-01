import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  TextInput,
  Button,
  Provider as PaperProvider,
  Menu,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useContext} from 'react';
import {DataContext} from './DataContext';

const TeleopEndgamePage = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(
    'General Endgame Behavior',
  );
  const [boxCount, setBoxCount] = useState({high: 0, medium: 0, low: 0});
  const [coneCount, setConeCount] = useState({high: 0, medium: 0, low: 0});
  const [robotCount, setRobotCount] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const {data, setData} = useContext(DataContext);

  const options = [
    'Did not move',
    'Parked in CZ',
    'Failed Attempt',
    'Docked (Fully on CZ, lights off)',
    'Engaged (lights on)',
  ];

  const incrementCount = (type, level) => {
    if (type === 'box') {
      setBoxCount({...boxCount, [level]: boxCount[level] + 1});
    } else {
      setConeCount({...coneCount, [level]: coneCount[level] + 1});
    }
  };

  const decrementCount = (type, level) => {
    if (type === 'box') {
      setBoxCount({...boxCount, [level]: Math.max(0, boxCount[level] - 1)});
    } else {
      setConeCount({...coneCount, [level]: Math.max(0, coneCount[level] - 1)});
    }
  };

  const incrementRobotCount = () => {
    setRobotCount(robotCount + 1);
  };

  const decrementRobotCount = () => {
    setRobotCount(Math.max(0, robotCount - 1));
  };

  const onPress = () => {
    setData(prevData => ({
      ...prevData,
      GeneralEndgameBehavior: selectedOption,
      boxCount,
      coneCount,
      robotCount,
    }));
    navigation.navigate('TextBoxPage');
  };

  return (
    <PaperProvider>
      <LinearGradient
        colors={['#40c9ff', '#3b5998', '#e81cff']}
        style={styles.container}>
        <View style={styles.card}>
          {['high', 'medium', 'low'].map(level => (
            <View key={level} style={styles.numberInput}>
              <Button onPress={() => decrementCount('box', level)}>-</Button>
              <TextInput
                label={`Box Count (${level})`}
                value={String(boxCount[level])}
                keyboardType="numeric"
                mode="outlined"
                style={styles.numberBox}
              />
              <Button onPress={() => incrementCount('box', level)}>+</Button>
            </View>
          ))}

          {['high', 'medium', 'low'].map(level => (
            <View key={level} style={styles.numberInput}>
              <Button onPress={() => decrementCount('cone', level)}>-</Button>
              <TextInput
                label={`Cone Count (${level})`}
                value={String(coneCount[level])}
                keyboardType="numeric"
                mode="outlined"
                style={styles.numberBox}
              />
              <Button onPress={() => incrementCount('cone', level)}>+</Button>
            </View>
          ))}

          <View style={styles.numberInput}>
            <Button onPress={decrementRobotCount}>-</Button>
            <TextInput
              label="Total Robots on CS"
              value={String(robotCount)}
              keyboardType="numeric"
              mode="outlined"
              style={styles.numberBox}
            />
            <Button onPress={incrementRobotCount}>+</Button>
          </View>

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

          <Button
            mode="contained"
            onPress={onPress}
            color="#40c9ff"
            style={styles.nextButton}>
            Next
          </Button>
        </View>
      </LinearGradient>
    </PaperProvider>
  );
};

export default TeleopEndgamePage;

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
  },
  menuButton: {
    marginBottom: 20,
  },
  numberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  numberBox: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  nextButton: {
    marginTop: 20,
  },
});
