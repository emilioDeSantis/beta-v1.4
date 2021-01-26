// //Copyright 2020, Provecho, All rights reserved.

// import React, {useState, useEffect, useCallback} from 'react';
// import { View, Text, Button, FlatList, SectionList } from 'react-native';

// import { useUser, useSetUser } from '../context'

// function useArticles(fetchArticles, user) {
//     // const user = useUser()
//     const [page, setPage] = useState(0);
//     const [shouldFetch, setShouldFetch] = useState(true);
//     const [articles, setArticles] = useState([]);
  
//     const fetchMore = useCallback(() => setShouldFetch(true), []);
  
//     useEffect(
//         () => {
//             if (!shouldFetch) {
//                 return;
//             }
    
//             const fetch = async () => {
//                 const newArticles = await fetchArticles(page, 6, user);
//                 // console.log('areticlkes... ',newArticles);
//                 setShouldFetch(false);
//                 setArticles(oldArticles => [...oldArticles, ...newArticles]);
//                 setPage(page + 1);
//             };
    
//             fetch();
//         },
//         [page, shouldFetch],
//     );
  
//     return [articles, fetchMore, setArticles, setPage];
// }

// const Stream = (props) => {

//     // const user = useUser()

//     const [articles, fetchMore, setArticles, setPage] = useArticles(props.fetchArticles, props.user)

//     // console.log('articles.. ', articles);

//     useEffect(() => {
//         setArticles([])
//         setPage(0)
//         fetchMore()
//     },[props.search])

//     const renderItem = ({ item }) => {
//         return (
//             props.Article(item, props.user, props.is_rotated, props.article_props)
//         );
//     };

//     return (
//         <View style={{ flex: 1 , }}>
//             <FlatList
//                 horizontal={props.horizontal}
//                 data={articles}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.key}
//                 onEndReachedThreshold={0.9}
//                 onEndReached={fetchMore}
//                 showsHorizontalScrollIndicator={false}
//                 showsVerticalScrollIndicator ={false}
//             />
//         </View>
//     )
// }
// //adda error handleing when u get to end or ot doesnt load

// export default Stream;




//^^^ before remaking the stream





//vvv after remaking the stream





//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback, useRef} from 'react';
import { View, Text, Button, FlatList, SectionList, TouchableOpacity, RefreshControl, TouchableOpacityBase } from 'react-native';

import style from '../style'

function useArticles(fetchArticles, user) {
    const [page, setPage] = useState(0);
    const [shouldFetch, setShouldFetch] = useState(true);
    const [articles, setArticles] = useState([]);
  
    const fetchMore = useCallback(() => setShouldFetch(true), []);
  
    useEffect(
        () => {
            if (!shouldFetch) {
                return;
            }
    
            const fetch = async () => {
                const input = {page, limit: 6, user,}
                const newArticles = await fetchArticles(input);
                // console.log('areticlkes... ',newArticles);
                setShouldFetch(false);
                setArticles(oldArticles => [...oldArticles, ...newArticles]);
                setPage(page + 1);
            };
    
            fetch();
        },
        [page, shouldFetch],
    );
  
    return [articles, fetchMore, setArticles, setPage];
}

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}


const ToTopButton = (props) => {
    return (
        <TouchableOpacity
            style={style.wide_button_filled}
            onPress={() => props.to_top()}
            activeOpacity={1}
        >
            <Text style={[style.medium_text_size, style.dark_text]}>to top</Text>
        </TouchableOpacity>
    )
}

const Stream = (props) => {

    const [show_to_top, set_show_to_top] = useState(false)

    const flatListRef = useRef()

    to_top = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
        set_show_to_top(false)
    }

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        reset()
    
        wait(2000).then(() => setRefreshing(false));
    }, [])

    const [articles, fetchMore, setArticles, setPage] = useArticles(props.fetchArticles, props.user)

    const [last_offset, set_last_offset] = useState(0)

    const reset = () => {
        setArticles([])
        setPage(0)
        fetchMore()
    }

    useEffect(() => {
        reset()
    },[props.search])

    const renderItem = ({ item }) => {
        return (
            props.children(item)
        );
    };

    return (
        <>
            <View style={{ flex: 1 , }}>
                <FlatList
                    onScroll={(data) => {
                        if (data.nativeEvent.contentOffset.y > last_offset && show_to_top == true) {
                            set_show_to_top(false)
                        } else if (data.nativeEvent.contentOffset.y < last_offset && show_to_top == false){
                            set_show_to_top(true)
                        }
                        if(data.nativeEvent.contentOffset.y < 1000){
                            set_show_to_top(false)
                        }
                        set_last_offset(data.nativeEvent.contentOffset.y)
                    }}
                    scrollEventThrottle={100}
                    ref={flatListRef}
                    onRefresh={() => onRefresh()}
                    refreshing={refreshing}
                    horizontal={props.horizontal}
                    numColumns={props.n_columns}
                    data={articles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    onEndReachedThreshold={0.9}
                    onEndReached={fetchMore}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator ={false}
                />
            </View>
            {show_to_top && <View style={style.to_top_container}>
                <ToTopButton to_top={to_top}/>
            </View>}
        </>
    )
}
//adda error handleing when u get to end or ot doesnt load

export default Stream;