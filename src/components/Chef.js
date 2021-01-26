//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation  } from '@react-navigation/native';
import * as global from '../functions/global'
import { useUser, useSetUser } from '../context'

import style from '../style';

import ChefThumbnail from './ChefThumbnail'
import FollowButton from './FollowButton';


class Chef extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return this.state != nextState;
    }


    render() {
        return (
            <View style={style.chef}>
                <ChefThumbnail chef={this.props.chef} user={this.props.user}/>
                <Text>{this.props.chef.username}</Text>
                <FollowButton chef={this.props.chef} user={this.props.user}/>
            </View>
        )
    }
}

export default Chef;