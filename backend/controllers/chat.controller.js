const Chat = require("../models/chat.model");
const User = require("../models/user.model");

//@description      Crea una chat 1 to 1
//@route            POST /newchat
//@access           Protected
const accessChat = async(req, res) => {
    const { userId } = req.body;
    if(!userId)     return  res.status(400).send('UserID param not sent');

    let isChat = await Chat.find(
        [
            { users: { $eleMatch: { $eq: req.user._id }}},
            { users: { $eleMatch: { $eq: userId }}},
        ]
    )
    .populate("user", "-password")
    .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0){
        res.send(isChat[0])
    }else{
        let chatData = {
            chatName: "sender",
            users: [req.user._id, userId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(fullChat)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}

//@description      Prende le chat per un utente
//@route            GET /getchats
//@access           Protected
const fetchChats = async(req, res) => {
    try {
        Chat.find({ user: { $eleMatch: { $eq: req.user._id }}})
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    accessChat,
    fetchChats
}