import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'feriadosHn'}},
})
export class feriadosHn extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {
      columnName: 'id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id: number;

  @property({
    type: 'string',
    length: 50,
    mssql: {
      columnName: 'fecha',
      dataType: 'date',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  fecha?: Date;

  @property({
    type: 'string',
    mssql: {
      columnName: 'descripcion',
      dataType: 'string',
      nullable: 'YES',
    },
  })
  descripcion?: string;


  @property({
    type: 'boolean',
    required: false,
    mssql: {
      columnName: 'estado',
      dataType: 'bit',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  estado: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<feriadosHn>) {
    super(data);
  }
}

export interface feriadosHnRelations {
  // describe navigational properties here
}

export type feriadosHnWithRelations = feriadosHn & feriadosHnRelations;
