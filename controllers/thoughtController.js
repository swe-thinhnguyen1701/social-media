const { default: mongoose } = require("mongoose");
const { Thought, User } = require("../models/");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select("-__v");
            res.status(200).json(thoughts);
        } catch (error) {
            console.error("ERROR occurs while fetching thoughts\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select("-__v");
            if (!thought) return res.status(404).json({ message: "Cannot find a thought with given id" });

            res.status(200).json(thought);
        } catch (error) {
            console.error("ERROR occurs while fetching thought with given id\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async createThought(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(404).json({ message: "Cannot find user with given username" });

            const thought = await Thought.create(req.body);
            await User.updateOne(
                { username: thought.username },
                { $push: { thoughts: thought._id } }
            );

            res.status(200).json({ thought, message: "Add new thought success" });
        } catch (error) {
            console.error("ERROR occurs while creating new thought\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true, runValidators: true }
            ).select("-__v");

            if (!thought) return res.status(404).json({ message: "Cannot find a thought with given id" });

            res.status(200).json({ thought, message: "Update thought successfully" });
        } catch (error) {
            console.error("ERROR occurs while updating thought\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) return res.status(404).json({ message: "Cannot find a thought with given id" });

            await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: thought._id } });

            res.status(200).json({ thought, message: "Remove a thought success" });
        } catch (error) {
            console.error("ERROR occurs while deleting thought\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async addReaction(req, res) {
        try {
            // const user = await User.findOne({ username: req.body.username });
            // if (!user) return res.status(404).json({message: "Cannot find user with given username"});

            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    $addToSet: {
                        reactions: {
                            reactionBody: req.body.reactionBody,
                            username: req.body.username
                        }
                    }
                },
                { new: true, runValidators: true }
            ).select("-__v");

            if (!thought) return res.status(404).json({ message: "Cannot find a thought with given id" });

            res.status(200).json({ thought, message: "Add new reaction success" });
        } catch (error) {
            console.error("ERROR occurs while adding new reaction\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    },
    async deleteReaction(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.thoughtId)) return res.status(400).json({ message: "Thought ID is invalid" });

            if (!mongoose.Types.ObjectId.isValid(req.params.reactionId)) return res.status(400).json({ message: "Reaction ID is invalid" });

            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) return res.status(404).json({ message: "Cannot find a thought with given id" });

            const reaction = thought.reactions.find(reaction => reaction.reactionId.toString() === req.params.reactionId);
            if (!reaction) return res.status(404).json({ message: "Cannot find a reaction with given id" });

            const updateThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            ).select("-__v");

            res.status(200).json({ updateThought, message: "Remove reaction success" });
        } catch (error) {
            console.error("ERROR occurs while removing reaction\n", error);
            res.status(500).json({ message: "Internal error" });
        }
    }
}