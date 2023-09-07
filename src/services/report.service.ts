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
    return {cogeneracionDel, cogeneracionRec, medidoresSTUDel, medidoresSTURec};
  }

}
