import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GestionEdboDataSource} from '../datasources';
import {euro, euroRelations} from '../models/euro.model';
export class euroRepository extends DefaultCrudRepository<
  euro,
  typeof euro.prototype.id,
  euroRelations
> {
  constructor(
    @inject('datasources.GestionEDBO') dataSource: GestionEdboDataSource,
  ) {
    super(euro, dataSource);
  }
}
