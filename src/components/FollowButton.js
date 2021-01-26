//Copyright 2020, Provecho, All rights reserved.

import React, {useEffect, useState} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as storage from '../functions/storage'
import * as global from '../functions/global'
import style from '../style'





const FollowButton = (props) => {

    const [is_following, set_is_following] = useState(props.chef.is_following)
    const [is_request, set_is_request] = useState(props.chef.is_request)

    return (
        <>
            {!is_following && <TouchableOpacity
                style={style.wide_button}
                onPress={async() => {
                    await global.request_follow(props.user.id, props.chef.id)
                    set_is_following(true)
                    set_is_request(true)
                }}
                activeOpacity={1}
            >
                <Text style={[style.medium_text_size, style.dark_text]}>follow</Text>
            </TouchableOpacity> }
            {is_following && <TouchableOpacity
                style={is_request? style.wide_button_filled : style.wide_button}
                onPress={async() => {
                    await global.unfollow(props.user.id, props.chef.id)
                    set_is_following(false)
                }}
                activeOpacity={1}
            >
                <Text style={[style.medium_text_size, style.dark_text] }>{is_request? 'requested' : 'following'}</Text>
            </TouchableOpacity> }
        </>
    )
}

export default FollowButton;