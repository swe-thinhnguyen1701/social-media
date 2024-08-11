const db = require("../config/connection");
const { User, Thought } = require("../models");

const userSeed = [
    {
        username: "johnDoe",
        email: "john.doe@example.com",
        thoughts: [],
        friends: []
    },
    {
        username: "janeSmith",
        email: "jane.smith@example.com",
        thoughts: [],
        friends: []
    },
    {
        username: "charlesNguyen",
        email: "charles.nguyen@example.com",
        thoughts: [],
        friends: []
    }
];

const thoughtSeed = [
    {
        thoughtText: "This is a cool thought!",
        username: "johnDoe",
        reactions: []
    },
    {
        thoughtText: "Here's another interesting thought.",
        username: "janeSmith",
        reactions: []
    },
    {
        thoughtText: "Thoughts are powerful!",
        username: "charlesNguyen",
        reactions: []
    }
];

db.once("open", async () => {
    try {
        // Clear the database
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Insert users
        const users = await User.insertMany(userSeed);

        // Insert thoughts and update users with thought references
        for (let i = 0; i < thoughtSeed.length; i++) {
            const thought = await Thought.create(thoughtSeed[i]);
            await User.findOneAndUpdate(
                { username: thought.username },
                { $push: { thoughts: thought._id } }
            );
        }

        console.log("Data successfully seeded!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding data: ", err);
        process.exit(1);
    }
});
