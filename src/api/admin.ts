import { getCookie } from 'cookies-next';
import { req } from './axios';
import { Event } from '@/types/Event';
import { Group } from '@/types/Group';
import { PersonComplete } from '@/types/PersonComplete';


// Função auxiliar para redirecionar
const redirectToLogin = () => {
    if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
    }
}

// Função auxiliar para obter o token
const getToken = () => {
    const token = getCookie('token');
    if (!token) {
        redirectToLogin();
        throw new Error('Token não encontrado');
    }
    return token;
}

export const login = async (password: string) => {
    try {
        const json = await req.post('/admin/login', { password });
        return json.data.token as string ?? false;
    } catch (err) { return false }
}

// EVENTS

export const getEvents = async () => {
    const token = getToken();
    const json = await req.get('/admin/events', {
        headers: { 'Authorization':`${token}` }
    });
    return json.data.events as Event[] ?? [];
}

type AddEventData = {
    title: string;
    description: string;
    grouped: boolean;
}
export const addEvent = async (data: AddEventData): Promise<Event | false> => {
    const token = getToken();
    const json = await req.post(`/admin/events`, data,
        { headers: { 'Authorization':`${token}` } });
    return json.data.event as Event ?? false;
}

type UpdateEventData = {
    title?: string;
    description?: string;
    grouped?: boolean;
    status?: boolean;
}
export const updateEvent = async (id: number, data: UpdateEventData): Promise<Event | false> => {
    const token = getToken();
    const json = await req.put(`/admin/events/${id}`, data,
        { headers: { 'Authorization':`${token}` } });
    return json.data.event as Event ?? false;
}

export const deleteEvent = async (id: number) => {
    const token = getToken();
    const json = await req.delete(`/admin/events/${id}`, {
        headers: { 'Authorization':`${token}` }
    });
    return !json.data.error;
}

// GROUPS

export const getGroups = async (eventId: number) => {
    const token = getToken();
    const json = await req.get(`/admin/events/${eventId}/groups`, {
        headers: { 'Authorization':`${token}` }
    });
    return json.data.group as Group[] ?? [];
}

type AddGroupData = {
    name: string;
}
export const addGroup = async (eventId: number, data: AddGroupData): Promise<Group | false> => {
    const token = getToken();
    const json = await req.post(`/admin/events/${eventId}/groups`, data,
        { headers: { 'Authorization':`${token}` }}
    );
    return json.data.group as Group ?? false;
}

type UpdateGroupData = {
    name: string;
}
export const updateGroup = async (eventId: number, id: number, data: UpdateGroupData): Promise<Group | false> => {
    const token = getToken();
    const json = await req.put(`/admin/events/${eventId}/groups/${id}`, data,
        { headers: { 'Authorization':`${token}` } }
    );
    return json.data.group as Group ?? false;
}

export const deleteGroup = async (eventId: number, id: number) => {
    const token = getToken();
    const json = await req.delete(`/admin/events/${eventId}/groups/${id}`, {
        headers: { 'Authorization':`${token}` }
    });
    return !json.data.error;
}

// PEOPLE

export const getPeople = async (eventId: number, groupId: number) => {
    const token = getToken();
    const json = await req.get(`/admin/events/${eventId}/groups/${groupId}/people`, {
        headers: { 'Authorization':`${token}` }
    });
    return json.data.people as PersonComplete[] ?? [];
}

type AddPersonData = {
    name: string;
    cpf: string;
    setor: string;
    chave: string
}
export const addPerson = async (eventId: number, groupId: number, data: AddPersonData): Promise<PersonComplete | false> => {
    
    const json = await req.post(`/admin/events/${eventId}/groups/${groupId}/people`, data, {
       
    });
    return json.data.person as PersonComplete ?? false;
}

type UpdatePersonData = {
    name?: string;
    cpf?: string;
    setor?: string;
    chave?: string;
}
export const updatePerson = async (eventId: number, groupId: number, id: number, data: UpdatePersonData): Promise<PersonComplete | false> => {
    const token = getToken();
    const json = await req.put(`/admin/events/${eventId}/groups/${groupId}/people/${id}`, data, {
        headers: { 'Authorization':`${token}` }
    });
    return json.data.person as PersonComplete ?? false;
}

export const deletePerson = async (eventId: number, groupId: number, id: number) => {
    const token = getToken();
    const json = await req.delete(`/admin/events/${eventId}/groups/${groupId}/people/${id}`, {
        headers: { 'Authorization':`${token}` }
    });
    return !json.data.error;
}
