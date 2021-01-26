//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useRef} from 'react';
import { View, Text, Button, Image, TouchableOpacity, Dimensions } from 'react-native';
import { StackActions, useNavigation, useNavigationBuilder, NavigationActions } from '@react-navigation/native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import { createStackNavigator } from '@react-navigation/stack';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import style from '../style';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as storage from '../functions/storage'
import * as global from '../functions/global'
import { useUser, useSetUser } from '../context'
import LikeIcon from '../assets/icons/like_icon.js'
import CommentIcon from '../assets/icons/comment_icon.js'

import Stream from './Stream'

import ChefThumbnail from './ChefThumbnail'
import { ScrollView } from 'react-native-gesture-handler';
var width = Dimensions.get('window').width;

function RecipeButton(props) {

    const navigation = useNavigation();

    const go_to_remake = () => {
        navigation.navigate('remake', {post: props.post})
    }

    return (
        <TouchableOpacity 
            style= {props.style}
            onPress={() => props.is_remake ? go_to_remake() : global.go_to_recipe(props,props.user.id,navigation)}
            activeOpacity={1}
        >
            <Image
                style = {{
                    height: '100%'
                }}
                source={{
                    uri: props.image,
                }}
            />
        </TouchableOpacity>
    );
}

const LikeButton = (props) => {
    const [is_liked, set_is_liked] = useState(props.is_liked)
    const navigation = useNavigation()
    // const user = useUser()

    const like = () => {
        global.like(props.user.id, props.id)
        set_is_liked(true)
    }

    const unlike = () => {
        global.unlike(props.user.id, props.id)
        set_is_liked(false)
    }

    return(
        <View style={style.like_button_container}>
            {is_liked && <TouchableOpacity 
                style= {style.liked_button}
                onPress={() => unlike()}
                activeOpacity={1}
            >
                <LikeIcon is_liked={true}/>
            </TouchableOpacity>}
            {!is_liked && <TouchableOpacity 
                style= {style.like_button}
                onPress={() => like()}
                activeOpacity={1}
            >
                <LikeIcon is_liked={false}/>
            </TouchableOpacity>}
            <TouchableOpacity 
                activeOpacity={1}
                style= {style.number}
                onPress={() => {
                    navigation.navigate('like modal', {
                        tab:'likes',
                        post: props,
                    })
                }}
                activeOpacity={1}
            >
                <Text style={style.number_text}>{props.n_likes}</Text>
            </TouchableOpacity> 
        </View>
    )
}

//should comment button be seprrat eform number buttton?
const CommentButton = (props) => {
    const navigation = useNavigation()
    return(
        <View style={style.comment_button_container}>
            <TouchableOpacity 
                style= {style.comment_button}
                onPress={() => {
                    navigation.navigate('like modal',{
                        tab:'comments',
                        post: props,
                    })
                }}
                activeOpacity={1}
            >
                <CommentIcon/>
            </TouchableOpacity> 
            <TouchableOpacity 
                activeOpacity={1}
                style= {style.number}
                onPress={() => {
                    navigation.navigate('like modal',{
                        tab:'comments',
                        post: props,
                    })
                }}
            >
                <Text style={style.number_text}>{props.n_comments}</Text>
            </TouchableOpacity> 
        </View>
    )
}

// class PostComp extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log('post cimop props ... ', this.props);
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         return this.state != nextState;
//     }

//     render() {
//         return (
//             //remkaes inside of post
//             // <View style={style.post}>
//             //     <Text style={{
//             //         position: 'absolute',
//             //         top: 50,
//             //         left: 140,
//             //     }}>
//             //         {props.chef.username}
//             //     </Text>
//             //     <InvertibleScrollView 
//             //         inverted 
//             //         style={style.post_scroll} 
//             //         decelerationRate={0} 
//             //         snapToInterval={width} 
//             //         snapToAlignment={'center'} 
//             //         horizontal={true}
//             //         showsHorizontalScrollIndicator={false}
//             //     >
//             //         <View style={{width, height: width*1.25, }}>
//             //             <RecipeButton {...props} image={props.image}/>
//             //         </View>
//             //         <View style={{width, height: width*1.25, backgroundColor: 'blue',}}>
//             //             <Remakes/>
//             //             {/* <View style={style.post_button_container}>
                            
//             //             </View> */}
//             //         </View>
//             //     </InvertibleScrollView>
//             //     <View style={style.post_button_container}>
//             //         <LikeButton {...props}/>
//             //         <CommentButton {...props}/>
//             //         {/* <TipButton {...props}/> */}
//             //     </View>
//             //     <ChefThumbnail chef={props.chef}/>
//             // </View>
//             <View style={style.post}>
//                 <Text style={{
//                     position: 'absolute',
//                     top: 50,
//                     left: 140,
//                 }}>
//                     {this.props.post.chef.username}
//                 </Text>
//                     <RecipeButton {...this.props.post} image={this.props.post.image} user={this.props.user}/>
//                 <View style={style.post_button_container}>
//                     <LikeButton {...this.props.post} user={this.props.user}/>
//                     <CommentButton {...this.props.post}/>
//                 </View>
//                 <ChefThumbnail chef={this.props.post.chef} user={this.props.user}/>
//             </View>
//         );
//     }
// }

//^^actual class comp

//vv trying to get it ti work wihout key error


class PostComp extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return this.state != nextState;
    }


    render() {
        console.log('post was rendered... ',this.props.post.title);
        if (this.props.n_columns == 1){
            return (
                <View style={style.post}>
                    <Text style={{
                        position: 'absolute',
                        top: 50,
                        left: 140,
                    }}>
                        {this.props.post.chef.username}
                    </Text>
                    <InvertibleScrollView 
                        ref={ref => this.listView = ref}
                        inverted 
                        style={style.post_scroll} 
                        decelerationRate={0} 
                        snapToInterval={width} 
                        snapToAlignment={'center'} 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollBegin={() => this.props.navigation.navigate('remakes', {post: this.props.post})}
                        onMomentumScrollEnd={() => this.listView.scrollTo({y: 0})}
                    >
                        <View style={{width, height: width*1.25, }}>
                            <RecipeButton {...this.props.post} image={this.props.post.image} user={this.props.user} style={style.recipe_button}/>
                        </View>
                        <View style={{width, height: width*1.25, backgroundColor: '#0000',}}>
                        </View>
                    </InvertibleScrollView>
                    <View style={style.post_button_container}>
                        <LikeButton {...this.props.post} user={this.props.user} key={'like button'}/>
                        <CommentButton {...this.props.post}/>
                    </View>
                    <ChefThumbnail chef={this.props.post.chef} user={this.props.user}/>
                </View>
            )
        } else if (this.props.n_columns == 2){
            return (
                <View style={style.di_post}>
                    <RecipeButton {...this.props.post} image={this.props.post.image} user={this.props.user} style={style.tri_recipe_button} post={this.props.post} is_remake={this.props.is_remake}/>
                    <Text style={{alignSelf:'center',}}>{this.props.post.chef.username}</Text>
                </View>
            )
        } else if (this.props.n_columns == 3){
            return (
                <View style={style.tri_post}>
                    <RecipeButton {...this.props.post} image={this.props.post.image} user={this.props.user} style={style.tri_recipe_button}/>
                </View>
            )
        }
    }
}

export default PostComp;