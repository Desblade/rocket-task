import type { AxiosResponse } from 'axios';
import { $host } from '../index.ts';
import type { ILead } from '../../models/ILead.ts';

const fetchLeadsController = async (query: string = ''): Promise<ILead[]> => {
    try {
        const { data }: AxiosResponse = await $host.get('/leads', { params: { query } });

        return data;
    } catch (err: any) {
        throw { e: err.response.data.message };
    }
};

export {
    fetchLeadsController,
};
