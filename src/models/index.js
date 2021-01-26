// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PostType = {
  "ORIGINAL": "ORIGINAL",
  "REMAKE": "REMAKE"
};

const RemarkType = {
  "LIKE": "LIKE",
  "COMMENT": "COMMENT",
  "TIP": "TIP",
  "SAVE": "SAVE"
};

const FollowType = {
  "REQUEST": "REQUEST",
  "FOLLOW": "FOLLOW"
};

const NotificationType = {
  "COMMENT": "COMMENT",
  "CAPTION": "CAPTION",
  "REMADE": "REMADE",
  "REQUEST": "REQUEST",
  "ACCEPT": "ACCEPT",
  "LIKED": "LIKED",
  "COMMENTED": "COMMENTED"
};

const { Chef, Post, Remark, Follow, Notification, Hashtag } = initSchema(schema);

export {
  Chef,
  Post,
  Remark,
  Follow,
  Notification,
  Hashtag,
  PostType,
  RemarkType,
  FollowType,
  NotificationType
};