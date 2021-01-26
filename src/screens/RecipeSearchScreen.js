//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

import { StackActions, useNavigationState } from '@react-navigation/native';

import * as storage from '../functions/storage'
import Stream from '../components/Stream'
import style from '../style';
import { v4 as uuidv4 } from 'uuid';

import * as global from '../functions/global'


const RecipeSearchScreen = (props) => {

    //never got updated
    const fetchPosts = async ({page, limit}) => {
        // chekc if search is an array
        const posts = await global.fetch_search_posts({page, limit, search: props.search[0]})
        return posts
    }

    const index = useNavigationState(state => state.index)
    useEffect(() => {
        props.set_index(index)
    },[index])

    return (
        <View style={[style.feed_container,]}>
            {/* <Stream fetchArticles={fetchPosts} search={props.search} user={props.user}>
                {item => (
                    <TriPost tri_post={item.tri_post} user={props.user} is_rotated={false} is_tri={false}/>
                )}
            </Stream> */}
        </View>
    )
}

export default RecipeSearchScreen;