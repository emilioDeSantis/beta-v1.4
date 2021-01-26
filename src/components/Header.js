//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute, useNavigationState, useNavigationBuilder } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import * as storage from '../functions/storage'
import * as global from '../functions/global'
import BackButton from './BackButton'
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import style from '../style'
import LikeTabBar from './LikeTabBar'
import Stream from './Stream'
import ChefThumbnail from './ChefThumbnail'
import ChefComp from './Chef'

import { v4 as uuidv4 } from 'uuid';

function Header (props) {

    return (
        <View style={style.header}>
            <BackButton is_right={props.is_right}/>
            <Text style={[style.header_text,style.top_bar_text]}>{props.header}</Text>
        </View>
    )
}

export default Header;