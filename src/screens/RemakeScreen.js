//Copyright 2020, Provecho, All rights reserved.

import React, {useState} from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute, } from '@react-navigation/native';
import BackButton from '../components/BackButton'
import style from '../style';
import * as storage from '../functions/storage'
import * as global from '../functions/global'
import PostComp from '../components/Post'

import Stream from '../components/Stream'

import ChefThumbnail from '../components/ChefThumbnail';
import RemakeButton from '../components/RemakeButton'
import Header from '../components/Header';
import LikeModal from '../components/LikeModal'






const RemakeScreenComp = (props) => {

    return (
        <>
            <Header header={'remake'}/>
            <PostComp post={props.post} user={props.user} n_columns={1} navigation={props.navigation}/>
        </>
    );
}

const Stack = createStackNavigator();

const RemakeScreen = (props) => {

    const route = useRoute()

    const user = props.user
    return (
        <Stack.Navigator mode="modal" headerMode={'none'} transparentCard={true}>
            <Stack.Screen name="remake screen">
                {(props) => <RemakeScreenComp {...props} user={user} post={route.params.post}/>}
            </Stack.Screen>
            <Stack.Screen name="like modal">
                {(props) => <LikeModal {...props} user={user}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default RemakeScreen; 