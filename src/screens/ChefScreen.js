//Copyright 2020, Provecho, All rights reserved.

import React, {useEffect, useState} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Amplify from 'aws-amplify';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore'
import { Chef, FollowType, Follow, PostType, Post, RemarkType, Remark, NotificationType, Notification, Hashtag } from '../models'
import ChefComp from '../components/Chef'

import PostComp from '../components/Post'

import awsconfig from '../aws-exports';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});

import { useUser, useSetUser } from '../context'

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

const Settings = (props) => {

    const test = async () => {
        // const data = await DataStore.query(Post)
        // console.log('datastore posts... ',data);
        await DataStore.clear()
    }

    return (
        <View style={{ top: 100, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>settings</Text> 
            <BackButton/>
            <TouchableOpacity
                style={{
                    height: 30,
                    width: 200,
                    borderRadius: 50,
                    backgroundColor: '#3b9'
                }}
                onPress={() => test()}
                activeOpacity={1}
            >
                <Text>test</Text>
            </TouchableOpacity>
            <AuthenticationScreen user={props.user} set_user={props.set_user}/>
        </View>
    )
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const All = ({user, chef_id}) => {

    const fetchPosts = async ({page, limit}) => {
        const posts = await global.fetch_all_chef_posts({page, limit, chef_id})
        return posts
    }

    return (
        <View style={style.feed_container}>
            <Stream fetchArticles={fetchPosts} user={user} n_columns={3}>
                {item => (
                    <PostComp post={item} user={user} n_columns={3}/>
                )}
            </Stream>
        </View>
    );
}


const Originals = ({user, chef_id}) => {

    const fetchPosts = async ({page, limit}) => {
        const posts = await global.fetch_original_chef_posts({page, limit, chef_id})
        return posts
    }

    return (
        <View style={style.feed_container}>
            <Stream fetchArticles={fetchPosts} user={user} n_columns={3}>
                {item => (
                    <PostComp post={item} user={user} n_columns={3}/>
                )}
            </Stream>
        </View>
    );
}



const SaveComp = (props) => {

    const fetchPosts = async ({page, limit}) => {
        const posts = await global.fetch_saved_chef_posts({page, limit, user: props.user, chef_id})
        return posts
    }


    return (
        <View style={style.feed_container}>
            <Stream fetchArticles={fetchPosts} user={props.user} n_columns={3}>
                {item => (
                    <PostComp post={item} user={props.user} n_columns={3}/>
                )}
            </Stream>
        </View>
    );
}

const ChefTabs = (props) => {
    chef_id = props.chef_id
    const user = props.user
    return(
        <Tab.Navigator tabBar={props => <ChefTabBar {...props} />} initialRouteName={'all'}>
            <Tab.Screen name="all">
                {(props) => <All {...props} chef_id={chef_id} user={user}/>}
            </Tab.Screen>
            <Tab.Screen name="originals">
                {(props) => <Originals {...props} chef_id={chef_id} user={user}/>}
            </Tab.Screen>
            <Tab.Screen name="save" options={{title:'saved'}}>
                {(props) => <SaveComp {...props} chef_id={chef_id} user={user}/>}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

const ChefPannel = (props) => {

    const navigation = useNavigation()

    // const user = useUser()

    return (
        <>
            {!props.is_profile && <Header header={props.chef.username}/>}
            {props.is_profile && <Header header={'profile'}/>}
            {/* {props.is_profile && <TouchableOpacity
                    style={style.notifications_button}
                    onPress={() => navigation.navigate('notifications')}
                    activeOpacity={1}
                >
                    <Text style={[style.medium_text_size, style.dark_text]}>notifications</Text>
                </TouchableOpacity> } */}
                <View style={{ alignItems: 'center', }}>
                    <ChefThumbnail chef={props.chef} is_large={true} user={props.user}/>
                    {props.is_profile && <TouchableOpacity
                        style={style.wide_button_filled}
                        onPress={() => navigation.navigate('settings')}
                        activeOpacity={1}
                    >
                        <Text style={[style.medium_text_size, style.dark_text]}>edit profile</Text>
                    </TouchableOpacity> }
                    {!props.is_profile && <FollowButton chef={props.chef} user={props.user} />}
                    <View style={style.chef_stats}>
                        <TouchableOpacity
                            style={style.chef_stats_button}
                            onPress={async() => {
                                navigation.navigate('follow modal', 'followers')
                            }}
                            activeOpacity={1}
                        >
                            <Text style={[style.medium_text_size, style.dark_text]}>{props.chef.n_followers} followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.chef_stats_button}
                            onPress={async() => {
                                navigation.navigate('follow modal', 'following')
                            }}
                            activeOpacity={1}
                        >
                            <Text style={[style.medium_text_size, style.dark_text]}>{props.chef.n_following} following</Text>
                        </TouchableOpacity>
                        <View style={style.chef_stats_button}>
                            <Text style={[style.medium_text_size, style.dark_text]}>{props.chef.n_remakes} remakes</Text>
                        </View>
                    </View>
                    <Text style={[style.medium_text_size, style.dark_text]}>{props.chef.biography}</Text>
                </View>
            <ChefTabs chef_id={props.chef.id} user={props.user}/>
        </>
    );
}

function ChefScreenComp(props) {
    const is_profile = props.is_profile
    const chef = props.chef
    const user = props.user
    const set_user = props.set_user

    // console.log('chefscreencomp user... ', user);
    const navigation = useNavigation();

    if (is_profile) {
        return (
            <Stack.Navigator headerMode ={'none'}>
                <Stack.Screen name="chef pannel">
                    {(props) => <ChefPannel {...props} is_profile={is_profile} chef={chef} user={user}/>}
                </Stack.Screen>
                <Stack.Screen name="settings">
                    {(props) => <Settings {...props} user={user} set_user={set_user}/>}
                </Stack.Screen>
            </Stack.Navigator>
        );
    } else {
        return (
            <ChefPannel chef={chef} is_profile={is_profile} user={user}/>
        )
    }
}







const FollowTab = createBottomTabNavigator();

const FollowersTab = (props) => {

    const fetchChefs = async ({page, limit}) => {
        const chefs = await global.fetch_followers({page, limit, user: props.user, chef: props.chef})
        return chefs
    }

    return (
        <View style={style.feed_container}>
            <Stream fetchArticles={fetchChefs} user={props.user} n_columns={1}>
                {item => (
                    <ChefComp chef={item} user={props.user} n_columns={1}/>
                )}
            </Stream>
        </View>
    );
}

const FollowingTab = (props) => {

    // const user = useUser()

    const fetchChefs = async ({page, limit}) => {
        const chefs = await global.fetch_following({page, limit, user: props.user, chef: props.chef})
        return chefs
    }

    return (
        <View style={style.feed_container}>
            <Stream fetchArticles={fetchChefs} user={props.user} n_columns={1}>
                {item => (
                    <ChefComp chef={item} user={props.user} n_columns={1}/>
                )}
            </Stream>
        </View>
    );
}




const FollowTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={style.follow_modal_tab_bar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key = {label}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={style.follow_modal_tab_bar_button}
                        activeOpacity={1}
                    >
                        <Text style={{ color: isFocused ? '#f98' : '#333536' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


const FollowModal = (props) => {
    const user = props.user

    const chef = props.chef

    const navigation = useNavigation()

    const route = useRoute();

    const route_name = route.params
    return (
        <View style={style.like_modal_container}>
            <TouchableOpacity
                key = 'back to post'
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                style={style.like_back_button}
                activeOpacity={1}
            >
            </TouchableOpacity>
            <View style={style.like_modal}>
                <FollowTab.Navigator tabBar={props => <FollowTabBar {...props} />} initialRouteName={route_name}>
                    <FollowTab.Screen name="followers">
                        {(props) => <FollowersTab {...props} chef={chef} user={user}/>}
                    </FollowTab.Screen>
                    <FollowTab.Screen name="following">
                        {(props) => <FollowingTab {...props} chef={chef} user={user}/>}
                    </FollowTab.Screen>
                </FollowTab.Navigator>
            </View>
        </View>
    )
}





const ModalStack = createStackNavigator();

const ChefScreen = (props) => {
    
    const is_profile = props.is_profile
    // const user = useUser()
    const user = props.user
    const set_user = props.set_user

    const route = useRoute();

    const chef = is_profile ? props.user : route.params.chef;
    // console.log('chefscreen user2... ', user);

    return (
        <ModalStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
            }}
            mode="modal"
        >
            <ModalStack.Screen name="chef screen">
                {(props) => <ChefScreenComp {...props} chef={chef} is_profile={is_profile} user={user} set_user={set_user}/>}
            </ModalStack.Screen>
            <ModalStack.Screen name="follow modal">
                {(props) => <FollowModal {...props} chef={chef} is_profile={is_profile} user={user}/>}
            </ModalStack.Screen>
        </ModalStack.Navigator>
    )
}

export default ChefScreen;

