import React, {useEffect} from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Search from '../navigation/Search'
import * as global from '../functions/global'

import NotificationsScreen from './NotificationsScreen'
import style from '../style';
import TopTabBar from '../components/TopTabBar';
import PostStream from '../components/PostStream'

const Tab = createBottomTabNavigator();

function TopBar(props) {

    const fetch_top = async ({page, limit}) => {
        const posts = await global.fetch_top_posts({page, limit, user: props.user})
        return posts
    }

    const fetch_feed = async ({page, limit}) => {
        const posts = await global.fetch_feed_posts({page, limit, user: props.user})
        return posts
    }

    const user = props.user
    return (
        <Tab.Navigator initialRouteName={'top'} tabBar={props => <TopTabBar {...props} />}>
            <Tab.Screen name="top">
                {(props) => <PostStream {...props} user={user} fetchPosts={fetch_top}/>}
            </Tab.Screen>
            <Tab.Screen name="feed">
                {(props) => <PostStream {...props} user={user} fetchPosts={fetch_feed}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

function HomeScreen(props) {

    const user = props.user
    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'top bar'}>
            <Stack.Screen name="search" options={{gestureDirection: 'horizontal-inverted'}}>
                {(props) => <Search {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="top bar">
                {(props) => <TopBar {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="notifications">
                {(props) => <NotificationsScreen {...props} user={user} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default HomeScreen;