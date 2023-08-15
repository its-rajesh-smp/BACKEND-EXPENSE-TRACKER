const host = "http://localhost:3000";

export const USER_SIGNUP = `${host}/user/signup`;
export const USER_SIGNIN = `${host}/user/signin`;
export const USER_GET = `${host}/user/get`;

export const PASSWORD_FORGOT_PASSWORD = `${host}/password/sendForgotPasswordEmail`;

export const EXPENSE_GET = `${host}/expense`;
export const EXPENSE_CREATE = `${host}/expense/create`;
export const EXPENSE_DELETE = `${host}/expense/delete`;
export const EXPENSE_DOWNLOAD = `${host}/expense/download`;

export const PAYMENT_CREATE_ORDER = `${host}/payment/createOrder`;
export const PAYMENT_SUCCESS = `${host}/payment/paymentSuccess`;
export const PAYMENT_FAILED = `${host}/payment/paymentFailed`;

export const GET_LEADERBOARD = `${host}/user/getLeaderboard`;

export const DOWNLOADURL_GETALL = `${host}/downloadURL`;
export const DOWNLOADURL_DOWNLOAD_ONE = `${host}/downloadURL/download`;
