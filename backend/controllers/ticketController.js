const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = async (req, res) => {
  // Get user, using id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
};

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.state(400);
    throw new Error("Please add a product and description");
  }

  // Get user, using id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
};

module.exports = {
  getTickets,
  createTicket,
};
