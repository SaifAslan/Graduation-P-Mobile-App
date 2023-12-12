import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import AppButton from '../components/AppButton';
import {logout} from '../redux/feature/userinfoSlice';

type RootStackParamList = {
  Profile: undefined;
  Login: undefined;
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export default function Profile() {
  const navigation = useNavigation<ProfileProps>();
  const userInfo = useAppSelector(state => state.userInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    userInfo.accessToken == '' && navigation.navigate('Login');
  }, []);

  return (
    <View>
      <Text>Profile</Text>
      <AppButton
        PressableStyle={{}}
        ViewStyle={{}}
        onPress={() => {
          dispatch(logout());
        }}
        Content={<Text>Login</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
