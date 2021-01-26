//Copyright 2020, Provecho, All rights reserved.

import React, { useEffect, useState, Component } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

import Amplify from 'aws-amplify';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore'
import { Chef, FollowType, Follow, PostType, Post, RemarkType, Remark, NotificationType, Notification, Hashtag } from '../models'
import { Todo } from '../models'
import { v4 as uuidv4 } from 'uuid';

import awsconfig from '../aws-exports';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});

import * as storage from '../functions/storage'
import * as global from '../functions/global'
import AuthenticationScreen from './AuthenticationScreen'
import ImageButton from '../components/ImageButton'
import ImagePreview from '../components/ImagePreview'
import style from '../style'

import useDidMountEffect from '../useDidMountEffect';
import Header from '../components/Header'
import { go_to_recipe } from '../functions/global';
import AutofillTextInput from '../components/AutofillTextInput'






class IngredientInput extends Component {
    render() {
        return (
            <View style={{ height: 40, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, }}
                    onChangeText={text => {
                        let new_ingredients = [...this.props.ingredients]
                        new_ingredients[this.props.index].type = text
                        this.props.set_ingredients(new_ingredients)
                    }}
                    placeholder={'type'}
                    value={this.props.ingredients[this.props.index].type}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, }}
                    onChangeText={text => {
                        let new_ingredients = [...this.props.ingredients]
                        new_ingredients[this.props.index].quantity = text
                        this.props.set_ingredients(new_ingredients)
                    }}
                    placeholder={'quantity'}
                    value={this.props.ingredients[this.props.index].quantity}
                    onSubmitEditing={() => this.props.set_ingredients([...this.props.ingredients, ...[{type: '', quantity: ''}]])}
                />
            </View>
        )
    }
}






function CreateScreen(props) {

    const route = useRoute();
    const navigation = useNavigation()

    const [uri, setUri] = useState(null)
    const [isOriginal, setIsOriginal] = useState(true)
    // const user = useUser()
    // console.log(user);
    const [title, setTitle] = useState('')
    const [serves, setServes] = useState('')
    const [cook_time, setCook_time] = useState('')
    const [caption, setCaption] = useState('')
    const [tip, setTip] = useState('')
    const [hashtags, setHashtags] = useState([])
    const [procedure, set_procedure] = useState([])


    const onSubmit = async () => {

//still ussue with hashtags having an epmty elemt in array

        //backgroound uplaod
        try {

            if(isOriginal){

                let hashtags_input = hashtags.map(item => {
                    if (item != '') {
                        return item
                    }
                })

                const post = await global.create_original({user: props.user, uri, title, caption, serves, cook_time, procedure, hashtags: hashtags_input, })

                global.go_to_recipe(post, props.user.id, navigation)

            } else {

                const post = await global.create_remake({user: props.user, uri, post: route.params.original, caption, tip, })
                const unformatted_post = await storage.format_post(post)
                const formatted_post = await global.format_post(unformatted_post, props.user.id)
                navigation.navigate('remake', {post: formatted_post})

            }
        } catch (error) {
            // console.log('error!!!... ', error);
        }
    }

    if (props.user.is_logged_in) {

    const [ingredients, set_ingredients] = useState([{type: '', quantity: '',}])

        return (
            <>
                <Header header={'create'}/>
                {/* <ScrollView contentContainerStyle={{ top:0, alignItems: 'center', justifyContent: 'center' }}> */}
                {/* <View> */}
                    <ImageButton isCamera={true} setUri={setUri} is_profile_picture={false}></ImageButton>
                    <ImageButton isCamera={false} setUri={setUri} is_profile_picture={false}></ImageButton>
                    <ImagePreview uri={uri}></ImagePreview>
                    <CreateButton function={setIsOriginal} input={true} title={'original'}></CreateButton>
                    <CreateButton function={setIsOriginal} input={false} title={'remake'}></CreateButton>
                    {/* add search for recipes and add stash view */}
                    <TextInput
                        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setTitle(text)}
                        placeholder={'title'}
                        value={title}
                    />
                    {isOriginal && <TextInput
                        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setServes(text)}
                        placeholder={'serves'}
                        keyboardType={'numeric'}
                        value={serves}
                    />}
                    {isOriginal && <TextInput
                        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => set_procedure(text.split(/\r?\n/g))}
                        multiline={true}
                        placeholder={'procedure'}
                        value={multiline_to_string(procedure)}
                    />}
                    <View style={{ height: 150, borderColor: 'gray', borderWidth: 1, backgroundColor: '#f9a' }}>
                        <FlatList
                            data={ingredients}
                            renderItem={({item, index}) => (<IngredientInput {...item} index={index} set_ingredients={set_ingredients} ingredients={ingredients}/>)}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator ={false}
                        />
                    </View>
                    {isOriginal && <TextInput
                        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setCook_time(text)}
                        placeholder={'cook time'}
                        keyboardType={'numeric'}
                        value={cook_time}
                    />}
                    <AutofillTextInput
                        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
                        set_value={setCaption}
                        placeholder={'caption'}
                        value={caption}
                        onSubmitEditing={() => alert('sumitted')}
                        query={async (word) => { 
                            const sugestions = await global.sugest_usernames({word, user: props.user}) 
                            return sugestions
                        }}
                        is_hashtag={false}
                    />
                    {isOriginal && <TextInput
                        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setHashtags(toArray(text))}
                        placeholder={'hashtags'}
                        value={to_string(hashtags)}
                    />}
                    {!isOriginal && <TextInput
                        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setTip(text)}
                        placeholder={'tip'}
                        value={tip}
                    />}
                    <TouchableOpacity
                        style={{
                            height: 30,
                            width: 200,
                            borderRadius: 50,
                            backgroundColor: '#3b9'
                        }}
                        onPress={() => onSubmit()}
                        activeOpacity={1}
                        // onPress={() => DataStore.clear()}
                    >
                        <Text>upload</Text>
                    </TouchableOpacity>
                {/* </ScrollView> */}
                {/* </View> */}
            </>
        );
    } else {
        return (
            <AuthenticationScreen user={props.user} set_user={props.set_user}/>
        )
    }
}

function CreateButton(props) {
    return(
        <TouchableOpacity
            style={{
                height: 30,
                width: 200,
                borderRadius: 50,
                backgroundColor: '#ffe488'
            }}
            onPress={() => props.function(props.input)}
        >
            <Text>{props.title}</Text>
        </TouchableOpacity>
    )
}



const multiline_to_string = (array) => {
    if (array.length == 0) array = ['']
    let string = ''
    const last_item = array.pop()
    array.forEach(element => {
        string += element + '\r\n'
    })
    string += last_item
    return string
}

const toArray = (text) => {
    text = text.replace('  ', ' ')
    text = text.replace(/#/g, '')
    const array = text.split(' ')
    // console.log(array);
    return array
}

const to_string = (array) => {
    if (array.length == 0) array = ['']
    // console.log('huuustagfds... ',array);
    let add_space = false
    let string = ''
    const last_item = array.pop()
    array.forEach(element => {
        if (add_space) {
            string += ' '
        }
        string += '#' + element
        add_space = true
    })
    if (add_space) {
        string += ' '
    }
    string += last_item
    array.push(last_item)
    return string
}


export default CreateScreen;
