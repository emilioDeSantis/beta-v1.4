/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncChefs = /* GraphQL */ `
  query SyncChefs(
    $filter: ModelChefFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncChefs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getChef = /* GraphQL */ `
  query GetChef($id: ID!) {
    getChef(id: $id) {
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
export const listChefs = /* GraphQL */ `
  query ListChefs(
    $filter: ModelChefFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChefs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncFollows = /* GraphQL */ `
  query SyncFollows(
    $filter: ModelFollowFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFollows(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        idolID
        followerID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getFollow = /* GraphQL */ `
  query GetFollow($id: ID!) {
    getFollow(id: $id) {
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
export const listFollows = /* GraphQL */ `
  query ListFollows(
    $filter: ModelFollowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        idolID
        followerID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncRemarks = /* GraphQL */ `
  query SyncRemarks(
    $filter: ModelRemarkFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRemarks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        createdAt
        text
        chefID
        postID
        remakeID
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getRemark = /* GraphQL */ `
  query GetRemark($id: ID!) {
    getRemark(id: $id) {
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
export const listRemarks = /* GraphQL */ `
  query ListRemarks(
    $filter: ModelRemarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRemarks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        createdAt
        text
        chefID
        postID
        remakeID
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNotifications = /* GraphQL */ `
  query SyncNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        type
        senderID
        receiverID
        postID
        text
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        type
        senderID
        receiverID
        postID
        text
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncHashtags = /* GraphQL */ `
  query SyncHashtags(
    $filter: ModelHashtagFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHashtags(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getHashtag = /* GraphQL */ `
  query GetHashtag($id: ID!) {
    getHashtag(id: $id) {
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
export const listHashtags = /* GraphQL */ `
  query ListHashtags(
    $filter: ModelHashtagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHashtags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
