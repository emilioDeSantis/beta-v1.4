//Copyright 2020, Provecho, All rights reserved.

import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation, useNavigationBuilder, NavigationActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import style from '../style';
import Amplify, { Storage, Auth } from 'aws-amplify'
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore'
import { Chef, FollowType, Follow, PostType, Post, RemarkType, Remark, NotificationType, Notification, Hashtag } from '../models'
import 'react-native-get-random-values';
import { useUser, useSetUser } from '../context'
import { v4 as uuidv4 } from 'uuid';
import * as storage from './storage'


import awsconfig from '../aws-exports';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});

export const toArray = (text) => {
    text = text.replace('  ', ' ')
    const array = text.split(' ')
    let new_array = [] 
    array.map(item => {
        if (item != '') {
            new_array.push(item)
        }
    })
    return new_array
}

export const go_to_recipe = async(post,user_id,navigation) => {
    const db_data = await DataStore.query(Chef, post.recipe.chefID);
    const chef = await storage.format_chef(db_data)
    const unformatted_recipe = await storage.format_chef(post.recipe)
    const recipe = await format_recipe(unformatted_recipe,user_id)
    navigation.navigate('recipe',{recipe, chef})
}

////////////////////////////////////////////////

//update with new db strcutre
export const format_chef = async (item, user_id) => {
    const predicate = c => c.followerID("eq", user_id).followingID("eq", item.id)
    const follow = await DataStore.query(Follow, predicate);
    let is_following;
    let is_request;
    if (follow.length > 0){
        is_request = follow[0].isRequest == true ? true : false;
        is_following = true
    } else {
        is_following = false
        is_request = false
    }
    const chef = {
        ...item,
        is_following,
        is_request,
    }
    return chef
}
const getChefs = async (list, user_id) => {
    return Promise.all(list.map(chef => format_chef(chef, user_id)))
}
export const format_chefs = async (list, user_id) => {
    const chefs = await getChefs(list, user_id).then((data) => {
        return data
    })
    return chefs
}

export const unfollow = async (followerID, followingID) => {
    const follower = await DataStore.query(Chef, followerID)
    const following = await DataStore.query(Chef, followingID)
    await DataStore.save(
        Chef.copyOf(follower, updated => {
            updated.n_following = follower.n_following - 1
        })
    )
    await DataStore.save(
        Chef.copyOf(following, updated => {
            updated.n_followers = following.n_followers - 1
        })
    )
    const predicate = c => c.followerID("eq", followerID).followingID("eq", followingID)
    const db_data = await DataStore.query(Follow, predicate);
    const follow = db_data[0]
    DataStore.delete(follow)
}

export const request_follow = async (followerID, followingID) => {
    const follower = await DataStore.query(Chef, followerID)
    const following = await DataStore.query(Chef, followingID)
    await DataStore.save(
        new Follow({
            followingID,
            followerID,
            followingUsername: following.username,
            followerUsername: follower.username,
            isRequest: true,
        })
    )
    await DataStore.save(
        new Mention({
            recieverID: followingID,
            senderID: followerID,
            sender: follower,
            type: MentionType.REQUEST,
        })
    )
}

// export const accept_follow = async (followerID, followingID) => {
//     const follower = await DataStore.query(Chef, followerID)
//     const following = await DataStore.query(Chef, followingID)
//     await DataStore.save(
//         Chef.copyOf(follower, updated => {
//             updated.n_following = follower.n_following + 1
//         })
//     )
//     await DataStore.save(
//         Chef.copyOf(following, updated => {
//             updated.n_followers = following.n_followers + 1
//         })
//     )
//     await DataStore.save(
//         new Follow({
//             followingID,
//             followerID,
//             followingUsername: following.username,
//             followerUsername: follower.username,
//         })
//     )
// }

export const like = async (chefID, postID) => {
    const chef = await DataStore.query(Chef, chefID)
    const post = await DataStore.query(Post, postID)
    await DataStore.save(
        Post.copyOf(post, updated => {
            updated.n_likes = post.n_likes + 1
            updated.rating = post.rating + 1
        })
    )
    await DataStore.save(
        new Remark({
            type: RemarkType.LIKE,
            chef,
            post,
        })
    )
}

export const unlike = async (chefID, postID) => {
    const post = await DataStore.query(Post, postID)
    await DataStore.save(
        Post.copyOf(post, updated => {
            updated.n_likes = post.n_likes - 1
            updated.rating = post.rating - 1
        })
    )
    const predicate = c => c.and(
        c => c.chefID("eq", chefID).postID("eq", postID).type("eq", RemarkType.LIKE)
    )
    const db_data = await DataStore.query(Remark, predicate)
    const like = db_data[0]
    DataStore.delete(like)
}

export const comment = async (chefID, postID, text) => {
    const chef = await DataStore.query(Chef, chefID)
    const post = await DataStore.query(Post, postID)
    await DataStore.save(
        Post.copyOf(post, updated => {
            updated.n_comments = post.n_comments + 1
            updated.rating = post.rating + 5
        })
    )
    await DataStore.save(
        new Comment({
            chefID,
            postID,
            text,
            chef,
            post,
        })
    )
}

export const save = async (chefID, postID) => {
    const chef = await DataStore.query(Chef, chefID)
    const post = await DataStore.query(Post, postID)
    await DataStore.save(
        Post.copyOf(post, updated => {
            updated.rating = post.rating + 20
        })
    )
    await DataStore.save(
        new Stash({
            chefID,
            postID,
            chef,
            post,
        })
    )
}

export const unsave = async (chefID, postID) => {
    const predicate = c => c.chefID("eq", chefID).postID("eq", postID)
    const db_data = await DataStore.query(Stash, predicate);
    const stash = db_data[0]
    DataStore.delete(stash)
}

//do these more efficiently?
// make sure a fail doesnt send all the remakra
export const format_post = async (item, user_id) => {
    // const predicate = c => c.and(
    //     c => c.chefID("eq", user_id).postID("eq", item.id).type("eq", RemarkType.LIKE)
    // )
    const predicate = c => c.and(
        c => c.chefID("eq", user_id)
    )
    const like = await DataStore.query(Remark, predicate);
    const is_liked = like.length > 0 ? true : false;
    const post = {
        ...item,
        is_liked,
    }
    return post
}
const getPosts = async (list, user_id) => {
    return Promise.all(list.map(post => format_post(post, user_id)))
}
export const format_posts = async (list, user_id) => {
    const posts = await getPosts(list, user_id).then((data) => {
        return data
    })
    return posts
}

export const format_recipe = async (item, user_id) => {
    const predicate = c => c.chefID("eq", user_id).postID("eq", item.postID)
    const stash = await DataStore.query(Stash, predicate);
    const is_stashed = stash.length > 0 ? true : false;
    const recipe = {
        ...item,
        is_stashed,
    }
    return recipe
}

export const get_auth_user = async () => {
    try {
        const auth_user = await Auth.currentAuthenticatedUser()
        const chef = await DataStore.query(Chef, c => c.username("eq", auth_user.username))
        const user = await storage.format_chef(chef[0])
        user.is_logged_in = true
        return user
    } catch {
        return {is_logged_in: false}
    }
}

export const comfirm_signup = async ({username, password, code, biography, uri}) =>{
    const chef_input = {
        username,
        biography,
        n_followers: 0,
        n_following: 0,
        n_remakes: 0,
    }
    await Auth.confirmSignUp( username, code )
    const user = await Auth.signIn(username, password)
    const key = await storage.upload(uri)
    chef_input.image = key
    console.log('chef input... ', chef_input);
    const chef = await DataStore.save(
        new Chef(chef_input)
    );
    console.log('chef... ', chef);
    const formatted_chef = await storage.format_chef(chef)
    formatted_chef.is_logged_in = true
    return [user, formatted_chef]
}

export const sign_in = async (username, password) =>{
    const user = await Auth.signIn(username, password)
    return user
}

export const get_chef_by_username = async (username) =>{
    const db_data = await DataStore.query(Chef, c => c.username("eq", username))
    chef = await storage.format_chef(db_data[0])
    return chef
}

export const sign_out = async (username) =>{
    await Auth.signOut()
}


//when there are no resualst is retrne every follow fix this
export const sugest_usernames = async ({word, user}) =>{
    const predicate = c => c.and(
        c => c.followerID("eq", user.id).followingUsername("contains", word)
    )
    const options = {
        limit: 10,
    }
    const db_data = await DataStore.query(Follow, predicate, options )
    const following = db_data.map((follow) => follow.followingUsername)
    return following
    // return ['gjkjhg','ryuyyy']
}

////////////////////////////////////////////////

export const fetch_top_posts = async ({page, limit, user}) => {
    const predicate = Predicates.ALL
    const options = {
        sort: s => s.rating(SortDirection.DESCENDING),
        page,
        limit,
    }
    const data = await DataStore.query(Post, predicate, options)
    const unformatted_posts = await storage.format_posts(data)
    await format_posts(unformatted_posts, user.id)
    const posts = await storage.format_posts(data)
    return posts
}

export const fetch_feed_posts = async ({page, limit, user}) => {
    //update for new db struct
    const follows = (await DataStore.query(Follow)).filter(c => c.followerID === user.id)
    const following_ids = follows.map(follow => follow.followingID)
    const predicate = c => c.or(
        c => {
            following_ids.forEach(id => {
                c = c.chefID("eq", id)
            })
        }
    )
    const options = {
        sort: s => s.createdAt(SortDirection.DESCENDING),
        page,
        limit,
    }
    const db_data = await DataStore.query(Post, predicate, options)
    const unformatted_posts = await storage.format_posts(db_data)
    const posts = await global.format_posts(unformatted_posts, user.id)
    return posts
}

export const fetch_search_posts = async ({page, limit, search}) => {
    //update for new db 
    const predicate = c => c.and(
        c => {
            c = c.title("contains", search)
            props.hashtag_filters.forEach(name => {
                c = c.hashtags("contains", name)
            })
        }
    )
    const options = {
        sort: s => s.createdAt(SortDirection.DESCENDING),
        page,
        limit,
    }
    const data = await DataStore.query(Post, predicate, options)
    const posts = await storage.format_posts(data)
    return posts
}

export const fetch_search_hashtags = async ({page, limit, search}) => {
    const predicate = c => c.name("contains", search)
    const options = {
        page,
        limit,
    }
    const db_data = await DataStore.query(Hashtag, predicate, options)
    const hashtags = await global.format_hashtags(db_data)
    return hashtags
}

export const fetch_search_chefs = async ({page, limit, search}) => {
    const predicate = c => c.username("contains", search)
    const options = {
        page,
        limit,
    }
    const db_data = await DataStore.query(Chef, predicate, options)
    const unformatted_chefs = await storage.format_chefs(db_data)
    const chefs = await global.format_chefs(unformatted_chefs, props.user.id)
    return chefs
}

export const fetch_all_chef_posts = async ({page, limit, chef_id}) => {
    const predicate = c => c.chefID('eq', chef_id)
    const options = {
        sort: s => s.createdAt(SortDirection.DESCENDING),
        page,
        limit,
    }
    const db_data = await DataStore.query(Post, predicate, options)
    const posts = await storage.format_posts(db_data)
    return posts
}

export const fetch_original_chef_posts = async ({page, limit, chef_id}) => {
    const predicate = c => c.chefID('eq',chef_id).type('eq', PostType.ORIGINAL)
    const options = {
        sort: s => s.createdAt(SortDirection.DESCENDING),
        page,
        limit,
    }
    const db_data = await DataStore.query(Post, predicate, options)
    const posts = await storage.format_posts(db_data)
    return posts
}

export const fetch_saved_chef_posts = async ({page, limit, user, chef_id}) => {
    const saves = (await DataStore.query(Stash)).filter(c => c.chefID === chef_id)
    const post_ids = saves.map(save => save.postID)
    const predicate = c => c.or(
        c => {
            post_ids.forEach(id => {
                c = c.id("eq", id)
            })
        }
    )
    const options = {
        page,
        limit,
    }
    const db_data = await DataStore.query(Post, predicate, options)
    const unformatted_posts = await storage.format_posts(db_data)
    const posts = await global.format_posts(unformatted_posts, user.id )
    return posts
}

export const fetch_followers = async ({page, limit, user, chef}) => {
    const follows = (await DataStore.query(Follow)).filter(c => c.followingID === chef.id)
    const follower_ids = follows.map(follow => follow.followerID)
    const predicate = c => c.or(
        c => {
            follower_ids.forEach(id => {
                c = c.id("eq", id)
            })
        }
    )
    const options = {
        page,
        limit,
    }
    const db_data = await DataStore.query(Chef, predicate, options)
    // console.log('data... ',db_data);
    const unformatted_chefs = await storage.format_chefs(db_data)
    const chefs = await global.format_chefs(unformatted_chefs, user.id )
    return chefs
}

export const fetch_following = async ({page, limit, user, chef}) => {
    //this might be getting everything and filtering after 
    const follows = (await DataStore.query(Follow)).filter(c => c.followerID === chef.id)
    const following_ids = follows.map(follow => follow.followingID)
    const predicate = c => c.or(
        c => {
            following_ids.forEach(id => {
                c = c.id("eq", id)
            })
        }
    )
    const options = {
        page,
        limit,
    }
    const db_data = await DataStore.query(Chef, predicate, options)
    // console.log('data... ',db_data);
    const unformatted_chefs = await storage.format_chefs(db_data)
    const chefs = await global.format_chefs(unformatted_chefs, user.id )
    return chefs
}

export const fetch_remakes = async ({page, limit, user, post}) => {
    const predicate = c => c.and(
        c => c.postID("eq", post.id).type("eq", PostType.REMAKE)
    )
    const options = {
        sort: s => s.rating(SortDirection.DESCENDING),
        page,
        limit,
    }
    const db_data = await DataStore.query(Post, predicate, options)
    const unformatted_posts = await storage.format_posts(db_data)
    const posts = await global.format_posts(unformatted_posts, user.id)
    return posts
}

export const fetch_likes = async ({page, limit, post}) => {
    const predicate = c => c.postID('eq', post.id)
    const options = {
        // sort: s => s.createdAt(SortDirection.DESCENDING),
        page,
        limit,
    }
    const db_data = await DataStore.query(Like, predicate, options)
    const unformatted_likes = await storage.format_likes(db_data)
    const likes = await global.format_chefs(unformatted_likes)
    return likes
}

export const fetch_comments = async ({page, limit, post}) => {
    const predicate = c => c.postID('eq', post.id)
    const options = {
        // sort: s => s.createdAt(SortDirection.DESCENDING),
        page,
        limit,
    }
    const db_data = await DataStore.query(Comment, predicate, options)
    const comments = await storage.format_comments(db_data)
    return comments
}
////////////////////////////////////////////////

const init_create_post = async ({user, uri}) => {
    const chef = await DataStore.query(Chef, user.id)
    const key = await storage.upload(uri)
    return {chef, key}
}

export const create_original = async ({user, uri, title, caption, serves, cook_time, procedure, hashtags, }) => {

    const {chef, key} = await init_create_post({user, uri})

    const predicate = c => c.or(
        c => {
            hashtags.forEach(name => {
                c = c.name("eq", name)
            })
        }
    )

    const existing_hashtags = await DataStore.query(Hashtag, predicate);
    const hashtag_filter = existing_hashtags.map((item) => {
        return item.name
    })

    const new_hashtags = hashtags.filter(function(obj) { return hashtag_filter.indexOf(obj) == -1; })

    await new_hashtags.forEach( async (name) => {
        await DataStore.save(
            new Hashtag({
                name
            })
        )
    })

    let hashtags_input = '#'
    hashtags.forEach((item) => {
        hashtags_input += item + '#'
    })

    const post = await DataStore.save(
        new Post({
            type: PostType.ORIGINAL,
            title,
            caption,
            image: key,
            serves: parseInt(serves),
            cook_time: parseInt(cook_time),
            rating: 0,
            n_likes: 0,
            n_comments: 0,
            n_tips: 0,
            procedure,
            hashtags: hashtags_input,
            chef,
            originalID: 'zzzoriginal',
        })
    )

    return post
}

export const create_remake = async ({user, uri, post, caption, tip, }) => {

    const {chef, key} = await init_create_post({user, uri})

    await DataStore.save(
        Chef.copyOf(chef, updated => {
            updated.n_remakes = chef.n_remakes + 1
        })
    )
    await DataStore.save(
        Post.copyOf(original, updated => {
            updated.n_tips = original.n_tips + 1
            updated.rating = original.rating + 50
        })
    )
    const remake = await DataStore.save(
        new Post({
            type: PostType.REMAKE,
            title: original.title,
            caption,
            image: key,
            rating: 0,
            n_likes: 0,
            n_comments: 0,
            hashtags: original.hashtags,
            chef,
            originalID: post.id,
        })
    )
    await DataStore.save(
        new Remark({
            type: RemarkType.TIP,
            text: tip,
            chef,
            post: original,
            remakeID: remake.id,
        })
    )

    return remake
}