import express from 'express';
import type { Router } from 'express';
import session from 'express-session';
import { container } from '../inversify.config';
import type { ILeadService } from '../services/LeadService/ILeadService';
import { sessionConfig } from '../utils/sessionConfig';
import { checkAmoCrmAuth } from '../middlewares/checkAmoCrmAuth';

const router: Router = express.Router();
const resolvedLeadService: ILeadService = container.get<ILeadService>('LeadService');

router
    .use(session(sessionConfig))
    .use(checkAmoCrmAuth)
    .get('/leads', resolvedLeadService.getLeads);

export {
    router,
};
