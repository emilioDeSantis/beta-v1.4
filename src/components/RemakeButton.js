//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute, useNavigationState, useNavigationBuilder } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import * as storage from '../functions/storage'
import * as global from '../functions/global'
import BackButton from '../components/BackButton'
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import style from '../style'
import LikeTabBar from '../components/LikeTabBar'
import Stream from '../components/Stream'
import ChefThumbnail from './ChefThumbnail'
import ChefComp from './Chef'

import { v4 as uuidv4 } from 'uuid';

function RemakeButton(props) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={style.remake_button}
            onPress={() => navigation.navigate('create',{
                recipe: props.recipe,
            })}
        >
            <Text>post remake</Text>
        </TouchableOpacity>
    )
}

export default RemakeButton;