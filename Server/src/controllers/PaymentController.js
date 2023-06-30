import Errors from "http-errors";
import Transaction from "../models/Transaction.js";
import { PaymentOperation, Signature } from "@hachther/mesomb";
import { paymentSchema } from "../schemas.js";
import User from "../models/User.js";

export const transactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.where("userId", req.userId).populate(
      "userId"
    );
    return res.json(transactions);
  } catch (err) {
    next(new Errors(500, err));
  }
};

const phoneOperator = (phone) => {
  let operator = "MTN";
  const orange5 = [6, 7, 8, 9];
  if ((phone[1] == 5 && orange5.includes(Number(phone[2]))) || phone[1] == 9) {
    operator = "ORANGE";
  }
  return operator;
};

export const deposit = async (req, res, next) => {
  try {
    const value = await paymentSchema.validateAsync(req.body);
    const user = await User.findById(req.userId);
    const operator = phoneOperator(user.phone);

    const config = getConfig();

    const response = await config.makeCollect(
      value.amount,
      operator,
      user.phone,
      new Date(),
      Signature.nonceGenerator()
    );
    response.isOperationSuccess();
    response.isTransactionSuccess();
    user.balance += Number(value.amount);
    await user.save();

    const transaction = new Transaction({
      type: "deposit",
      amount: value.amount,
      method: operator,
      userId: req.userId,
    });
    await transaction.save();

    return res.json({ message: "Deposit successful!" });
  } catch (err) {
    next(new Errors(500, err));
  }
};

export const withdraw = async (req, res, next) => {
  try {
    const value = await paymentSchema.validateAsync(req.body);
    const user = await User.findById(req.userId);
    const operator = phoneOperator(user.phone);

    // Preventing overdraft
    if (value.amount > user.balance) {
      throw new Error("Insufficuent account balance.");
    }

    const config = getConfig();

    const response = await config.makeDeposit(
      value.amount,
      operator,
      user.phone,
      new Date(),
      Signature.nonceGenerator()
    );
    response.isOperationSuccess();
    response.isTransactionSuccess();
    user.balance -= Number(value.amount);
    await user.save();

    const transaction = new Transaction({
      type: "withdrawal",
      amount: value.amount,
      method: operator,
      userId: req.userId,
    });
    await transaction.save();

    return res.json({ message: "Withdrawal successful!" });
  } catch (err) {
    next(new Errors(500, err));
  }
};

const getConfig = () => {
  const config = new PaymentOperation({
    applicationKey: process.env.MESOMB_APP_KEY,
    accessKey: process.env.MESOMB_ACCESS_KEY,
    secretKey: process.env.MESOMB_SECRET_KEY,
  });
  return config;
};
