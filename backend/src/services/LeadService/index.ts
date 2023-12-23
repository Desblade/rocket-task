import axios from 'axios';
import type { Request, Response } from 'express';
import type { AxiosResponse } from 'axios';
import { inject, injectable } from 'inversify';
import type { ILeadService } from './ILeadService';
import { errorLogger } from '../../logger';
import type { envVariable } from '../../types';
import type { IAmoCrmRepo } from '../../repositories/AmoCrmRepo/IAmoCrmRepo';
import type { IAmoCrm } from '../../models/IAmoCrm';
import type { ILead } from '../../models/ResponseModels/ILead';
import type { IContact } from '../../models/ResponseModels/IContact';
import type { IStatus } from '../../models/ResponseModels/IStatus';
import type { IResponsible } from '../../models/ResponseModels/IResponsible';
import { formatDate } from '../../utils/date/formateDate';

@injectable()
class LeadService implements ILeadService {
    private readonly _baseUri: envVariable;
    private readonly _amoCrmRepo: IAmoCrmRepo;
    private _amoCrmCred: IAmoCrm;

    constructor(@inject('AmoCrmRepo') amoCrmRepo: IAmoCrmRepo) {
        this._baseUri = process.env.AMO_CRM_BASE_URI;
        this._amoCrmRepo = amoCrmRepo;
        this._amoCrmCred = {};
    }

    public getLeads = async (req: Request<{}, {}, {}, { query: string }>, res: Response): Promise<Response> => {
        try {
            const query = req.query?.query || '';
            const params = {
                with: 'contacts',
                query,
            };

            if (query && query.length < 3) {
                return res
                    .status(400)
                    .json({ message: 'Чтобы найти нужную сделку, введите от 3 символов' });
            } else {
                params.query = query;
            }

            this._amoCrmCred = await this._amoCrmRepo.getAmoCrmCred(['access_token']);

            const { data }: AxiosResponse = await axios.get(`${this._baseUri}/api/v4/leads`, {
                headers: {
                    Authorization: `Bearer ${this._amoCrmCred.access_token}`,
                },
                params,
            });

            if (!data?._embedded?.leads) {
                return res
                    .status(404)
                    .json({ message: 'Ни 1 лида не найдено' });
            }

            const mappedLeads: ILead[] = await Promise.all(
                data._embedded.leads.map(async (lead: any) => {
                    const responsibleId: number = lead?.responsible_user_id;
                    const contactId: number = lead?._embedded.contacts[0].id;

                    const [responsibleData, statusData, contactData]: [IResponsible, IStatus, IContact] = await Promise.all([
                        await this.getResponsibleForLead(responsibleId),
                        await this.getStatusForLead(lead.pipeline_id, lead.status_id),
                        await this.getContactForLead(contactId),
                    ]);

                    const mappedLead: ILead = {
                        responsibleName: responsibleData.name,
                        name: lead.name,
                        price: lead.price,
                        status: statusData.name,
                        contact: contactData?.name,
                        emailContact: contactData.email,
                        telephone: contactData.telephone,
                        created_at: formatDate(lead.created_at),
                    };

                    return mappedLead;
                })
            );

            return res.json(mappedLeads);
        } catch (err: any) {
            errorLogger.error(err.message);

            return res
                .status(500)
                .json({ message: 'Возникли технические неполадки, мы уже в процессе решения проблемы' });
        }
    };

    public getContactForLead = async (contactId: number): Promise<IContact> => {
        try {
            const { data }: AxiosResponse = await axios.get(`${this._baseUri}/api/v4/contacts/${contactId}`, {
                headers: {
                    Authorization: `Bearer ${this._amoCrmCred.access_token}`,
                },
            });

            let telephone = data
                ?.custom_fields_values[0]
                ?.values[0]
                ?.value;
            let email = data
                ?.custom_fields_values[1]
                ?.values[0]
                ?.value;

            if (!telephone) {
                telephone = 'Неизвестно';
            }

            if (!email) {
                email = 'Неизвестно';
            }

            return {
                name: data.name,
                telephone,
                email,
            };

        } catch (err: any) {
            throw err;
        }
    };

    public getStatusForLead = async (pipelineId: number, statusId: number): Promise<IStatus> => {
        try {
            const { data }: AxiosResponse = await axios.get(`${this._baseUri}/api/v4/leads/pipelines/${pipelineId}/statuses/${statusId}`, {
                headers: {
                    Authorization: `Bearer ${this._amoCrmCred.access_token}`,
                },
            });

            return { name: data.name };

        } catch (err: any) {
            throw err;
        }
    };

    public getResponsibleForLead = async (responsibleId: number): Promise<IResponsible> => {
        try {
            const { data }: AxiosResponse = await axios.get(`${this._baseUri}/api/v4/users/${responsibleId}`, {
                headers: {
                    Authorization: `Bearer ${this._amoCrmCred.access_token}`,
                },
            });

            return { name: data.name };

        } catch (err: any) {
            throw err;
        }
    };
}

export {
    LeadService,
};
