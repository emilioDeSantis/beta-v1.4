export const schema = {
    "models": {
        "Chef": {
            "name": "Chef",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "username": {
                    "name": "username",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "image": {
                    "name": "image",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "biography": {
                    "name": "biography",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "n_followers": {
                    "name": "n_followers",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "n_following": {
                    "name": "n_following",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "n_remakes": {
                    "name": "n_remakes",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "posts": {
                    "name": "posts",
                    "isArray": true,
                    "type": {
                        "model": "Post"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "chef"
                    }
                },
                "idols": {
                    "name": "idols",
                    "isArray": true,
                    "type": {
                        "model": "Follow"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "follower"
                    }
                },
                "followers": {
                    "name": "followers",
                    "isArray": true,
                    "type": {
                        "model": "Follow"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "idol"
                    }
                },
                "senders": {
                    "name": "senders",
                    "isArray": true,
                    "type": {
                        "model": "Notification"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "receiver"
                    }
                },
                "receivers": {
                    "name": "receivers",
                    "isArray": true,
                    "type": {
                        "model": "Notification"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "sender"
                    }
                },
                "remarks": {
                    "name": "remarks",
                    "isArray": true,
                    "type": {
                        "model": "Remark"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "chef"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Chefs",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUsername",
                        "fields": [
                            "username",
                            "n_followers"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byNFollowers",
                        "fields": [
                            "n_followers",
                            "username"
                        ]
                    }
                }
            ]
        },
        "Post": {
            "name": "Post",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "PostType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "caption": {
                    "name": "caption",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "image": {
                    "name": "image",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "serves": {
                    "name": "serves",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "cook_time": {
                    "name": "cook_time",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "rating": {
                    "name": "rating",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "n_likes": {
                    "name": "n_likes",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "n_comments": {
                    "name": "n_comments",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "n_tips": {
                    "name": "n_tips",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "procedure": {
                    "name": "procedure",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "hashtags": {
                    "name": "hashtags",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "originalID": {
                    "name": "originalID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "chef": {
                    "name": "chef",
                    "isArray": false,
                    "type": {
                        "model": "Chef"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "chefID"
                    }
                },
                "remakes": {
                    "name": "remakes",
                    "isArray": true,
                    "type": {
                        "model": "Post"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "originalID"
                    }
                },
                "remarks": {
                    "name": "remarks",
                    "isArray": true,
                    "type": {
                        "model": "Remark"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "post"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Posts",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byType",
                        "fields": [
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byDate",
                        "fields": [
                            "createdAt",
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byTitle",
                        "fields": [
                            "title",
                            "rating",
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byRating",
                        "fields": [
                            "rating",
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byChef",
                        "fields": [
                            "chefID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byOriginal",
                        "fields": [
                            "originalID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byHashtags",
                        "fields": [
                            "hashtags",
                            "type"
                        ]
                    }
                }
            ]
        },
        "Remark": {
            "name": "Remark",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "RemarkType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "chef": {
                    "name": "chef",
                    "isArray": false,
                    "type": {
                        "model": "Chef"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "chefID"
                    }
                },
                "post": {
                    "name": "post",
                    "isArray": false,
                    "type": {
                        "model": "Chef"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "postID"
                    }
                },
                "remakeID": {
                    "name": "remakeID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Remarks",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byType",
                        "fields": [
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byDate",
                        "fields": [
                            "createdAt",
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byChef",
                        "fields": [
                            "chefID",
                            "postID",
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byPost",
                        "fields": [
                            "postID",
                            "chefID",
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byRemake",
                        "fields": [
                            "remakeID",
                            "type"
                        ]
                    }
                }
            ]
        },
        "Follow": {
            "name": "Follow",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "FollowType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "idol": {
                    "name": "idol",
                    "isArray": false,
                    "type": {
                        "model": "Chef"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "idolID"
                    }
                },
                "follower": {
                    "name": "follower",
                    "isArray": false,
                    "type": {
                        "model": "Chef"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "followerID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Follows",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byIdol",
                        "fields": [
                            "idolID",
                            "followerID",
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byFollower",
                        "fields": [
                            "followerID",
                            "idolID",
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bytype",
                        "fields": [
                            "type"
                        ]
                    }
                }
            ]
        },
        "Notification": {
            "name": "Notification",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "NotificationType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "sender": {
                    "name": "sender",
                    "isArray": false,
                    "type": {
                        "model": "Chef"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "senderID"
                    }
                },
                "receiver": {
                    "name": "receiver",
                    "isArray": false,
                    "type": {
                        "model": "Chef"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "receiverID"
                    }
                },
                "postID": {
                    "name": "postID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Notifications",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bySender",
                        "fields": [
                            "senderID",
                            "receiverID",
                            "createdAt",
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byType",
                        "fields": [
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byReceiver",
                        "fields": [
                            "receiverID",
                            "senderID",
                            "createdAt",
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byDate",
                        "fields": [
                            "createdAt",
                            "type"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byPost",
                        "fields": [
                            "postID",
                            "type"
                        ]
                    }
                }
            ]
        },
        "Hashtag": {
            "name": "Hashtag",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Hashtags",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byName",
                        "fields": [
                            "name"
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "PostType": {
            "name": "PostType",
            "values": [
                "ORIGINAL",
                "REMAKE"
            ]
        },
        "RemarkType": {
            "name": "RemarkType",
            "values": [
                "LIKE",
                "COMMENT",
                "TIP",
                "SAVE"
            ]
        },
        "FollowType": {
            "name": "FollowType",
            "values": [
                "REQUEST",
                "FOLLOW"
            ]
        },
        "NotificationType": {
            "name": "NotificationType",
            "values": [
                "COMMENT",
                "CAPTION",
                "REMADE",
                "REQUEST",
                "ACCEPT",
                "LIKED",
                "COMMENTED"
            ]
        }
    },
    "nonModels": {},
    "version": "c25fbebb0d75c29c8c98ea7aa6f4929a"
};