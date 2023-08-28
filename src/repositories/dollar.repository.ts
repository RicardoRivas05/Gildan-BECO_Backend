import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GestionEdboDataSource} from '../datasources';
import {dollar, dollarRelations} from '../models/dollar.model';
export class dollarRepository extends DefaultCrudRepository<
  dollar,
  typeof dollar.prototype.id,
  dollarRelations
> {
  constructor(
    @inject('datasources.GestionEDBO') dataSource: GestionEdboDataSource,
  ) {
    super(dollar, dataSource);
  }
}
