import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'AccesoDollar'}},
})
export class dollar extends Entity {
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
      columnName: 'fechaInicial',
      dataType: 'Date',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  fechaInicial?: Date;

  @property({
    type: 'string',
    length: 50,
    mssql: {
      columnName: 'fechaFinal',
      dataType: 'Date',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  fechaFinal?: Date;

  @property({
    type: 'string',
    mssql: {
      columnName: 'Compra',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 2,
      nullable: 'YES',
    },
  })
  Compra?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'Venta',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 2,
      nullable: 'YES',
    },
  })
  Venta?: number;

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

  constructor(data?: Partial<dollar>) {
    super(data);
  }
}

export interface dollarRelations {
  // describe navigational properties here
}

export type dollarWithRelations = dollar & dollarRelations;
