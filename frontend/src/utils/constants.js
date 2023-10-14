//Dòng này chỉ dành cho khi chưa cấu hình proxy trong package.json 
// export const BASE_URL = process.env.NODE_ENV === 'develeopment' ? 'http://localhost:5000' : '/';

export const BASE_URL = '' //Đã cấu hình proxy
export const CABINS_URL = '/api/cabins';
export const USERS_URL = '/api/users';
export const SERVICES_URL = '/api/services';
export const INVOICES_URL = '/api/invoices';
export const BOOKINGS_URL = '/api/bookings';
export const PAYPAL_URL = '/api/config/paypal';
export const UPLOADS_URL = '/api/upload'