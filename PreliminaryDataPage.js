import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Appearance,
  Text,
} from 'react-native';
import {
  TextInput,
  Button,
  Provider as PaperProvider,
  Menu,
  Divider,
  Z,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useContext} from 'react';
import {DataContext} from './DataContext';
import DeviceInfo from 'react-native-device-info';

const PreliminaryDataPage = ({navigation, route}) => {
  // write a function if this react native parameters are passed from the parent has the value wipe is true then wipe;
  DeviceInfo.getDeviceName().then(deviceName => {
    console.log(deviceName);
  });
  const [teamNumber, setTeamNumber] = useState('');
  const [matchNumber, setMatchNumber] = useState('');
  const [boxCount, setBoxCount] = useState({high: 0, medium: 0, low: 0});
  const [coneCount, setConeCount] = useState({high: 0, medium: 0, low: 0});
  const [boxCountTele, setBoxCountTele] = useState({
    high: 0,
    medium: 0,
    low: 0,
  });
  const [coneCountTele, setConeCountTele] = useState({
    high: 0,
    medium: 0,
    low: 0,
  });

  let card_styles = {
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
  };
  let colorScheme;
  let bgcolor;
  colorScheme = Appearance.getColorScheme();
  if (colorScheme === 'dark') {
    bgcolor = '#000000';
  } else {
    bgcolor = '#ffffff';
  }
  if (colorScheme === 'dark') {
    card_styles.backgroundColor = '#000000';
  }
  const [robotCount, setRobotCount] = useState(0);
  const [name, setName] = useState('');
  const [selectedOption, setSelectedOption] = useState('Auto Start Position');
  const {data, setData} = useContext(DataContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOptionAuto, setSelectedOptionAuto] = useState(
    'General Auto Behavior',
  );
  const [selectedOptionEndgame, setSelectedOptionEndgame] = useState(
    'General Endgame Behavior',
  );
  const [menuVisibleEndgame, setMenuVisibleEndgame] = useState(false);
  const optionsEndgame = [
    'Did not move',
    'Parked in CZ',
    'Failed Attempt',
    'Docked (Fully on CZ, lights off)',
    'Engaged (lights on)',
  ];
  const incrementRobotCount = () => {
    setRobotCount(robotCount + 1);
  };

  const decrementRobotCount = () => {
    setRobotCount(Math.max(0, robotCount - 1));
  };
  const [menuVisibleAuto, setMenuVisibleAuto] = useState(false);
  const resetForm = () => {
    setTeamNumber('');
    setMatchNumber('');
    setName('');
  };
  const incrementCount = (type, level) => {
    if (type === 'box') {
      setBoxCount({...boxCount, [level]: boxCount[level] + 1});
    } else if (type === 'boxTele') {
      setBoxCountTele({...boxCountTele, [level]: boxCountTele[level] + 1});
    } else if (type === 'coneTele') {
      setConeCountTele({...coneCountTele, [level]: coneCountTele[level] + 1});
    } else {
      setConeCount({...coneCount, [level]: coneCount[level] + 1});
    }
  };

  const decrementCount = (type, level) => {
    if (type === 'box') {
      setBoxCount({...boxCount, [level]: Math.max(0, boxCount[level] - 1)});
    } else if (type === 'boxTele') {
      setBoxCountTele({
        ...boxCountTele,
        [level]: Math.max(0, boxCountTele[level] - 1),
      });
    } else if (type === 'coneTele') {
      setConeCountTele({
        ...coneCountTele,
        [level]: Math.max(0, coneCountTele[level] - 1),
      });
    } else {
      setConeCount({...coneCount, [level]: Math.max(0, coneCount[level] - 1)});
    }
  };

  const options = ['Barrier', 'Mid', 'Wall'];
  const optionsAuto = [
    'Did not move',
    'Moved out of CZ',
    'Docked',
    'Engaged',
    'Moving out of CZ + Docked',
    'Moving out of CZ + Engaged',
  ];

  useEffect(() => {
    if (route.params?.wipe) {
      setBoxCount({
        high: 0,
        medium: 0,
        low: 0,
      });
      setConeCount({
        high: 0,
        medium: 0,
        low: 0,
      });
      setConeCountTele({
        high: 0,
        medium: 0,
        low: 0,
      });
      setBoxCountTele({
        high: 0,
        medium: 0,
        low: 0,
      });
      setSelectedOption('Auto Start Position');
      setSelectedOptionAuto('General Auto Behavior');
      setSelectedOptionEndgame('General Endgame Behavior');
      setMenuVisible(false);
      setMenuVisibleAuto(false);
      setMenuVisibleEndgame(false);
      setTeamNumber('');
      setMatchNumber('');
      setName('');
    }
  }, [route.params?.wipe]);
  const onPress = () => {
    setData(prevData => ({
      ...prevData,
      teamNumber,
      matchNumber,
      name,
      startposition: selectedOption,
      GeneralAutoBehavior: selectedOption,
      boxCount,
      coneCount,
      GeneralEndgameBehavior: selectedOption,
      boxCountTele,
      coneCountTele,
      robotCount,
    }));

    navigation.navigate('TextBoxPage');
  };

  return (
    <PaperProvider>
      <LinearGradient
        colors={['#40c9ff', '#3b5998', '#e81cff']}
        style={styles.container}>
        <SafeAreaView>
          <ScrollView style={[styles.card, {backgroundColor: bgcolor}]}>
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
            <Divider style={styles.divider} />

            {['high', 'medium', 'low'].map(level => (
              <View key={level} style={styles.numberInput}>
                <Button onPress={() => decrementCount('box', level)}>-</Button>
                <TextInput
                  label={`Box Count (${level})`}
                  value={String(boxCount[level])}
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
                  mode="outlined"
                  style={styles.numberBox}
                />
                <Button onPress={() => incrementCount('cone', level)}>+</Button>
              </View>
            ))}
            <Menu
              visible={menuVisibleAuto}
              onDismiss={() => setMenuVisibleAuto(false)}
              anchor={
                <Button
                  style={styles.menuButton}
                  onPress={() => setMenuVisibleAuto(true)}>
                  {selectedOptionAuto}
                </Button>
              }>
              {optionsAuto.map(option => (
                <Menu.Item
                  key={option}
                  title={option}
                  onPress={() => {
                    setSelectedOptionAuto(option);
                    setMenuVisibleAuto(false);
                  }}
                />
              ))}
            </Menu>
            <Divider style={styles.divider} />
            {['high', 'medium', 'low'].map(level => (
              <View key={level} style={styles.numberInput}>
                <Button onPress={() => decrementCount('boxTele', level)}>
                  -
                </Button>
                <TextInput
                  label={`Box Count (${level})`}
                  value={String(boxCountTele[level])}
                  mode="outlined"
                  style={styles.numberBox}
                />
                <Button onPress={() => incrementCount('boxTele', level)}>
                  +
                </Button>
              </View>
            ))}

            {['high', 'medium', 'low'].map(level => (
              <View key={level} style={styles.numberInput}>
                <Button onPress={() => decrementCount('coneTele', level)}>
                  -
                </Button>
                <TextInput
                  label={`Cone Count (${level})`}
                  value={String(coneCountTele[level])}
                  mode="outlined"
                  style={styles.numberBox}
                />
                <Button onPress={() => incrementCount('coneTele', level)}>
                  +
                </Button>
              </View>
            ))}
            <Divider style={styles.divider} />
            <View style={styles.numberInput}>
              <Button onPress={decrementRobotCount}>-</Button>
              <TextInput
                label="Robots on CS"
                value={String(robotCount)}
                keyboardType="numeric"
                mode="outlined"
                style={styles.numberBox}
              />
              <Button onPress={incrementRobotCount}>+</Button>
            </View>
            <Menu
              visible={menuVisibleEndgame}
              onDismiss={() => setMenuVisibleEndgame(false)}
              anchor={
                <Button
                  style={styles.menuButton}
                  onPress={() => setMenuVisibleEndgame(true)}>
                  {selectedOptionEndgame}
                </Button>
              }>
              {optionsEndgame.map(option => (
                <Menu.Item
                  key={option}
                  title={option}
                  onPress={() => {
                    setSelectedOptionEndgame(option);
                    setMenuVisibleEndgame(false);
                  }}
                />
              ))}
            </Menu>
            <Button
              mode="contained"
              style={styles.nextButton}
              onPress={onPress}
              color="#40c9ff">
              Go to Next Page
            </Button>
            <Text style={styles.crapshoot}></Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </PaperProvider>
  );
};

export default PreliminaryDataPage;

const styles = StyleSheet.create({
  crapshoot: {
    padding: 16,
  },
  nextButton: {
    paddingBottom: 20,
  },
  card: {
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
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },

  input: {
    marginBottom: 10,
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
  divider: {
    marginBottom: 20,
  },
});
