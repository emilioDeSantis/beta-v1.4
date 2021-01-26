//Copyright 2020, Provecho, All rights reserved.

import 'react-native-gesture-handler';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Amplify, { Auth } from 'aws-amplify';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore'
import { PostType, Chef, Recipe, Post, Tip, Comment, Like, Stash, Follow } from './models'

import * as storage from './functions/storage'

import * as global from './functions/global'

import awsconfig from './aws-exports';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});

import AuthenticationScreen from './screens/AuthenticationScreen'
import BottomBar from './navigation/BottomBar'
import ChefScreen from './screens/ChefScreen'
import RecipeScreen from './screens/RecipeScreen'
import RemakeScreen from './screens/RemakeScreen'
import RemakesScreen from './screens/RemakesScreen'
import LoadingScreen from './screens/LoadingScreen'

const Stack = createStackNavigator();

const App = () => {

    const [user, set_user] = useState('loading')

    const inititalize = async() => {
        const auth_user = await global.get_auth_user()
        await set_user(auth_user)
    }

    useEffect(() => {
        inititalize()
    },[])


    if (user == 'loading') {
        return (
            <LoadingScreen/>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode={'none'} initialRouteName={'bottom bar'}>
                    <Stack.Screen name="bottom bar">
                        {() => <BottomBar user={user} set_user={set_user}/>}
                    </Stack.Screen>
                    <Stack.Screen name="chef">
                        {() => <ChefScreen is_profile={false} user={user}/>}
                    </Stack.Screen>
                    <Stack.Screen name="recipe">
                        {() => <RecipeScreen user={user}/>}
                    </Stack.Screen>
                    <Stack.Screen name="remake">
                        {() => <RemakeScreen user={user}/>}
                    </Stack.Screen>
                    <Stack.Screen name="remakes" options={{gestureDirection: 'horizontal-inverted'}}>
                        {() => <RemakesScreen user={user}/>}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App

