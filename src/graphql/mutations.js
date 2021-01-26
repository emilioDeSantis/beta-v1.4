/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChef = /* GraphQL */ `
  mutation CreateChef(
    $input: CreateChefInput!
    $condition: ModelChefConditionInput
  ) {
    createChef(input: $input, condition: $condition) {
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
export const updateChef = /* GraphQL */ `
  mutation UpdateChef(
    $input: UpdateChefInput!
    $condition: ModelChefConditionInput
  ) {
    updateChef(input: $input, condition: $condition) {
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
export const deleteChef = /* GraphQL */ `
  mutation DeleteChef(
    $input: DeleteChefInput!
    $condition: ModelChefConditionInput
  ) {
    deleteChef(input: $input, condition: $condition) {
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
export const createFollow = /* GraphQL */ `
  mutation CreateFollow(
    $input: CreateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    createFollow(input: $input, condition: $condition) {
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
export const updateFollow = /* GraphQL */ `
  mutation UpdateFollow(
    $input: UpdateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    updateFollow(input: $input, condition: $condition) {
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
export const deleteFollow = /* GraphQL */ `
  mutation DeleteFollow(
    $input: DeleteFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    deleteFollow(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createRemark = /* GraphQL */ `
  mutation CreateRemark(
    $input: CreateRemarkInput!
    $condition: ModelRemarkConditionInput
  ) {
    createRemark(input: $input, condition: $condition) {
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
export const updateRemark = /* GraphQL */ `
  mutation UpdateRemark(
    $input: UpdateRemarkInput!
    $condition: ModelRemarkConditionInput
  ) {
    updateRemark(input: $input, condition: $condition) {
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
export const deleteRemark = /* GraphQL */ `
  mutation DeleteRemark(
    $input: DeleteRemarkInput!
    $condition: ModelRemarkConditionInput
  ) {
    deleteRemark(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createHashtag = /* GraphQL */ `
  mutation CreateHashtag(
    $input: CreateHashtagInput!
    $condition: ModelHashtagConditionInput
  ) {
    createHashtag(input: $input, condition: $condition) {
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
export const updateHashtag = /* GraphQL */ `
  mutation UpdateHashtag(
    $input: UpdateHashtagInput!
    $condition: ModelHashtagConditionInput
  ) {
    updateHashtag(input: $input, condition: $condition) {
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
export const deleteHashtag = /* GraphQL */ `
  mutation DeleteHashtag(
    $input: DeleteHashtagInput!
    $condition: ModelHashtagConditionInput
  ) {
    deleteHashtag(input: $input, condition: $condition) {
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
