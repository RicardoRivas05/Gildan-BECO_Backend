import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GestionEdboDataSource} from '../datasources';
import {feriadosHn, feriadosHnRelations} from '../models/feriadosHn.model';
export class feriadosHnRepository extends DefaultCrudRepository<
  feriadosHn,
  typeof feriadosHn.prototype.id,
  feriadosHnRelations
> {
  constructor(
    @inject('datasources.GestionEDBO') dataSource: GestionEdboDataSource,
  ) {
    super(feriadosHn, dataSource);
  }
}
