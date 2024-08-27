import { req } from '@/api/axios';
import { Event } from '@/types/Event';
import { SearchResult } from '@/types/SearchResult';



export const getEvent = async (id: number): Promise<Event | false> => {
    const json = await req.get(`/events/${id}`);
    return json.data.event as Event ?? false;
}

export const searchCPF = async (eventId: number, cpf: string, chave: string): Promise<SearchResult | false> => {
    const url = `/events/${eventId}/search?cpf=${encodeURIComponent(cpf)}&chave=${encodeURIComponent(chave)}`;

    try {
        const json = await req.get(url);
        if (json.data.person && json.data.personMatched) {
            return json.data as SearchResult;
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
    return false;
}

