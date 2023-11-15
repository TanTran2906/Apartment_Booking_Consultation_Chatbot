// Làm tròn một số thập phân và định dạng kết quả với hai chữ số thập phân sau dấu chấm
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};