import { Container } from 'inversify';
import type { Knex } from 'knex';
import type { IAmoCrmRepo } from './repositories/AmoCrmRepo/IAmoCrmRepo';
import { AmoCrmRepo } from './repositories/AmoCrmRepo';
import type { ILeadService } from './services/LeadService/ILeadService';
import { LeadService } from './services/LeadService';
import { db } from './db';

const container: Container = new Container();

container.bind<Knex>('Knex').toConstantValue(db);
container.bind<IAmoCrmRepo>('AmoCrmRepo').to(AmoCrmRepo);
container.bind<ILeadService>('LeadService').to(LeadService);

export {
    container,
};

