  //Copyright 2020, Provecho, All rights reserved.

import * as React from 'react';
import { View, Text, Button , TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import style from '../style';

function BackButton(props) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={[style.back_button, props.is_right ? {right: 30} : {left: 30}]}
            onPress={() => navigation.goBack()}
            activeOpacity={1}
        >
            <Text>back</Text>
        </TouchableOpacity>
    )
}

export default BackButton;