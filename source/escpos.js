/**
 * Created by januslo on 2018/12/26.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Image, Button, Dimensions} from 'react-native';
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';

const dateFormat = require('dateformat');
const {width} = Dimensions.get('window');
const base64JpgLogo =
  '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';

export default class EscPos extends Component {
  _listeners = [];

  constructor(props) {
    super(props);
    this.state = {
      boundAddress: props.route.params.boundAddress,
      boundName: props.route.params.name,
      loading: false,
    };
  }

  componentDidMount() {
    //alert(BluetoothManager)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.btn}>
          <Button
            onPress={() => {
              this.props.navigation.goBack();
            }}
            title="&lt;= Quay về"
          />
        </View>
        <View style={styles.btn}>
          <Button
            onPress={async () => {
              await BluetoothEscposPrinter.printText('Le Dinh Manh\r\n', {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 7,
              });
            }}
            title="Text type 0"
          />
        </View>
        <View style={styles.btn}>
          <Button
            onPress={async () => {
              await BluetoothEscposPrinter.printText('Le Dinh Manh\r\n', {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 1,
                fonttype: 0,
              });
            }}
            title="Text type 1"
          />
        </View>

        <View style={styles.btn}>
          <Button
            onPress={async () => {
              await BluetoothEscposPrinter.printText('Le Dinh Manh\r\n', {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 2,
              });
            }}
            title="Text type 2"
          />
        </View>

        <View style={styles.btn}>
          <Button
            onPress={async () => {
              await BluetoothEscposPrinter.printText('Le Dinh Manh\r\n', {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 3,
              });
            }}
            title="Text type 3"
          />
        </View>

        <View style={styles.btn}>
          <Button
            onPress={async () => {
              await BluetoothEscposPrinter.printText('Le Dinh Manh\r\n', {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 4,
              });
            }}
            title="Text type 4"
          />
        </View>
        <View style={styles.btn}>
          <Button
            onPress={async () => {
              await BluetoothEscposPrinter.printBarCode(
                '1230123456789',
                BluetoothEscposPrinter.BARCODETYPE.JAN13,
                3,
                120,
                0,
                2,
              );
              await BluetoothEscposPrinter.printText('\r\n', {});
            }}
            title="In Barcode"
          />
        </View>
        <View style={styles.btn}>
          <Button
            disabled={this.state.loading || this.state.boundAddress.length <= 0}
            title="In Hóa Đơn DEMO"
            onPress={async () => {
              try {
                await BluetoothEscposPrinter.printerInit();
                await BluetoothEscposPrinter.printerLeftSpace(0);

                await BluetoothEscposPrinter.printerAlign(
                  BluetoothEscposPrinter.ALIGN.CENTER,
                );
                await BluetoothEscposPrinter.setBlob(0);
                await BluetoothEscposPrinter.printText('UNI COFFEE\r\n', {
                  encoding: 'GBK',
                  codepage: 0,
                  widthtimes: 2,
                  heigthtimes: 2,
                  fonttype: 1,
                });
                await BluetoothEscposPrinter.setBlob(0);
                await BluetoothEscposPrinter.printText('HOA DON\r\n', {
                  encoding: 'GBK',
                  codepage: 0,
                  widthtimes: 1,
                  heigthtimes: 0,
                  fonttype: 1,
                });
                // await BluetoothEscposPrinter.printText('\r\n', {});
                await BluetoothEscposPrinter.printBarCode(
                  '1230123456789',
                  BluetoothEscposPrinter.BARCODETYPE.JAN13,
                  3,
                  120,
                  0,
                  2,
                );
                await BluetoothEscposPrinter.printText('\r\n', {});
                await BluetoothEscposPrinter.printerAlign(
                  BluetoothEscposPrinter.ALIGN.LEFT,
                );
                await BluetoothEscposPrinter.printText(
                  'Khach hang: LE DINH MANH\r\n',
                  {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 0,
                  },
                );
                await BluetoothEscposPrinter.printText(
                  'Ngay dat：' +
                    dateFormat(new Date(), 'dd-mm-yyyy h:MM:ss') +
                    '\r\n',
                  {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 0,
                  },
                );
                await BluetoothEscposPrinter.printText(
                  'Nguoi ban：UNI-01\r\n',
                  {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 0,
                  },
                );
                await BluetoothEscposPrinter.printText(
                  '--------------------------------\r\n',
                  {},
                );
                let columnWidths = [8, 8, 8, 8];
                await BluetoothEscposPrinter.printColumn(
                  columnWidths,
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                  ],
                  ['SL', 'Gia', 'CK', 'T.Tien'],
                  {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 0,
                  },
                );
                await BluetoothEscposPrinter.printText('\r\n', {});
                await BluetoothEscposPrinter.printText(
                  'RedBull Thai chinh hieu\r\n',
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  columnWidths,
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                  ],
                  ['2 Lon', '15.000', '', '30.000'],
                  {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 0,
                  },
                );
                await BluetoothEscposPrinter.printText('\r\n', {});
                await BluetoothEscposPrinter.printText(
                  'Bia Sai Gon Golden\r\n',
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  columnWidths,
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                  ],
                  ['2 Thung', '340.000', '20.000', '660.000'],
                  {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 0,
                  },
                );
                await BluetoothEscposPrinter.printText(
                  '--------------------------------\r\n',
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  [12, 20],
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                  ],
                  ['Tong tien', '690.000'],
                  {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 0,
                  },
                );
                await BluetoothEscposPrinter.printText(
                  'Thoi gian in: ' +
                    dateFormat(new Date(), 'dd-mm-yyyy h:MM:ss') +
                    '\r\n',
                  {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 0,
                  },
                );
                await BluetoothEscposPrinter.printText(
                  '--------------------------------\r\n',
                  {},
                );
                await BluetoothEscposPrinter.printText(
                  'Dien thoai：089991024\r\n',
                  {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 0,
                  },
                );
                // await BluetoothEscposPrinter.printText('\r\n', {});
                await BluetoothEscposPrinter.printerAlign(
                  BluetoothEscposPrinter.ALIGN.CENTER,
                );
                await BluetoothEscposPrinter.printQRCode(
                  'ManhSieuCapDepTrai',
                  140,
                  BluetoothEscposPrinter.ERROR_CORRECTION.L,
                );
                await BluetoothEscposPrinter.printText('\r\n', {});
                await BluetoothEscposPrinter.printText(
                  'Cam on va hen gap lai!\r\n',
                  {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 0,
                  },
                );
                await BluetoothEscposPrinter.printerAlign(
                  BluetoothEscposPrinter.ALIGN.LEFT,
                );
                await BluetoothEscposPrinter.printText('\r\n\r\n', {});
              } catch (e) {
                alert(e.message || 'ERROR');
              }
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            disabled={this.state.loading || this.state.boundAddress.length <= 0}
            title="In ảnh khỏa thân"
            onPress={async () => {
              try {
                await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
                await BluetoothEscposPrinter.printPic(base64JpgLogo, {
                  width: 220,
                  left: 40,
                });
                await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
              } catch (e) {
                alert(e.message || 'ERROR');
              }
            }}
          />
          <View style={{width: width, alignItems: 'center', marginTop: 16}}>
            <Image
              resizeMode="contain"
              style={{width: 200, height: 80}}
              source={{uri: 'data:image/jpeg;base64,' + base64JpgLogo}}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
    marginHorizontal: 8,
  },
});
