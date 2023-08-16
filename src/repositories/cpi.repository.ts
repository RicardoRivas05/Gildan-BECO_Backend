import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GestionEdboDataSource} from '../datasources';
import {cpi, cpiRelations} from '../models/cpi.model';
export class cpiRepository extends DefaultCrudRepository<
  cpi,
  typeof cpi.prototype.id,
  cpiRelations
> {
  constructor(
    @inject('datasources.GestionEDBO') dataSource: GestionEdboDataSource,
  ) {
    super(cpi, dataSource);
  }
}
