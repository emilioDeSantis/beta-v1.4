import * as React from 'react';
import { View, Text, Button } from 'react-native';

import { useUser, useSetUser } from '../context'
import ChefScreen from './ChefScreen'

import AuthenticationScreen from './AuthenticationScreen'

function ProfileScreen(props) {
    // user = useUser()


    if (props.user.is_logged_in) {
        return (
            <ChefScreen is_profile={true} user={props.user} set_user={props.set_user}/>
        );
    } else {
        return (
            <AuthenticationScreen user={props.user} set_user={props.set_user}/>
        );
    }
}

export default ProfileScreen;