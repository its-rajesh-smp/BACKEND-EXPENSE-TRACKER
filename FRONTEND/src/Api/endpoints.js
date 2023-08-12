const host = "http://localhost:5000";

export const USER_SIGNUP = `${host}/user/signup`;
export const USER_SIGNIN = `${host}/user/signin`;
export const USER_GET = `${host}/user/get`;

export const EXPENSE_GET = `${host}/expense`;
export const EXPENSE_CREATE = `${host}/expense/create`;
export const EXPENSE_DELETE = `${host}/expense/delete`;

export const PAYMENT_CREATE_ORDER = `${host}/payment/createOrder`;
export const PAYMENT_SUCCESS = `${host}/payment/paymentSuccess`;
export const PAYMENT_FAILED = `${host}/payment/paymentFailed`;

export const GET_LEADERBOARD = `${host}/user/getLeaderboard`;