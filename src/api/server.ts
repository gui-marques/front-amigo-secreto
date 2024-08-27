import { getCookie } from "cookies-next";
import { cookies } from 'next/headers';
import { req } from './axios';

export const pingAdmin = async () => {
    try {
        const token = getCookie('token', { cookies });
        await req.get('/admin/ping', {
            headers: { 'Authorization': `${token}` }
        });
        return true;
    } catch (err) { return false }
}