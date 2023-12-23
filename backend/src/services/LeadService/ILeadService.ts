import type { Request, Response } from 'express';
import type { IContact } from '../../models/ResponseModels/IContact';
import type { IResponsible } from '../../models/ResponseModels/IResponsible';
import type { IStatus } from '../../models/ResponseModels/IStatus';

interface ILeadService {
    getLeads(req: Request, res: Response): Promise<Response>;
    getContactForLead(contactId: number): Promise<IContact>;
    getResponsibleForLead(responsibleId: number): Promise<IResponsible>;
    getStatusForLead(pipelineId: number, statusId: number): Promise<IStatus>;
}

export {
    ILeadService,
};
