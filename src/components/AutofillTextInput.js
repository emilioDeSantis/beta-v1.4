//Copyright 2020, Provecho, All rights reserved.

import  React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import style from '../style';
import BackButton from './BackButton'
import { set } from 'react-native-reanimated';

function AutofillTextInput(props) {

    const [sugestions, set_sugestions] = useState(['test'])

    const autofill = async (sugestion) => {
        let new_value = props.value.substring(0, props.value.lastIndexOf(" "))
        const space = new_value == '' ? '' : ' ';
        const addon = props.is_hashtag ? '#' : '@';
        new_value += space + addon + sugestion + ' '
        await props.set_value(new_value)
        set_sugestions([])
    }

    const is_active = (text) => {
        if (props.is_hashtag) {
            return true
        } else{
            console.log('jhgfjhfg... ', text.lastIndexOf(" ") < text.lastIndexOf("@"))
            return text.lastIndexOf(" ") < text.lastIndexOf("@")
        }
    }
     
    const sugest = async (text) => {
        await props.set_value(text)
        if (is_active(text)) {
            let word = text.substring(text.lastIndexOf(" "))
            word = word.replace(/\s+/g, '')
            word = word.replace('@', '')
            word = word.replace('#', '')
            const new_sugestions = word == ' ' ? [] : await props.query(word)
            set_sugestions(new_sugestions)
        }
    }


    return (
        <View>
            <TextInput
                style={props.style}
                onChangeText={text => sugest(text)}
                onSubmitEditing={() => props.onSubmitEditing()}
                placeholder={props.placeholder}
                value={props.value}
            />
            <View style={style.autofill_container}>
                {sugestions.map((sugestion) => {
                    return(
                        <TouchableOpacity 
                            style={style.autofill_sugestion}
                            onPress={() => autofill(sugestion)}
                        >
                            <Text>{sugestion}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default AutofillTextInput
