/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import {BLEPrinter} from 'react-native-thermal-receipt-printer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printers: [],
      currentPrinter: null,
      textScan: '',
    };
  }

  componentDidMount = () => {
    // try {
    //   BLEPrinter.init().then(() => {
    //     BLEPrinter.getDeviceList().then(data =>
    //       this.setState({printers: data}),
    //     );
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  _connectPrinter = printer => {
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      printer =>
        this.setState(Object.assign({}, this.state, {currentPrinter: printer})),
      error => console.warn(error),
    );
  };

  printBillTest = () => {
    const {currentPrinter, textScan} = this.state;
    currentPrinter && BLEPrinter.printBill(`<C>${textScan}</C>`);
  };

  render() {
    const {printers, textScan} = this.state;
    return (
      <View style={styles.body}>
        {printers.map(printer => (
          <TouchableOpacity
            key={printer.inner_mac_address}
            style={styles.bluetooth}
            onPress={() => this._connectPrinter(printer)}>
            <Text style={{fontWeight: 'bold'}}>
              {`device_name: ${printer.device_name}`}
            </Text>
          </TouchableOpacity>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Bạn muốn in gì,..."
          placeholderTextColor="gray"
          value={textScan}
          onChangeText={text => this.setState({textScan: text})}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.printBillTest()}>
          <Text> Print Bill Text </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bluetooth: {
    width: '90%',
    backgroundColor: 'gray',
    padding: 8,
    marginVertical: 8,
  },
  input: {
    color: 'black',
    width: '70%',
    borderWidth: 0.5,
    padding: 8,
  },
  button: {
    backgroundColor: 'green',
    marginTop: 8,
    padding: 4,
  },
});

export default App;
