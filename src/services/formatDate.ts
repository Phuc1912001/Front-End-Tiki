const moment = require("moment");
require("moment/locale/vi"); // Import locale tiếng Việt

// Thiết lập ngôn ngữ là tiếng Việt
moment.locale("vi");

// Lấy ngày hôm nay
const today = moment();

// Tính toán ngày cách xa 4 ngày
const futureDate = today.clone().add(4, "days");

// Render thứ, ngày và tháng của ngày cách xa 4 ngày
export const formattedDate = futureDate.format(`dddd, [ngày] DD/MM`);