//Copyright 2020, Provecho, All rights reserved.

import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
import PostComp from './Post'

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute, } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as storage from '../functions/storage'
import * as global from '../functions/global'
import LikeModal from './LikeModal'
import ChefThumbnail from './ChefThumbnail'

import Header from './Header';

import Stream from './Stream'

import { useUser, useSetUser } from '../context'
import style from '../style';

const PostStreamComp = (props) => {

    return (
        <View style={style.post_stream}>
            <Stream fetchArticles={props.fetchPosts} user={props.user} n_columns={1}>
                {item => (
                    <PostComp post={item} user={props.user} n_columns={1} navigation={props.navigation}/>
                )}
            </Stream>
        </View>
    )
}

const Stack = createStackNavigator();

const PostStream = (props) => {
    const user = props.user
    const fetchPosts = props.fetchPosts
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
            }}
            mode="modal"
        >
            <Stack.Screen name="stream">
                {(props) => <PostStreamComp {...props} user={user} fetchPosts={fetchPosts}/>}
            </Stack.Screen>
            <Stack.Screen name="like modal">
                {(props) => <LikeModal {...props} user={user}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default PostStream;