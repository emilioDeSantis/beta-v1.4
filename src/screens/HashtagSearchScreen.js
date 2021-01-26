//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

import ChefComp from '../components/Chef'

import { StackActions, useNavigationState } from '@react-navigation/native';

import * as storage from '../functions/storage'
import Stream from '../components/Stream'
import style from '../style';
import { v4 as uuidv4 } from 'uuid';

import HashtagStream from '../components/HashtagStream'

import * as global from '../functions/global'

const HashtagSearchScreen = (props) => {

    const fetchHashtagStreams = async ({page, limit}) => {
        const hashtags = await global.fetch_search_hashtags({page, limit, search: props.search[0]})
        return hashtags
    }

    return (
        <View style={style.feed_container}>
            <Stream fetchArticles={fetchHashtagStreams} search={props.search} user={props.user}>
                {item => (
                    <HashtagStream hashtag_stream={item} hashtag_filters={props.hashtag_filters} set_hashtag_filters={props.set_hashtag_filters} user={props.user}/>
                )}
            </Stream>
        </View>
    )
}

export default HashtagSearchScreen;