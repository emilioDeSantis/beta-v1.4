/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChef = /* GraphQL */ `
  subscription OnCreateChef {
    onCreateChef {
      id
      username
      image
      biography
      n_followers
      n_following
      n_remakes
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChef = /* GraphQL */ `
  subscription OnUpdateChef {
    onUpdateChef {
      id
      username
      image
      biography
      n_followers
      n_following
      n_remakes
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChef = /* GraphQL */ `
  subscription OnDeleteChef {
    onDeleteChef {
      id
      username
      image
      biography
      n_followers
      n_following
      n_remakes
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFollow = /* GraphQL */ `
  subscription OnCreateFollow {
    onCreateFollow {
      id
      type
      idolID
      followerID
      idol {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      follower {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFollow = /* GraphQL */ `
  subscription OnUpdateFollow {
    onUpdateFollow {
      id
      type
      idolID
      followerID
      idol {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      follower {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFollow = /* GraphQL */ `
  subscription OnDeleteFollow {
    onDeleteFollow {
      id
      type
      idolID
      followerID
      idol {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      follower {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      type
      createdAt
      title
      caption
      image
      serves
      cook_time
      rating
      n_likes
      n_comments
      n_tips
      procedure
      hashtags
      chefID
      originalID
      chef {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      remakes {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      type
      createdAt
      title
      caption
      image
      serves
      cook_time
      rating
      n_likes
      n_comments
      n_tips
      procedure
      hashtags
      chefID
      originalID
      chef {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      remakes {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      type
      createdAt
      title
      caption
      image
      serves
      cook_time
      rating
      n_likes
      n_comments
      n_tips
      procedure
      hashtags
      chefID
      originalID
      chef {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      remakes {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onCreateRemark = /* GraphQL */ `
  subscription OnCreateRemark {
    onCreateRemark {
      id
      type
      createdAt
      text
      chefID
      postID
      chef {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      post {
        id
        type
        createdAt
        title
        caption
        image
        serves
        cook_time
        rating
        n_likes
        n_comments
        n_tips
        procedure
        hashtags
        chefID
        originalID
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      remakeID
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onUpdateRemark = /* GraphQL */ `
  subscription OnUpdateRemark {
    onUpdateRemark {
      id
      type
      createdAt
      text
      chefID
      postID
      chef {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      post {
        id
        type
        createdAt
        title
        caption
        image
        serves
        cook_time
        rating
        n_likes
        n_comments
        n_tips
        procedure
        hashtags
        chefID
        originalID
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      remakeID
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onDeleteRemark = /* GraphQL */ `
  subscription OnDeleteRemark {
    onDeleteRemark {
      id
      type
      createdAt
      text
      chefID
      postID
      chef {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      post {
        id
        type
        createdAt
        title
        caption
        image
        serves
        cook_time
        rating
        n_likes
        n_comments
        n_tips
        procedure
        hashtags
        chefID
        originalID
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      remakeID
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      id
      createdAt
      type
      senderID
      receiverID
      sender {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      receiver {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      postID
      text
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
      id
      createdAt
      type
      senderID
      receiverID
      sender {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      receiver {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      postID
      text
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
      id
      createdAt
      type
      senderID
      receiverID
      sender {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      receiver {
        id
        username
        image
        biography
        n_followers
        n_following
        n_remakes
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      postID
      text
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onCreateHashtag = /* GraphQL */ `
  subscription OnCreateHashtag {
    onCreateHashtag {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHashtag = /* GraphQL */ `
  subscription OnUpdateHashtag {
    onUpdateHashtag {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHashtag = /* GraphQL */ `
  subscription OnDeleteHashtag {
    onDeleteHashtag {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
