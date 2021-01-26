//Copyright 2020, Provecho, All rights reserved.

import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
import PostComp from '../components/Post'

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute, } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as storage from '../functions/storage'
import * as global from '../functions/global'
import LikeModal from '../components/LikeModal'
import ChefThumbnail from '../components//ChefThumbnail'

import Header from '../components/Header';



import Stream from '../components/Stream'

import { useUser, useSetUser } from '../context'
import style from '../style';

const RemakesScreen = (props) => {
    const route = useRoute()

    const fetchRemakes = async ({page, limit, user}) => {
        const posts = global.fetch_remakes({page, limit, user, post: route.params.post})
        return posts
    }

    return (
        <>
            <Header header={route.params.post.title} is_right={true}/>
            <View style={style.remakes_top}>
                <ChefThumbnail chef={route.params.post.chef} user={props.user} is_large={false}/>
                <Text>{route.params.post.chef.username}</Text>
                <Text>{route.params.post.n_tips} remakes</Text>
                <View style={style.feed_container2}>
                    <Stream fetchArticles={fetchRemakes} user={props.user} n_columns={2}>
                        {item => (
                            <PostComp post={item} user={props.user} n_columns={2} is_remake={true}/>
                        )}
                    </Stream>
                </View>
            </View>
        </>
    )
}

export default RemakesScreen;