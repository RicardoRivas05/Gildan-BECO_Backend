import {/* inject, */ BindingScope, injectable} from '@loopback/core/dist';
import {repository} from '@loopback/repository';
import {viewOf} from '../core/library/views.library';
import {reportRepository} from '../repositories/reports.repository';

@injectable({scope: BindingScope.TRANSIENT})
export class ReportService {
  constructor(
    @repository(reportRepository)
    public reportRepository: reportRepository,
  ) {}

  async getReportMedidores(
    id: number,
    fechaInicial: string,
    fechaFinal: string,
  ) {
    const inicial = await this.reportRepository.dataSource.execute(
      `${viewOf.getConsumoMedidores} where quantityID=${id} and TimestampUTC='${fechaInicial}' order by CAST(codigo AS INT)`,
    );

    const final = await this.reportRepository.dataSource.execute(
      `${viewOf.getConsumoMedidores} where quantityID=${id} and TimestampUTC='${fechaFinal}' order by CAST(codigo AS INT)`,
    );

    return {inicial, final};
  }
}
