import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum PostType {
  ORIGINAL = "ORIGINAL",
  REMAKE = "REMAKE"
}

export enum RemarkType {
  LIKE = "LIKE",
  COMMENT = "COMMENT",
  TIP = "TIP",
  SAVE = "SAVE"
}

export enum FollowType {
  REQUEST = "REQUEST",
  FOLLOW = "FOLLOW"
}

export enum NotificationType {
  COMMENT = "COMMENT",
  CAPTION = "CAPTION",
  REMADE = "REMADE",
  REQUEST = "REQUEST",
  ACCEPT = "ACCEPT",
  LIKED = "LIKED",
  COMMENTED = "COMMENTED"
}



export declare class Chef {
  readonly id: string;
  readonly username: string;
  readonly image: string;
  readonly biography: string;
  readonly n_followers?: number;
  readonly n_following?: number;
  readonly n_remakes?: number;
  readonly posts?: (Post | null)[];
  readonly idols?: (Follow | null)[];
  readonly followers?: (Follow | null)[];
  readonly senders?: (Notification | null)[];
  readonly receivers?: (Notification | null)[];
  readonly remarks?: (Remark | null)[];
  constructor(init: ModelInit<Chef>);
  static copyOf(source: Chef, mutator: (draft: MutableModel<Chef>) => MutableModel<Chef> | void): Chef;
}

export declare class Post {
  readonly id: string;
  readonly type: PostType | keyof typeof PostType;
  readonly createdAt: string;
  readonly title?: string;
  readonly caption?: string;
  readonly image: string;
  readonly serves?: number;
  readonly cook_time?: number;
  readonly rating?: number;
  readonly n_likes?: number;
  readonly n_comments?: number;
  readonly n_tips?: number;
  readonly procedure?: (string | null)[];
  readonly hashtags?: string;
  readonly originalID: string;
  readonly chef?: Chef;
  readonly remakes?: (Post | null)[];
  readonly remarks?: (Remark | null)[];
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

export declare class Remark {
  readonly id: string;
  readonly type: RemarkType | keyof typeof RemarkType;
  readonly createdAt: string;
  readonly text?: string;
  readonly chef?: Chef;
  readonly post?: Chef;
  readonly remakeID?: string;
  constructor(init: ModelInit<Remark>);
  static copyOf(source: Remark, mutator: (draft: MutableModel<Remark>) => MutableModel<Remark> | void): Remark;
}

export declare class Follow {
  readonly id: string;
  readonly type: FollowType | keyof typeof FollowType;
  readonly idol?: Chef;
  readonly follower?: Chef;
  constructor(init: ModelInit<Follow>);
  static copyOf(source: Follow, mutator: (draft: MutableModel<Follow>) => MutableModel<Follow> | void): Follow;
}

export declare class Notification {
  readonly id: string;
  readonly createdAt: string;
  readonly type: NotificationType | keyof typeof NotificationType;
  readonly sender?: Chef;
  readonly receiver?: Chef;
  readonly postID?: string;
  readonly text?: string;
  constructor(init: ModelInit<Notification>);
  static copyOf(source: Notification, mutator: (draft: MutableModel<Notification>) => MutableModel<Notification> | void): Notification;
}

export declare class Hashtag {
  readonly id: string;
  readonly name: string;
  constructor(init: ModelInit<Hashtag>);
  static copyOf(source: Hashtag, mutator: (draft: MutableModel<Hashtag>) => MutableModel<Hashtag> | void): Hashtag;
}