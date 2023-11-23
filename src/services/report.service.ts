import { /* inject, */ BindingScope, injectable} from '@loopback/core/dist';
import {repository} from '@loopback/repository';
import {viewOf} from '../core/library/views.library';
import {reportRepository} from '../repositories/reports.repository';

@injectable({scope: BindingScope.TRANSIENT})
export class ReportService {
  constructor(
    @repository(reportRepository)
    public reportRepository: reportRepository,
  ) { }

  async getReportMedidores(
    id: number,
    fechaInicial: string,
    fechaFinal: string,
  ) {
    const inicial = await this.reportRepository.dataSource.execute(
      `${viewOf.getConsumoMedidores} where quantityID=${id} and (TimestampUTC=dateadd(hour,6,'${fechaInicial}'))  and sourceID NOT IN(17,13) order by CAST(codigo AS INT)`,
    );

    const final = await this.reportRepository.dataSource.execute(
      `${viewOf.getConsumoMedidores} where quantityID=${id} and (TimestampUTC=dateadd(hour,6,'${fechaFinal}')) and sourceID NOT IN(17,13) order by CAST(codigo AS INT)`,
    );

    return {inicial, final};
  }
  async cogeneracion(
    fechaInicial: string,
    fechaFinal: string,
  ) {
    let quantityID = 129;
    let quantityID2 = 139;

    const cogeneracionDel = await this.reportRepository.dataSource.execute(
      `${viewOf.getCogeneracion} where quantityID=${quantityID} AND
      TimestampUTC BETWEEN  dateadd(hour,6,'${fechaInicial}') AND dateadd(hour,6,'${fechaFinal}') ORDER BY CAST(codigo AS INT)`,
    );

    const cogeneracionRec = await this.reportRepository.dataSource.execute(
      `${viewOf.getCogeneracion} where quantityID=${quantityID2} AND
      TimestampUTC BETWEEN  dateadd(hour,6,'${fechaInicial}') AND dateadd(hour,6,'${fechaFinal}') ORDER BY CAST(codigo AS INT)`,
    );

    const medidoresSTUDel = await this.reportRepository.dataSource.execute(
      `${viewOf.getConsumoMedidores} where quantityID=${quantityID} AND
      TimestampUTC BETWEEN  dateadd(hour,6,'${fechaInicial}') AND dateadd(hour,6,'${fechaFinal}') and sourceID NOT IN(17,13) ORDER BY CAST(codigo AS INT)`,
    );

    const medidoresSTURec = await this.reportRepository.dataSource.execute(
      `${viewOf.getConsumoMedidores} where quantityID=${quantityID2} AND
      TimestampUTC BETWEEN  dateadd(hour,6,'${fechaInicial}') AND dateadd(hour,6,'${fechaFinal}') and sourceID NOT IN(17,13) ORDER BY CAST(codigo AS INT)`,
    );

    const feriadosHn = await this.reportRepository.dataSource.execute(
      `${viewOf.getFeriadosHn} where estado=1`,
    )

    return {cogeneracionDel, cogeneracionRec, medidoresSTUDel, medidoresSTURec, feriadosHn};
  }

  async cogeneracion_12(
    fechaInicial: string,
    fechaFinal: string,
  ) {
    let quantityID = 130;
    let quantityID2 = 131;
    const medidoresPuntaInicial = await this.reportRepository.dataSource.execute(
      `${viewOf.getCogeneracion} where quantityID=${quantityID2} AND
      TimestampUTC =  dateadd(hour,6,'${fechaInicial}') ORDER BY CAST(codigo AS INT)`,
    )
    const medidoresPuntaFinal = await this.reportRepository.dataSource.execute(
      `${viewOf.getCogeneracion} where quantityID=${quantityID2} AND
      TimestampUTC =  dateadd(hour,6,'${fechaFinal}') ORDER BY CAST(codigo AS INT)`,
    )

    const medidoresRestoInicial = await this.reportRepository.dataSource.execute(
      `${viewOf.getCogeneracion} where quantityID=${quantityID} AND
      TimestampUTC =  dateadd(hour,6,'${fechaInicial}') ORDER BY CAST(codigo AS INT)`,
    )

    const medidoresRestoFinal = await this.reportRepository.dataSource.execute(
      `${viewOf.getCogeneracion} where quantityID=${quantityID} AND
      TimestampUTC =  dateadd(hour,6,'${fechaFinal}') ORDER BY CAST(codigo AS INT)`,
    )

    const horaPunta = await this.reportRepository.dataSource.execute(
      `${viewOf.getHorasPunta} where fechaInicial='${fechaInicial}' AND fechaFinal='${fechaFinal}'`,
    )

    const lecturasEnee = await this.reportRepository.dataSource.execute(
      `${viewOf.getLecurasEnee} where fechaInicial='${fechaInicial}'`,
    )


    const feriadosHn = await this.reportRepository.dataSource.execute(
      `${viewOf.getFeriadosHn} where estado=1`,
    )

    return {medidoresPuntaInicial, medidoresPuntaFinal, medidoresRestoInicial, medidoresRestoFinal, horaPunta, lecturasEnee, feriadosHn}
  }


  async enersa227(fechaInicial: string, fechaFinal: string) {
    const correlativo = await this.reportRepository.dataSource.execute(
      `${viewOf.getCorrelativos} where Fecha='${fechaInicial}'`,
    )

    const contrato = await this.reportRepository.dataSource.execute(
      `${viewOf.getVariablesContratos}`,

    );


    const cpi = await this.reportRepository.dataSource.execute(
      `${viewOf.Get_CPI} WHERE fechaInicial = '${fechaInicial}' and fechaFinal = '${fechaFinal}'`,

    );

    const ipc = await this.reportRepository.dataSource.execute(
      `${viewOf.Get_ipc} WHERE fechaInicial = '${fechaInicial}' and fechaFinal = '${fechaFinal}'`,

    );

    const combustible = await this.reportRepository.dataSource.execute(
      `${viewOf.getCombustibles} WHERE fechaInicial = '${fechaInicial}' and fechaFinal = '${fechaFinal}'`,

    );

    const cambioDolar = await this.reportRepository.dataSource.execute(
      `${viewOf.getDollarData} WHERE fechaInicial = '${fechaInicial}' and fechaFinal = '${fechaFinal}'`,

    );

    const euro = await this.reportRepository.dataSource.execute(
      `${viewOf.getEuroData} WHERE fechaInicial = '${fechaInicial}' and fechaFinal = '${fechaFinal}'`,

    );

    console.log("euro ", euro);

    return {correlativo, contrato, cpi, ipc, combustible, cambioDolar, euro};

  }

}
