import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GestionEdboDataSource} from '../datasources';
import {variablesContratos, variablesContratosRelations} from '../models/variablesContratos.model';
export class variablesContratosRepository extends DefaultCrudRepository<
  variablesContratos,
  typeof variablesContratos.prototype.id,
  variablesContratosRelations
> {
  constructor(
    @inject('datasources.GestionEDBO') dataSource: GestionEdboDataSource,
  ) {
    super(variablesContratos, dataSource);
  }
}
