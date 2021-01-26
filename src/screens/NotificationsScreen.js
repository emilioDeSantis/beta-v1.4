//Copyright 2020, Provecho, All rights reserved.

import React, {useEffect, useState} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChefComp from '../components/Chef'

import PostComp from '../components/Post'


import AuthenticationScreen from './AuthenticationScreen'

import * as storage from '../functions/storage'
import * as global from '../functions/global'
import BackButton from '../components/BackButton'
import NotificationsScreen from './NotificationsScreen'
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import style from '../style'
import ChefTabBar from '../components/ChefTabBar'
import Stream from '../components/Stream'
import ChefThumbnail from '../components/ChefThumbnail';
import FollowButton from '../components/FollowButton';


import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';



const MentionsScreen = (props) => {

    return (
        <>
            <Header header={'notifications'}/>
        </>
    );
}

export default MentionsScreen;