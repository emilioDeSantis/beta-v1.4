import React, {useState} from 'react';
import { StyleSheet, Text, Button, View, TouchableOpacity, TextInput } from 'react-native';
import { validateUsername, validatePassword} from '../functions/validation'

import * as storage from '../functions/storage'
import * as global from '../functions/global'


const SignIn = (props) => {
    const [error, setError] = useState({
        username: '',
        password: '',
    })
    const onSubmit = async () => {
        const usernameError = validateUsername(props.state.username)
        const passwordError = validatePassword(props.state.password)
        if(passwordError || usernameError)
            setError({username: usernameError, password: passwordError})
        else {
            try {
                const user = await global.sign_in(props.state.username, props.state.password)
                props.onStateChange('signedIn', user)
                const auth_user = await global.get_chef_by_username(user.username)
                auth_user.is_logged_in = true
                await props.set_user(auth_user)
            } catch (error) {
                alert(error.message)
            }
        }
    }
    if(props.authState === 'signIn')
        return (
            <View>
                <Text                    
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#2f6'
                    }}>sign in</Text>                
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => props.onStateChange('signUp', {})}
                >
                    <Text>sign up</Text>
                </TouchableOpacity>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => props.setState({...props.state, username: text})}
                    placeholder={'username'}
                    value={props.state.username}
                />
                <Text>{error.username}</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => props.setState({...props.state, password: text})}
                    placeholder={'password'}
                    secureTextEntry={true}
                    value={props.state.password}
                />
                <Text>{error.password}</Text>
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => onSubmit()}
                >
                    <Text>submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => props.onStateChange('confirmSignUp', {})}
                >
                    <Text>confirm</Text>
                </TouchableOpacity>
            </View>
        )
    else return <></>
}

export default SignIn