import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderSummary from '../components/OrderSummary';
import AppButton from '../components/AppButton';
import Spacer from '../components/Spacer';
import {useAppSelector} from '../redux/hooks';
import {MAIN_GREY_COLOR, mainServiceURL} from '../utils/constants';
import AddressForm from '../components/AddressForm';
import {IAddressRequest} from '../interfaces/address';
import axios from 'axios';
import AddressCard from '../components/AddressCard';
import {Button} from '@ant-design/react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
//@ts-ignore
import {TEST_PUBLISHABLE_STRIPE_KEY} from '@env';

export default function Checkout() {
  const userInfo = useAppSelector(state => state.userInfo);
  const [modalVisile, setModalVisible] = useState<boolean>(false);
  const [userAddresses, setUserAddresses] = useState<IAddressRequest[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddressRequest>({});
  const [addressesModal, setAddressesModal] = useState<boolean>(false);
  const fetchAddresses = (address?: IAddressRequest): void => {
    axios
      .get(mainServiceURL() + '/api/getUserAddresses/' + userInfo._id)
      .then(response => {
        setUserAddresses(response.data.addresses);
        if (response.data.addresses.length > 0 && !address) {
          setSelectedAddress(response.data.addresses[0]);
        }
      })
      .catch(error => {
        //@ts-ignore
        Alert.alert('Error!', {error});
      });
  };

  const createAddressClb = (address: IAddressRequest) => {
    fetchAddresses(address);
    setModalVisible(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const changeClbChange = () => {
    setAddressesModal(true);
  };

  const deleteClb = (address: IAddressRequest) => {
    deleteOneAddress(address);
  };
  const selectClb = (address: IAddressRequest) => {
    setSelectedAddress(address);
    setAddressesModal(false);
  };

  const deleteOneAddress = (address: IAddressRequest) => {
    axios
      .delete(mainServiceURL() + '/api/address/' + address._id)
      .then(res => {
        fetchAddresses();
      })
      .catch(err => {
        console.log({err});
        Alert.alert('Error!', {error});
      });
  };

  return (
    <StripeProvider  publishableKey={TEST_PUBLISHABLE_STRIPE_KEY}>
      <View style={styles.container}>
        <View style={styles.addressConatiner}>
          <Text style={styles.addressSectionTitle}>Shiping Address</Text>
          {userAddresses.length > 0 ? (
            <AddressCard
              changeClb={changeClbChange}
              list={false}
              address={selectedAddress}
            />
          ) : (
            <AppButton
              onPress={() => setModalVisible(true)}
              ViewStyle={styles.addAddressBtnView}
              PressableStyle={styles.addAddressBtnPressable}
              Content={
                <React.Fragment>
                  <Image
                    style={styles.addAddressBtnIcon}
                    source={require('../assets/images/Add_square_duotone.png')}
                  />
                  <Text style={styles.addAddressBtnText}>Add New Address</Text>
                </React.Fragment>
              }
            />
          )}
        </View>
        <OrderSummary />
        <AppButton
          ViewStyle={styles.btnView}
          PressableStyle={styles.btnPressable}
          onPress={() => {
            //   navigation.navigate('Checkout');
          }}
          Content={<Text style={styles.btnText}>Proceed to payment</Text>}
        />
        <Spacer />
        <Modal
          transparent={true}
          animationType="slide"
          visible={addressesModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>
                Your addresses
              </Text>
              <ScrollView style={styles.addressesModal}>
                {userAddresses.map((address, index) => {
                  return (
                    <AddressCard
                      deleteClb={deleteClb}
                      selectClb={selectClb}
                      list={true}
                      key={index}
                      address={address}
                    />
                  );
                })}
                <AppButton
                  onPress={() => {
                    setAddressesModal(false);
                    setModalVisible(true);
                  }}
                  key={0}
                  ViewStyle={styles.addAddressBtnView}
                  PressableStyle={styles.addAddressBtnPressable}
                  Content={
                    <React.Fragment>
                      <Image
                        style={styles.addAddressBtnIcon}
                        source={require('../assets/images/Add_square_duotone.png')}
                      />
                      <Text style={styles.addAddressBtnText}>
                        Add New Address
                      </Text>
                    </React.Fragment>
                  }
                />
              </ScrollView>
              <Button
                onPress={() => setAddressesModal(false)}
                style={{marginTop: 20}}
                type="warning">
                Cancel
              </Button>
            </View>
          </View>
        </Modal>

        <Modal
          key={1}
          transparent={true}
          animationType="slide"
          visible={modalVisile}
          onTouchCancel={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AddressForm
                TitleText="Create New Address"
                clb={createAddressClb}
              />
              <Button
                onPress={() => setModalVisible(false)}
                style={{marginTop: 20}}
                type="warning">
                Cancel
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnPressable: {
    backgroundColor: '#333333',
    height: 57,
    width: '100%',
  },
  btnText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  btnView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressConatiner: {
    padding: 12,
  },
  addAddressBtnPressable: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: MAIN_GREY_COLOR,
  },
  addAddressBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  addAddressBtnIcon: {
    transform: [{scale: 1.4}],
    marginBottom: 10,
  },
  addAddressBtnText: {
    color: MAIN_GREY_COLOR,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '90%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%',
  },
  addressesModal: {
    maxHeight: '80%',
  },
  addressSectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
