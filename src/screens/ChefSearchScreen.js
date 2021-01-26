//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import ChefComp from '../components/Chef'

import { StackActions, useNavigationState } from '@react-navigation/native';

import * as storage from '../functions/storage'
import Stream from '../components/Stream'
import style from '../style';
import { v4 as uuidv4 } from 'uuid';

import * as global from '../functions/global'


const ChefSearchScreen = (props) => {

    const fetchChefs = async ({page, limit}) => {
        const chefs = await global.fetch_search_chefs({page, limit, search: props.search[0]})
        return chefs
    }

    return (
        <View style={style.feed_container}>
            <Stream fetchArticles={fetchChefs} search={props.search} user={props.user}>
                {item => (
                    <ChefComp chef={item} user={props.user} />
                )}
            </Stream>
        </View>
    )
}

export default ChefSearchScreen;