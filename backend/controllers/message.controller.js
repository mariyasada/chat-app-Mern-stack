import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { apiErrorHandler } from "../utils/apiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    console.log(senderId, receiverId, "both ids");

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({ senderId, receiverId, message });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = await getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //io.to<soket.id> used when we have to fire event to particular client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res
      .status(201)
      .json(new apiResponse(200, newMessage, "message sent successfully"));
  } catch (err) {
    throw new apiErrorHandler(500, err?.message);
  }
});

export const getMessage = asyncHandler(async (req, res) => {
  try {
    const { id: chatPersonId } = req.params;
    const loggedinUserId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [loggedinUserId, chatPersonId] },
    }).populate("messages"); // will give the message object

    if (!conversation) {
      res
        .status(200)
        .json(
          new apiResponse(
            200,
            [],
            "there is no conversation between these two users"
          )
        );
    }

    const messages = conversation.messages;
    res
      .status(200)
      .json(new apiResponse(200, messages, "fetched messages successfully!!"));
  } catch (err) {
    throw new apiErrorHandler(500, err?.message);
  }
});
