import { AuthenticationError } from 'apollo-server-express';
import { User } from '../models/index.js';
import { signToken } from '../utils/auth.js';
import { IUser } from '../models/User.js';

const resolvers = {
  Query: {
    me: async (parent: any, args: any, context: any) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent: any, { username, email, password }: { username: string; email: string; password: string }) => {
      const user = await User.create({ username, email, password }) as IUser;
      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id.toString()
      });
      return { token, user };
    },

    login: async (parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email }) as IUser;

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id.toString()
      });

      return { token, user };
    },

    saveBook: async (parent: any, { bookData }: { bookData: any }, context: any) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async (parent: any, { bookId }: { bookId: string }, context: any) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers; 