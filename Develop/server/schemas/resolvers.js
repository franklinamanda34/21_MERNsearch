// resolvers.js

const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (_, { user, params }, { res }) => {
      try {
        const foundUser = await User.findOne({
          $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!foundUser) {
          return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }

        return foundUser;
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  },
  Mutation: {
    createUser: async (_, { body }, { res }) => {
      try {
        const user = await User.create(body);

        if (!user) {
          return res.status(400).json({ message: 'Something is wrong!' });
        }

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    login: async (_, { body }, { res }) => {
      try {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

        if (!user) {
          return res.status(400).json({ message: "Can't find this user" });
        }

        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
          return res.status(400).json({ message: 'Wrong password!' });
        }

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    saveBook: async (_, { user, body }, { res }) => {
      console.log(user);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },
    deleteBook: async (_, { user, params }, { res }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
{ _id: user._id },
{ $pull: { savedBooks: { bookId: params.bookId } } },
{ new: true }
);

if (!updatedUser) {
return res.status(404).json({ message: "Couldn't find user with this id!" });
}

return updatedUser;
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Internal Server Error' });
}
},
},
};

module.exports = resolvers;
