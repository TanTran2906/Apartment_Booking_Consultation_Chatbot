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

export const PAGE_SIZE = 10
export const PAGE_SIZE_CABINS = 3
export const PAGE_SIZE_SERVICES = 3
export const NEW_DATE = new Date();


export const nationalities = [
    'Great Britain',
    'Finland',
    'United States of America',
    'United Kingdom',
    'Egypt',
    'Spain',
    'China',
    'Sudan',
    'Brazil',
    'Mexico',
    'United States',
    'Pakistan',
    'Australia',
    'France',
    'India',
    'Kuwait',
    'South Africa',
    'Japan',
    'Saudi Arabia',
    'Vietnam',
    'South Korea',
    'Colombia',
    'Canada',
    'Argentina',
    'Nigeria',
    'Taiwan',
    'Portugal',
    'Germany',
    'Bolivia (Plurinational State of)',
];
export const countryFlags = [
    { name: 'Great Britain', value: 'https://flagcdn.com/gb.svg' },
    { name: 'Finland', value: 'https://flagcdn.com/fi.svg' },
    { name: 'United States of America', value: 'https://flagcdn.com/us.svg' },
    { name: 'United Kingdom', value: 'https://flagcdn.com/gb.svg' },
    { name: 'Egypt', value: 'https://flagcdn.com/eg.svg' },
    { name: 'Spain', value: 'https://flagcdn.com/es.svg' },
    { name: 'China', value: 'https://flagcdn.com/cn.svg' },
    { name: 'Sudan', value: 'https://flagcdn.com/sd.svg' },
    { name: 'Brazil', value: 'https://flagcdn.com/br.svg' },
    { name: 'Mexico', value: 'https://flagcdn.com/mx.svg' },
    { name: 'United States', value: 'https://flagcdn.com/us.svg' },
    { name: 'Pakistan', value: 'https://flagcdn.com/pk.svg' },
    { name: 'Australia', value: 'https://flagcdn.com/au.svg' },
    { name: 'France', value: 'https://flagcdn.com/fr.svg' },
    { name: 'India', value: 'https://flagcdn.com/in.svg' },
    { name: 'Kuwait', value: 'https://flagcdn.com/kw.svg' },
    { name: 'South Africa', value: 'https://flagcdn.com/za.svg' },
    { name: 'Japan', value: 'https://flagcdn.com/jp.svg' },
    { name: 'Saudi Arabia', value: 'https://flagcdn.com/sa.svg' },
    { name: 'Vietnam', value: 'https://flagcdn.com/vn.svg' },
    { name: 'South Korea', value: 'https://flagcdn.com/kr.svg' },
    { name: 'Colombia', value: 'https://flagcdn.com/co.svg' },
    { name: 'Canada', value: 'https://flagcdn.com/ca.svg' },
    { name: 'Argentina', value: 'https://flagcdn.com/ar.svg' },
    { name: 'Nigeria', value: 'https://flagcdn.com/ng.svg' },
    { name: 'Taiwan', value: 'https://flagcdn.com/tw.svg' },
    { name: 'Portugal', value: 'https://flagcdn.com/pt.svg' },
    { name: 'Germany', value: 'https://flagcdn.com/de.svg' },
    { name: 'Bolivia (Plurinational State of)', value: 'https://flagcdn.com/bo.svg' },
];