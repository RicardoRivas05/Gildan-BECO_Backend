import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GestionEdboDataSource} from '../datasources';
import {lecturasEnee, lecturasEneeRelations} from '../models/lecturasEnee.model';
export class lecturasEneeRepository extends DefaultCrudRepository<
  lecturasEnee,
  typeof lecturasEnee.prototype.id,
  lecturasEneeRelations
> {
  constructor(
    @inject('datasources.GestionEDBO') dataSource: GestionEdboDataSource,
  ) {
    super(lecturasEnee, dataSource);
  }
}
