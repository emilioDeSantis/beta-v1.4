import React, {useState} from 'react';
import { StyleSheet, Text, Button, View, TouchableOpacity, TextInput } from 'react-native';

import * as global from '../functions/global'

const SignOut = (props) => {

    const onSubmit = async () => {
        try {
            await global.sign_out()
            props.onStateChange('signIn')
            props.set_user({is_logged_in: false})
        } catch (error) {
            alert(error.message)
        }
    }
    if(props.authState === 'signedIn')
        return (
            <View>
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => onSubmit()}
                >
                    <Text>sign out</Text>
                </TouchableOpacity>
            </View>
        )
    else return <></>
}

export default SignOut