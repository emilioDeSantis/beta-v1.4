//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import HashtagPost from './HashtagPost'
import Amplify, { Storage } from 'aws-amplify';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Chef, FollowType, Follow, PostType, Post, RemarkType, Remark, NotificationType, Notification, Hashtag } from '../models'
import awsconfig from '../aws-exports';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});

import { StackActions, useNavigationState } from '@react-navigation/native';

import * as storage from '../functions/storage'
import Stream from '../components/Stream'
import style from '../style';
import { v4 as uuidv4 } from 'uuid';

import * as global from '../functions/global'


//enerv updated
const fetchHashtagPosts = async ({page, limit}) => {
    const db_data = await DataStore.query(Post)
    const posts = await storage.format_posts(db_data)
    return posts
}

const HashtagScreen = (props,) => {
    const add_filter = async () => {
        let new_array = [...props.hashtag_filters, props.hashtag_stream.name]
        await props.set_hashtag_filters(new_array)
    }
    const delete_filter = async () => {
        let new_array = [...props.hashtag_filters]
        var index = new_array.indexOf(props.hashtag_stream.name);
        if (index !== -1) {
            new_array.splice(index, 1);
        }
        await props.set_hashtag_filters(new_array)
    }
    return (
        <View style={style.hashtag_stream}>
            <View style={style.hashtag_stream_top}>
                <Text style={[style.medium_text_size, style.dark_text]}>#{props.name}</Text>
                {!props.hashtag_filters.includes(props.hashtag_stream.name) && <TouchableOpacity
                    key = 'hashtag filter'
                    accessibilityRole="button"
                    onPress={() => add_filter()}
                    style={style.wide_button_filled}
                >
                <Text style={[style.medium_text_size, style.dark_text]}>filter</Text>    
            </TouchableOpacity>}
            {props.hashtag_filters.includes(props.hashtag_stream.name) && <TouchableOpacity
                    key = 'hashtag filter'
                    accessibilityRole="button"
                    onPress={() => delete_filter()}
                    style={style.wide_button}
                >
                <Text style={[style.medium_text_size, style.dark_text]}>unfilter</Text>    
            </TouchableOpacity>}
            </View>
            {/* might have ro remake this */}
            {/* <Stream Article={HashtagPost} fetchArticles={fetchHashtagPosts} horizontal={true} user={props.user}/> */}
            <Stream fetchArticles={fetchHashtagPosts} horizontal={true} user={props.user}>
                {item => (
                    <HashtagPost hashtag_post={item.hashtag_post} user={props.user}/>
                )}
            </Stream>
        </View>
    );
}

export default HashtagScreen;