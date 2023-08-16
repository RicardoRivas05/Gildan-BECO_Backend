import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {GenerateInvoice} from '../core/interfaces/models/invoice-generete.interface';
import {
  // FacturaManualRepository,
  MedidorRepository,
  MedidorVirtualDetalleRepository,
  MedidorVirtualRepository,
  RollOverRepository,
} from '../repositories';

export interface MedidorSelect {
  sourceId: number;
  sourceName: string;
  descripcion?: string;
  totalLecturaActiva: number;
  totalLecturaReactiva: number;
  quantityID: number;
  lecturaActivaActual: number;
  lecturaActivaAnterior: number;
  lecturaReactivaActual: number;
  lecturaReactivaAnterior: number;
  lecturaActivaExportada: number;
  lecturaActivaExportadaActual: number;
  lecturaActivaExportadaAnterior: number;
  fechaActual: string;
  fechaAnterior: string;
  multiplicador: number;
}

export interface ION_Data_Source {
  ID: number;
  Name: string;
  NamespaceID: number;
  SourceTypeID: number;
  TimeZoneID: number;
  Descripcion: string;
  Signature: number;
  DisplayName: string;
}

export interface RegistroManual {
  id: number;
  medidorId: number;
  sourceId: number;
  fecha: string;
  quantityId: number;
  valor: number;
  multiplicador: number;
}
export interface ION_Data {
  sourceID: number;
  TimestampUTC: string;
  sourceName: string;
  quantityID: number;
  quantityName: string;
  dataLog2ID: string;
  Value: number;
  Fecha: string;
}

export interface ContractMeter {
  mostrar: boolean;
  estado: boolean;
  codigoContrato: string;
  contratoMedidorId: number;
  nombreActor: string;
  actorId: number;
  codigoMedidor: string;
  medidorId: number;
  sourceId: number;
  sourceName: string;
  ptarifaValor: number;
  parametroId: number;
  tarifaId: number;
  contratoId: number;
  tipoContratoId: number;
  fechaInicial: string;
  fechaFinal: string;
  fechaCreacion: string;
  fechaVenc: string;
  observacion: string;
  zonaId: number;
  diaGeneracion: number;
  diasDisponibles: number;
  Direccion: string;
  Telefono: string;
  correo: string;
  Imagen: string;
  tipo: boolean;
  funcionalidad: number;
}

export interface CargosFacturaEEH {
  id: number;
  nombre: string;
  valor: number;
  estado: boolean;
}

export interface Medidor {
  id: number;
  sourceId: number;
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  multiplicador: number;
  lecturaMax: number;
  puntoMedicion: number;
  observacion: string;
  puntoConexion: number;
  tipo: boolean;
  almacenamientoLocal: boolean;
  funcionalidad: number;
  estado: boolean;
}

export interface CPI {
  ID: number;
  Month: string;
  Value: number;
  estado: number;
}

export interface LecturasPorContrato {
  contrato: {
    contratoId: number;
    contratoMedId: number;
    contratoCodigo: string;
    fechaInicial: string;
    fechaFinal: string;
    cliente: string;
    diasDisponibles: number;
    diaGeneracion: number;
    direccion: string;
    telefono: string;
    correo: string;
    logo: string;
  };
  cargo?: [
    {
      nombre: string;
      valorAjustado: number;
    },
  ];
  medidor: [
    {
      sourceID: number;
      sourceName: string;
      LecturaActiva: number;
      ConsumoExterno: number;
      ConsumoInterno: number;
      LecturaReactiva: number;
      LecturaActivaExportada: number;
      cargoReactivo: boolean;
      descripcion: string;
      CEF: number;
      PCF: number;
      FP: number;
      PCFR: number;
      ESC: number;
      EAX: number;
      PPPT: number;
      funcionalidad: number;
      mostrar: boolean;
      historico: {
        lecturaActivaActual: number;
        lecturaActivaAnterior: number;
        lecturaReactivaActual: number;
        lecturaReactivaAnterior: number;
        lecturaActivaExportadaActual: number;
        lecturaActivaExportadaAnterior: number;
        fechaActual: string;
        fechaAnterior: string;
        multiplicador: number;
      };
    },
  ];
  vmedidor?: [
    {
      id: number;
      descripcion: string;
      LecturaActiva: number;
      LecturaReactiva: number;
      mostrar: boolean;
      porcentaje: number;
    },
  ];
  totalLecturaActivaAjustada: number;
  totalLecturaReactivaAjustada: number;
  totalEnergiaFotovoltaicaActivaConsumida: number;
  totalEnergiaFotovoltaicaReactivaConsumida: number;
  totalEnergiaActivaExportada: number;
  totalEnergiaDeInyeccionConsumida: number;
  CEFTotal: number;
  PCFTotal: number;
  PCFRTotal: number;
  FPTotal: number;
  PPPTT: number;
  PPS: number;
  PT: number;
  PBE: number;
  ECR: number;
  ESG: number;
  cargoReactivo: boolean;
  ModoCalculoSolar: boolean;
  diasFacturados: number;
}
@injectable({scope: BindingScope.TRANSIENT})
export class FormulationService {
  constructor(
    // @repository(FacturaManualRepository)
    // private facturaManualRepository: FacturaManualRepository,
    @repository(MedidorRepository)
    private medidorRepository: MedidorRepository,
    @repository(MedidorVirtualRepository)
    private medidorVirtualRepository: MedidorVirtualRepository,
    @repository(RollOverRepository)
    private rollOverRepository: RollOverRepository,
    @repository(MedidorVirtualDetalleRepository)
    private medidorVirtualDetalleRepository: MedidorVirtualDetalleRepository,
  ) {}
  async generateInvoices(generateInvoice: GenerateInvoice) {
    let lecturasEnergiaActiva: ION_Data[] = [],
      lecturasEnergiaReactiva: ION_Data[] = [],
      lecturasEnergiaActivaExportada: ION_Data[] = [],
      historicoMedidorConsumo: Array<MedidorSelect> = [];
    let EnergiaReactiva = 91,
      EnergiaActiva = 129,
      EnergiaActivaExportada = 1001,
      Exportada = 139;
    let medidorEEH = 0,
      medidorGeneracionSolar = 1;
    let tarifaEnergiaExterna = 13;
    let cliente = 3,
      proveedorExterno = 1,
      proveedorInterno = 4;
    let MedidorFronteraSourceID = 0;
    let FS = 0,
      EAC = 0,
      ESG = 0,
      EXR = 0,
      ECR = 0,
      ETCR = 0;
    let PBE = 0;
    let PI = 0,
      ETCE = 0,
      ETO = 0;
    let fechaInicial = new Date(generateInvoice.fechaInicial).getMinutes() % 15;
    let fechaFinal = new Date(generateInvoice.fechaFinal).getMinutes() % 15;
  }
}
