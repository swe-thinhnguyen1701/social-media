const User = require("../models/User");
const Thought = require("../models/Thought");
const { use } = require("../routes/api");

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().select("-__v");
            res.status(200).json(users);
        } catch (error) {
            console.error("Error occurs while fetching users\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select("-__v").populate("thoughts").populate("friends");
            if (!user) return res.status(404).json({ message: "Cannot find user with given id" });

            res.status(200).json(user);
        } catch (error) {
            console.error("Error occurs while fetching user by id\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json({ user, message: "Create new user success" });
        } catch (error) {
            console.error("Error occurs while creating new user\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true, runValidators: true }).select("-__v");
            if (!user) return res.status(404).json({ message: "Cannot find user with given id" });

            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.status(200).json({ user, message: "Update user success" });
        } catch (error) {
            console.error("Error occurs while updating user\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) return res.status(404).json({ message: "Cannot find user with given id" });

            res.status(200).json({ user, message: "Update user success" });
        } catch (error) {
            console.error("Error occurs while deleting user\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            ).select("-__v").populate("friends");

            if (!user) return res.status(404).send("Cannot find user with given id");

            res.status(200).json({ user, message: "Add new friend success" });
        } catch (error) {
            console.error("Error occurs while adding new friend\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async unfriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            ).select("-__v").populate("friends");

            if (!user) return res.status(404).send("Cannot find user with given id");

            res.status(200).json({ user, message: "Remove friend success" });
        } catch (error) {
            console.error("Error occurs while removing friend\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    }
}