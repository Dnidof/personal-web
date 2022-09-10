import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLID, GraphQLSchema, isObjectType, GraphQLInt } from "graphql"
import Post from "../models/post.js"
import User from "../models/user.js"
import Comment from "../models/comment.js"
import { signIn, signUp } from "./auth.js"

const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        image: { type: GraphQLString },
        sections: { type: new GraphQLList(GraphQLString) },
        tags: { type: new GraphQLList(GraphQLString) },
        likes: { type: new GraphQLList(GraphQLID) },
        createdAt: { type: GraphQLString },
        creator: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.creatorId);
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                return Comment.find({ postId: parent.id });
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        isAdmin: { type: GraphQLInt },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return Post.find({ creatorId: parent.id });
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                return Comment.find({ creatorId: parent.id });
            }
        }
    })
})

const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        likes: { type: new GraphQLList(GraphQLID) },
        creator: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.creatorId);
            }
        },
        post: {
            type: PostType,
            resolve(parent, args){
                return Post.findById(parent.postId);
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find();
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args, context){
                console.log(context.headers)
                return Post.find();
            }
        },
        user: {
            type: new GraphQLList(PostType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Post.findById(args.id);
            }
        }
    })
})

const createResponseType = (graphQLType, name) => {
    if(isObjectType(graphQLType)){
        return new GraphQLObjectType({
            name: name,
            fields: () => ({
                token: { type: GraphQLString },
                message: { type: GraphQLString },
                obj: { type: graphQLType }
            })
        })
    }else{
        console.error("Argument is not GraphQLObjectType")
    }
}

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        createPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                image: { type: new GraphQLNonNull(GraphQLString) },
                sections: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
                tags: { type: new GraphQLList(GraphQLString) },
                creatorId: { type: new GraphQLNonNull(GraphQLString) },
                createdAt: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                const post = new Post({ ...args });
                return post.save();
            }
        },
        likePost: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID)}, 
                userId: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                const post = Post.findById(args.postId);
                post.likes.push(args.userId);
                return post.save();
            }
        },
        commentPost: {
            type: PostType,
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID)},
                commentContent: { type: new GraphQLNonNull(GraphQLString)},
                creatorId: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                const comment = new Comment({ postId: args.postId, content: args.commentContent, creatorId: args.creatorId });
                return comment.save();
            }
        },
        createUser: {
            type: createResponseType(UserType, "createUser"),
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                email: { type: new GraphQLNonNull(GraphQLString)},
                password: { type: new GraphQLNonNull(GraphQLString)},
                confirmPassword: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args) => {
                const { token, message, user} = await signUp(args)
                return { token, message, obj: user}
            }
        },
        signinUser: {
            type: createResponseType(UserType, "signinUser"),
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                password: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args) => {
                const { token, message, user } = await signIn(args)
                return { token, message, obj: user}
            }
        }
    })
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})