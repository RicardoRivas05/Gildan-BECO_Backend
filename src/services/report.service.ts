import { /* inject, */ BindingScope, injectable} from '@loopback/core/dist';
import {repository} from '@loopback/repository';
import moment from 'moment';
import {viewOf} from '../core/library/views.library';
import {reportRepository} from '../repositories/reports.repository';


@injectable({scope: BindingScope.TRANSIENT})
export class ReportService {
  constructor(
    @repository(reportRepository)
    public reportRepository: reportRepository,
  ) { }


  async dataMedidores(fechaInicial: string, fechaFinal: string) {

    //get MES Y aNIO
    let meses = [
      "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
      "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];
    let fecha = new Date(fechaInicial);
    let mes = meses[fecha.getMonth()];
    let anio = fecha.getFullYear();


    //BE-T577 //Hoja MT577
    let MT577P_G = 0;
    let MT577R_R = 0;


    //BE-T578 //Hoja MT578
    let MT578P_G = 0;
    let MT578R_R = 0;
    let EACT_O = 0;
    let totalEACT_O = 0;

    //Hoja EACT
    let EACT_N = 0;
    let EACT_C = 0;
    let EACT_D = 0;
    let EACT_E = 0;
    let EACT_F = 0;
    let EACT_G = 0;
    let EACT_H = 0;
    let EACT_AG = 0;
    let EACT_AE = 0;
    let EACT_AH: number = 0;
    let sumEACT_AH = 0;
    let EACT_AI = 0;
    let sumEACT_AI = 0;


    //hoja MTG1
    let MTG1P_G = 0;
    let MTG1R_R = 0;
    let MTG1P_H = 0;
    let MTG1R_S = 0;
    //hoja MTG2
    let MTG2P_G = 0;
    let MTG2R_R = 0;
    let MTG2P_H = 0;
    let MTG2R_S = 0;
    //hoja MTG3
    let MTG3P_G = 0;
    let MTG3R_R = 0;
    let MTG3P_H = 0;
    let MTG3R_S = 0;


    // hoja TOT
    let TOT_EACT_BET577 = 0

    //variables de factura 577
    let T577PActivaInicial = 0;
    let T577PActivaFinal = 0;
    let diferenciaT577PActiva = 0;
    let T577PReactivaInicial = 0;
    let T577PReactivaFinal = 0;
    let diferenciaT577PReactiva = 0;
    let demandaT577P = 0;

    //variables de factura 577 respaldo
    let T577RActivaInicial = 0;
    let T577RActivaFinal = 0;
    let diferenciaT577RActiva = 0;
    let T577RReactivaInicial = 0;
    let T577RReactivaFinal = 0;
    let diferenciaT577RReactiva = 0;
    let demandaT577R = 0;

    //VARIABLES FACTURA 578 Principal
    let activaInicialPT578 = 0;
    let activaFinalPT578 = 0;
    let diferenciaActivaPT578 = 0;
    let reactivaInicialPT578 = 0;
    let reactivaFinalPT578 = 0;
    let diferenciaReactivaPT578 = 0;
    let demandaT578P = 0;


    //VARIABLES FACTURA 578 Respaldo
    let activaInicialRT578 = 0;
    let activaFinalRT578 = 0;
    let diferenciaActivaRT578 = 0;
    let reactivaInicialRT578 = 0;
    let reactivaFinalRT578 = 0;
    let diferenciaReactivaRT578 = 0;
    let demandaT578R = 0;

    //Variables globales
    let sourceId: number[] = [8, 9, 17, 16];
    let fechaInicialMoment = moment(fechaInicial);
    fechaInicialMoment.add(15, 'minutes');
    let fechaInicial2 = fechaInicialMoment.format('YYYY-MM-DD HH:mm:ss.SSS');

    //variables para diferencias por intervalor en caso de roll over
    let diferenciaActivaT577P = 0;
    let diferenciaActivaT577R = 0;
    let diferenciaActivaT578P = 0;
    let diferenciaActivaT578R = 0;
    let diferenciaReactivaT577P = 0;
    let diferenciaReactivaT577R = 0;
    let diferenciaReactivaT578P = 0;
    let diferenciaReactivaT578R = 0;


    //resumen BECO-GILDAN
    let energiaActivaBG = 0
    let energiaReactivaBG = 0;
    let factorPotenciaBG = 0;
    let demandaBG = 0;



    console.log("mes ", mes)
    console.log("anio", anio)

    const Energy = await this.reportRepository.dataSource.execute(
      `${viewOf.getMedidores}   where (TimestampUTC = dateadd(hour,6,'${fechaInicial}') or TimestampUTC =  dateadd(hour,6,'${fechaFinal}'));`,
    );
    const dataM = await this.reportRepository.dataSource.execute(
      `${viewOf.getMedidores}   WHERE TimestampUTC BETWEEN dateadd(hour, 6, '${fechaInicial2}') AND dateadd(hour, 6, '${fechaFinal}');`,
    );

    const diferenciaIntervalos = await this.reportRepository.dataSource.execute(
      `${viewOf.getMedidores}   WHERE TimestampUTC BETWEEN dateadd(hour, 6, '${fechaInicial2}') AND dateadd(hour, 6, '${fechaFinal}') AND quantityID = 134;`,
    );

    const diferenciaIntervalosReactiva = await this.reportRepository.dataSource.execute(
      `${viewOf.getMedidores}   WHERE TimestampUTC BETWEEN dateadd(hour, 6, '${fechaInicial2}') AND dateadd(hour, 6, '${fechaFinal}') AND quantityID = 96;`,
    );

    //diferencias por rollover
    for (let i = 0; i < diferenciaIntervalos.length; i++) {
      //Activa
      if (diferenciaIntervalos[i].displayName === 'RIONANCESE.MT577_P') {
        diferenciaActivaT577P += diferenciaIntervalos[i].Value;
      } else if (diferenciaIntervalos[i].displayName === 'RIONANCESE.MT577_R') {
        diferenciaActivaT577R += diferenciaIntervalos[i].Value;
      } else if (diferenciaIntervalos[i].displayName === 'RIONANCESE.MT578_P') {
        diferenciaActivaT578P += diferenciaIntervalos[i].Value;
      } else if (diferenciaIntervalos[i].displayName === 'RIONANCESE.MT578_R') {
        diferenciaActivaT578R += diferenciaIntervalos[i].Value;
      }
    }
    //Reactiva
    for (let i = 0; i < diferenciaIntervalosReactiva.length; i++) {

      if (diferenciaIntervalosReactiva[i].displayName === 'RIONANCESE.MT577_P') {
        diferenciaReactivaT577P += diferenciaIntervalosReactiva[i].Value;
      } else if (diferenciaIntervalosReactiva[i].displayName === 'RIONANCESE.MT577_R') {
        diferenciaReactivaT577R += diferenciaIntervalosReactiva[i].Value;
      }
      else if (diferenciaIntervalosReactiva[i].displayName === 'RIONANCESE.MT578_P') {
        diferenciaReactivaT578P += diferenciaIntervalosReactiva[i].Value;
      } else if (diferenciaIntervalosReactiva[i].displayName === 'RIONANCESE.MT578_R') {
        diferenciaReactivaT578R += diferenciaIntervalosReactiva[i].Value;
      }
    }

    //lecturas iniciales y finales
    for (let i = 0; i < Energy.length; i++) {
      //T577 PTINCIPAL ACTIVA
      if (Energy[i].displayName === 'RIONANCESE.MT577_P' && Energy[i].quantityID === 129) {
        if (i === 0) {
          T577PActivaInicial = Energy[0].Value;
          T577PActivaFinal = Energy[1].Value;
          if (T577PActivaFinal < T577PActivaInicial) {
            diferenciaT577PActiva = diferenciaActivaT577P;
          } else {
            diferenciaT577PActiva = T577PActivaFinal - T577PActivaInicial;
          }

        } else {
          T577PActivaInicial = Energy[i - 1].Value;
          T577PActivaFinal = Energy[i].Value;
          if (T577PActivaFinal < T577PActivaInicial) {
            diferenciaT577PActiva = diferenciaActivaT577P;
          } else {
            diferenciaT577PActiva = T577PActivaFinal - T577PActivaInicial;
          }
        }
      }

      //T577 PTINCIPAL REACTIVA
      if (Energy[i].displayName === 'RIONANCESE.MT577_P' && Energy[i].quantityID === 91) {
        if (i === 0) {
          T577PReactivaInicial = Energy[0].Value;
          T577PReactivaFinal = Energy[1].Value;
          if (T577PReactivaFinal < T577PReactivaInicial) {
            diferenciaT577PReactiva = diferenciaReactivaT577P;
          } else {
            diferenciaT577PReactiva = T577PReactivaFinal - T577PReactivaInicial;
          }

        } else {
          T577PReactivaInicial = Energy[i - 1].Value;
          T577PReactivaFinal = Energy[i].Value;
          if (T577PReactivaFinal < T577PReactivaInicial) {
            diferenciaT577PReactiva = diferenciaReactivaT577P;
          } else {
            diferenciaT577PReactiva = T577PReactivaFinal - T577PReactivaInicial;
          }
        }
      }

      //577 respaldo ACTIVA
      if (Energy[i].displayName === 'RIONANCESE.MT577_R' && Energy[i].quantityID === 129) {
        if (i === 0) {
          T577RActivaInicial = Energy[0].Value;
          T577RActivaFinal = Energy[1].Value;
          if (T577RActivaFinal < T577RActivaInicial) {
            diferenciaT577RActiva = diferenciaActivaT577R;
          } else {
            diferenciaT577RActiva = T577RActivaFinal - T577RActivaInicial;
          }

        } else {
          T577RActivaInicial = Energy[i - 1].Value;
          T577RActivaFinal = Energy[i].Value;
          if (T577RActivaFinal < T577RActivaInicial) {
            diferenciaT577RActiva = diferenciaActivaT577R;
          } else {
            diferenciaT577RActiva = T577RActivaFinal - T577RActivaInicial;
          }
        }

      }
      //577 respaldo REACTIVA
      if (Energy[i].displayName === 'RIONANCESE.MT577_R' && Energy[i].quantityID === 91) {
        if (i === 0) {
          T577RReactivaInicial = Energy[0].Value;
          T577RReactivaFinal = Energy[1].Value;
          if (T577RReactivaFinal < T577RReactivaInicial) {
            diferenciaT577RReactiva = diferenciaReactivaT577R;
          } else {
            diferenciaT577RReactiva = T577RReactivaFinal - T577RReactivaInicial;
          }

        } else {
          T577RReactivaInicial = Energy[i - 1].Value;
          T577RReactivaFinal = Energy[i].Value;
          if (T577RReactivaFinal < T577RReactivaInicial) {
            diferenciaT577RReactiva = diferenciaReactivaT577R;
          } else {
            diferenciaT577RReactiva = T577RReactivaFinal - T577RReactivaInicial;
          }
        }
      }


      //T578 PRINCIPAL ACTIVA
      if (Energy[i].displayName === 'RIONANCESE.MT578_P' && Energy[i].quantityID === 129) {
        if (i === 0) {
          activaInicialPT578 = Energy[0].Value;
          activaFinalPT578 = Energy[1].Value;
          if (activaFinalPT578 < activaInicialPT578) {
            diferenciaActivaPT578 = diferenciaActivaT578P;
          } else {
            diferenciaActivaPT578 = activaFinalPT578 - activaInicialPT578;
          }

        } else {
          activaInicialPT578 = Energy[i - 1].Value;
          activaFinalPT578 = Energy[i].Value;
          if (activaFinalPT578 < activaInicialPT578) {
            diferenciaActivaPT578 = diferenciaActivaT578P;
          } else {
            diferenciaActivaPT578 = activaFinalPT578 - activaInicialPT578;
          }
        }
      }
      //T578 PRINCIPAL REACTIVA
      if (Energy[i].displayName === 'RIONANCESE.MT578_P' && Energy[i].quantityID === 91) {
        if (i === 0) {
          reactivaInicialPT578 = Energy[0].Value;
          reactivaFinalPT578 = Energy[1].Value;
          if (reactivaFinalPT578 < reactivaInicialPT578) {
            diferenciaReactivaPT578 = diferenciaReactivaT578P;
          } else {
            diferenciaReactivaPT578 = reactivaFinalPT578 - reactivaInicialPT578;
          }

        } else {
          reactivaInicialPT578 = Energy[i - 1].Value;
          reactivaFinalPT578 = Energy[i].Value;
          if (reactivaFinalPT578 < reactivaInicialPT578) {
            diferenciaReactivaPT578 = diferenciaReactivaT578P;
          } else {
            diferenciaReactivaPT578 = reactivaFinalPT578 - reactivaInicialPT578;
          }
        }
      }

      //RESPALDO T578 ACTIVA
      if (Energy[i].displayName === 'RIONANCESE.MT578_R' && Energy[i].quantityID === 129) {
        if (i === 0) {
          activaInicialRT578 = Energy[0].Value;
          activaFinalRT578 = Energy[1].Value;
          if (activaFinalRT578 < activaInicialRT578) {
            diferenciaActivaRT578 = diferenciaActivaT578R;
          } else {
            diferenciaActivaRT578 = activaFinalRT578 - activaInicialRT578;
          }

        } else {
          activaInicialRT578 = Energy[i - 1].Value;
          activaFinalRT578 = Energy[i].Value;
          if (activaFinalRT578 < activaInicialRT578) {
            diferenciaActivaRT578 = diferenciaActivaT578R;
          } else {
            diferenciaActivaRT578 = activaFinalRT578 - activaInicialRT578;
          }
        }
      }
      //RESPALDO T578 REACTIVA
      if (Energy[i].displayName === 'RIONANCESE.MT578_R' && Energy[i].quantityID === 91) {
        if (i === 0) {
          reactivaInicialRT578 = Energy[0].Value;
          reactivaFinalRT578 = Energy[1].Value;
          if (reactivaFinalRT578 < reactivaInicialRT578) {
            diferenciaReactivaRT578 = diferenciaReactivaT578R;
          } else {
            diferenciaReactivaRT578 = reactivaFinalRT578 - reactivaInicialRT578;
          }

        } else {
          reactivaInicialRT578 = Energy[i - 1].Value;
          reactivaFinalRT578 = Energy[i].Value;
          if (reactivaFinalRT578 < reactivaInicialRT578) {
            diferenciaReactivaRT578 = diferenciaReactivaT578R;
          } else {
            diferenciaReactivaRT578 = reactivaFinalRT578 - reactivaInicialRT578;
          }
        }
      }
    }



    //demandas
    for (let i = 0; i < sourceId.length; i++) {
      let id = sourceId[i];
      const demanda = await this.reportRepository.dataSource.execute(
        `${viewOf.getDemanda}   WHERE TimestampUTC BETWEEN dateadd(hour, 6, '${fechaInicial}') AND dateadd(hour, 6, '${fechaFinal}')  AND sourceID =${id} AND quantityID=107 ORDER BY Value DESC;`,
      )
      let value = demanda[0].Value;
      if (demanda[0].displayName === 'RIONANCESE.MT577_P') {
        demandaT577P = value;
      } else if (demanda[0].displayName === 'RIONANCESE.MT577_R') {
        demandaT577R = value;
      } else if (demanda[0].displayName === 'RIONANCESE.MT578_P') {
        demandaT578P = value;
      } else if (demanda[0].displayName === 'RIONANCESE.MT578_R') {
        demandaT578R = value;
      }
    }


    //GILDAN-BECO
    //BE-T577
    for (let i = 0; i < dataM.length; i++) {
      if (dataM[i].displayName === 'RIONANCESE.MT577_P' && dataM[i].quantityID === 134) {
        MT577P_G += dataM[i].Value;
      }
      if (dataM[i].displayName === 'RIONANCESE.MT577_R' && dataM[i].quantityID === 134) {
        MT577R_R += dataM[i].Value;
      }
      EACT_N = (MT577P_G + MT577R_R) / 2;

      //BE-T578
      if (dataM[i].displayName === 'RIONANCESE.MT578_P' && dataM[i].quantityID === 134) {
        MT578P_G += dataM[i].Value;
      } else if (dataM[i].displayName === 'RIONANCESE.MT578_R' && dataM[i].quantityID === 134) {
        MT578R_R += dataM[i].Value;
      }
      // console.log("MT578R_R--------------", MT578R_R)
      EACT_O = (MT578P_G + MT578R_R) / 2;

      //AG SUMA DE N+O
      EACT_AG = EACT_N + EACT_O;


      //CALCULANDO COLUMNA C DE EACT
      if (dataM[i].displayName === 'BECO.MTG1_P' && dataM[i].quantityID === 134) {
        MTG1P_G += dataM[i].Value;
      }
      if (dataM[i].displayName === 'BECO.MTG1_R' && dataM[i].quantityID === 134) {
        MTG1R_R += dataM[i].Value;
      }
      EACT_C = (MTG1P_G + MTG1R_R) / 2;


      //CALCULANDO COLUMNA D DE EACT
      if (dataM[i].displayName === 'BECO.MTG1_P' && dataM[i].quantityID === 144) {
        MTG1P_H += dataM[i].Value;

      }
      if (dataM[i].displayName === 'BECO.MTG1_R' && dataM[i].quantityID === 144) {
        MTG1R_S += dataM[i].Value;

      }
      EACT_D = (MTG1P_H + MTG1R_S) / 2;


      //CALCULANDO COLUMNA E DE EACT
      if (dataM[i].displayName === 'BECO.MTG2_P' && dataM[i].quantityID === 144) {
        MTG2P_G += dataM[i].Value;
      }
      if (dataM[i].displayName === 'BECO.MTG2_R' && dataM[i].quantityID === 144) {
        MTG2R_R += dataM[i].Value;
      }
      EACT_E = (MTG2P_G + MTG2R_R) / 2;

      //CALCULANDO COLUMNA F DE EACT
      if (dataM[i].displayName === 'BECO.MTG2_P' && dataM[i].quantityID === 139) {
        MTG2P_H += dataM[i].Value;
      }
      if (dataM[i].displayName === 'BECO.MTG2_R' && dataM[i].quantityID === 139) {
        MTG2R_S += dataM[i].Value;
      }
      EACT_F = (MTG2P_H + MTG2R_S) / 2;

      //CALCULANDO COLUMNA G DE EACT
      if (dataM[i].displayName === 'BECO.MTG3_P' && dataM[i].quantityID === 144) {
        MTG3P_G += dataM[i].Value;
      }
      if (dataM[i].displayName === 'BECO.MTG3_R' && dataM[i].quantityID === 134) {
        MTG3R_R += dataM[i].Value;
      }
      EACT_G = (MTG3P_G + MTG3R_R) / 2;
      //CALCULANDO COLUMNA H DE EACT
      if (dataM[i].displayName === 'BECO.MTG3_P' && dataM[i].quantityID === 144) {
        MTG3P_H += dataM[i].Value;
      }
      if (dataM[i].displayName === 'BECO.MTG3_R' && dataM[i].quantityID === 144) {
        MTG3R_S += dataM[i].Value;
      }
      EACT_H = (MTG3P_H + MTG3R_S) / 2;
      EACT_AE = (EACT_C - EACT_D) + (EACT_E - EACT_F) + (EACT_G - EACT_H);

      //caculando la col AH de la hoja EAC
      if (EACT_AE != 0) {
        EACT_AH = Math.max(0, Math.min(EACT_AE, EACT_AG));
        sumEACT_AH += EACT_AH;
      }
      //CALCUANDO LA COL AI DE LA HOJA EACT
      if (EACT_AG == 0) {
        EACT_AI = 0;
        sumEACT_AI += EACT_AI;
        // } else {
        //   EACT_AI = (EACT_AH * EACT_N) / EACT_AG;
        //   sumEACT_AI += EACT_AI;
      }

      console.log("summmmm AI ", sumEACT_AI);


      //577 ENEE
      if (EACT_AE > 0) {

      }
    }




    energiaActivaBG = (diferenciaActivaT577P + diferenciaActivaT577R) / 2 + (diferenciaActivaPT578 + diferenciaActivaRT578) / 2;
    energiaReactivaBG = (diferenciaReactivaT577P + diferenciaReactivaT577R) / 2 + (diferenciaReactivaPT578 + diferenciaReactivaRT578) / 2;
    demandaBG = (demandaT577P + demandaT577R) / 2 + (demandaT578P + demandaT578R) / 2;

    //ENERGIA ACTIVA MEDIDOR 7577 BECO
    TOT_EACT_BET577 = sumEACT_AH;
    dataM[0].energiaActivaBecoT577 = TOT_EACT_BET577;

    //reporte T577 principal
    //energia activa
    dataM[0].energiaActivaInicialPT577 = T577PActivaInicial;
    dataM[0].energiaActivaFinalPT577 = T577PActivaFinal;
    dataM[0].diferenciaEnergiaActivaPT577 = diferenciaT577PActiva;
    //Energia Reactiva
    dataM[0].energiaReactivaInicialPT577 = T577PReactivaInicial;
    dataM[0].energiaReactivaFinalPT577 = T577PReactivaFinal;
    dataM[0].diferenciaEnergiaReactivaPT577 = diferenciaT577PReactiva;
    dataM[0].demandaT577P = demandaT577P;

    //reporte T577 Respaldo
    //energia activa
    dataM[0].energiaActivaInicialRT577 = T577RActivaInicial;
    dataM[0].energiaActivaFinalRT577 = T577RActivaFinal;
    dataM[0].diferenciaEnergiaActivaRT577 = diferenciaT577RActiva;
    //Energia Reactiva
    dataM[0].energiaReactivaInicialRT577 = T577RReactivaInicial;
    dataM[0].energiaReactivaFinalRT577 = T577RReactivaFinal;
    dataM[0].diferenciaEnergiaReactivaRT577 = diferenciaT577RReactiva;
    dataM[0].demandaT577R = demandaT577R;


    //reporte T578 principal
    //Activa
    dataM[0].activaInicialPT578 = activaInicialPT578;
    dataM[0].activaFinalPT578 = activaFinalPT578;
    dataM[0].diferenciaActivaPT578 = diferenciaActivaPT578;
    //Reactiva
    dataM[0].reactivaInicialPT578 = reactivaInicialPT578;
    dataM[0].reactivaFinalPT578 = reactivaFinalPT578;
    dataM[0].diferenciaReactivaPT578 = diferenciaReactivaPT578;
    dataM[0].demandaT578P = demandaT578P;


    //reporte T578 Respaldo
    //Activa
    dataM[0].activaInicialRT578 = activaInicialRT578;
    dataM[0].activaFinalRT578 = activaFinalRT578;
    dataM[0].diferenciaActivaRT578 = diferenciaActivaRT578;
    //Reactiva
    dataM[0].reactivaInicialRT578 = reactivaInicialRT578;
    dataM[0].reactivaFinalRT578 = reactivaFinalRT578;
    dataM[0].diferenciaReactivaRT578 = diferenciaReactivaRT578;
    dataM[0].demandaT578R = demandaT578R;


    //resumen BECO GILDAN
    dataM[0].energiaActivaBG = energiaActivaBG;
    dataM[0].energiaReactivaBG = energiaReactivaBG;
    dataM[0].demandaBG = demandaBG;

    //meses y anio
    dataM[0].mes = mes;
    dataM[0].anio = anio;

    dataM[0].fechaInicio = fechaInicial;
    dataM[0].fechaFin = fechaFinal;

    return {dataM}
  }

}
