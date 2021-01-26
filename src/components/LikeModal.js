//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute, useNavigationState, useNavigationBuilder } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as storage from '../functions/storage'
import * as global from '../functions/global'
import BackButton from '../components/BackButton'
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import style from '../style'
import LikeTabBar from '../components/LikeTabBar'
import Stream from '../components/Stream'
import ChefThumbnail from './ChefThumbnail'
import ChefComp from './Chef'

import { v4 as uuidv4 } from 'uuid';


const Tab = createBottomTabNavigator();

const LikeTab = (props) => {

    const fetchLikes = async ({page, limit}) => {
        const likes = await global.fetch_likes({page, limit, post: props.post})
        return likes
    }

    return (
        <View style={style.feed_container}>
            {/* <Stream Article={ChefComp} fetchArticles={fetchLikes} user={props.user}/> */}
            <Stream fetchArticles={fetchLikes} user={props.user}>
                {item => (
                    <ChefComp chef={item} user={props.user} />
                )}
            </Stream>
        </View>
    );
}


const CommentComp = (props) => {
    return (
        <View style={style.comment_container}>
            <ChefThumbnail chef={props.comment.chef}/>
            <Text>{props.comment.chef.username}</Text>
            <Text>{props.comment.text}</Text>
        </View>
    )
}


const CommentTab = (props) => {

    const [comment, set_comment] = useState('')
    // const user = useUser()
    const [search, set_search] = useState(false)

    const add_comment = async() => {
        await global.comment(props.user.id, props.post.id, comment)
        set_search(!search)
    }

    const fetchComments = async ({page, limit}) => {
        const comments = await global.fetch_comments({page, limit, post: props.post})
        return comments
    }

    return (
        <>
            <View style={{height: 500}}>
                <View style={style.feed_container}>
                    {/* <Stream Article={CommentComp} fetchArticles={fetchComments} search={search}  user={props.user}/> */}
                    <Stream fetchArticles={fetchComments} search={search}  user={props.user}>
                        {item => (
                            <CommentComp comment={item} user={props.user} />
                        )}
                    </Stream>
                </View>
            </View>
            <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => set_comment(text)}
                onSubmitEditing={() => add_comment()}
                placeholder={'search'}
                value={comment}
            />
        </>
    )
}

const LikeModal = (props) => {
    const user = props.user
    const navigation = useNavigation()

    const route = useRoute();

    const route_name = route.params.tab
    const post = route.params.post


    const [comment_post, set_comment_post] = useState(post)

    return (
        <View style={style.like_modal_container}>
            <TouchableOpacity
                key = 'back to post'
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                style={style.like_back_button}
            >
            </TouchableOpacity>
            <View style={style.like_modal}>
                <Tab.Navigator tabBar={props => <LikeTabBar {...props} />} initialRouteName={route_name}>
                    <Tab.Screen name="likes">
                        {(props) => <LikeTab {...props} post={post} user={user}/>}
                    </Tab.Screen>
                    <Tab.Screen name="comments">
                        {(props) => <CommentTab {...props} post={comment_post} rerender={set_comment_post} user={user}/>}
                    </Tab.Screen>
                </Tab.Navigator>
            </View>
        </View>
    )
}


export default LikeModal;

