//Copyright 2020, Provecho, All rights reserved.

import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation  } from '@react-navigation/native';
import style from '../style';
import * as global from '../functions/global'
import { useUser, useSetUser } from '../context'

function ChefThumbnail(props) {
    // console.log('chefthumbnial props... ', props);
    // const user = useUser()
    const navigation = useNavigation();
    // const chef = props.chef


    const go_to_chef = async () => {
        const chef = await global.format_chef(props.chef, props.user.id)
        navigation.navigate('chef',{
            chef,
        })
    }

    return (
        <View>
            <TouchableOpacity 
                style={props.is_large ? style.chef_thumbnail_large : style.chef_thumbnail}
                onPress={() => go_to_chef()}
                activeOpacity={1}
            >
                <Image
                    style = {{
                        height: '100%',
                        borderRadius: 1000,
                    }}
                    source={{
                        uri: props.chef.image,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}

export default ChefThumbnail