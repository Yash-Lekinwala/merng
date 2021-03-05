import { AuthenticationError } from 'apollo-server-errors';
import Post from '../../models/Post.js';
import checkAuth from '../../util/check-auth.js';

export default {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({createdAt: -1});
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getPost(_, {postId})
        {
            try {
                const post = await Post.findById(postId);
                if(post)
                    return post;
                else
                    throw new Error('Post not found!');
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation:{
        async createPost(_, {body}, context) {
            const user = checkAuth(context);

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username
            });

            const post = await newPost.save();

            return post;
        },
        async deletePost(_, {postId}, context)
        {
            const user = checkAuth(context);
            try {
                const post = await Post.findById(postId);
                if(user.username === post.username)
                {
                    await post.delete();
                    return 'Post Deleted';
                }
                else
                {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}