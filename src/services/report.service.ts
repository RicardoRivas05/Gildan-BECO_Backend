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


  async dataMedidores(fechaInicial: string, fechaFinal: string) {

    const formatoHn = (number: any) => {
      const exp = /(\d)(?=(\d{3})+(?!\d))/g;
      const rep = '$1,';
      return number.toString().replace(exp, rep);
    }

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

    //variables de factura 577 respaldo
    let T577RActivaInicial = 0;
    let T577RActivaFinal = 0;
    let diferenciaT577RActiva = 0;
    let T577RReactivaInicial = 0;
    let T577RReactivaFinal = 0;
    let diferenciaT577RReactiva = 0;


    console.log("Fecha Inicial ", fechaInicial)
    console.log("Fecha Final", fechaFinal)
    const Energy = await this.reportRepository.dataSource.execute(
      `${viewOf.getMedidores}   where (TimestampUTC = dateadd(hour,6,'${fechaInicial}') or TimestampUTC =  dateadd(hour,6,'${fechaFinal}'));`,
    )
    const dataM = await this.reportRepository.dataSource.execute(
      `${viewOf.getMedidores}   WHERE TimestampUTC BETWEEN dateadd(hour, 6, '${fechaInicial}') AND dateadd(hour, 6, '${fechaFinal}');`,
    )

    console.log(Energy.length);
    for (let i = 0; i < Energy.length; i++) {
      console.log("--------------------iiiii ", i)
      console.log(Energy[i]);
      if (Energy[i].displayName === 'RIONANCESE.MT577_P' && Energy[i].quantityID === 129) {
        if (i === 0) {
          T577PActivaInicial = Energy[0].Value;
          T577PActivaFinal = Energy[1].Value;
          diferenciaT577PActiva = T577PActivaFinal - T577PActivaInicial;
          T577PActivaInicial = formatoHn(Number(T577PActivaInicial.toFixed(2)));
          T577PActivaFinal = formatoHn(Number(T577PActivaFinal.toFixed(2)));
          diferenciaT577PActiva = formatoHn(Number(diferenciaT577PActiva.toFixed(2)));
        } else {
          T577PActivaInicial = Energy[i - 1].Value;
          T577PActivaFinal = Energy[i].Value;
          diferenciaT577PActiva = T577PActivaFinal - T577PActivaInicial;
          T577PActivaInicial = formatoHn(Number(T577PActivaInicial.toFixed(2)));
          T577PActivaFinal = formatoHn(Number(T577PActivaFinal.toFixed(2)));
          diferenciaT577PActiva = formatoHn(Number(diferenciaT577PActiva.toFixed(2)));
        }
      }

      if (Energy[i].displayName === 'RIONANCESE.MT577_P' && Energy[i].quantityID === 91) {
        if (i === 0) {
          T577PReactivaInicial = Energy[0].Value;
          T577PReactivaFinal = Energy[1].Value;
          diferenciaT577PReactiva = T577PReactivaFinal - T577PReactivaInicial;
          T577PReactivaInicial = formatoHn(Number(T577PReactivaInicial.toFixed(2)));
          T577PReactivaFinal = formatoHn(Number(T577PReactivaFinal.toFixed(2)));
          diferenciaT577PReactiva = formatoHn(Number(diferenciaT577PReactiva.toFixed(2)));
        } else {


          T577PReactivaInicial = Energy[i - 1].Value;
          T577PReactivaFinal = Energy[i].Value;
          diferenciaT577PReactiva = T577PReactivaFinal - T577PReactivaInicial;
          T577PReactivaInicial = formatoHn(Number(T577PReactivaInicial.toFixed(2)));
          T577PReactivaFinal = formatoHn(Number(T577PReactivaFinal.toFixed(2)));
          diferenciaT577PReactiva = formatoHn(Number(diferenciaT577PReactiva.toFixed(2)));

        }
      }


      //577 respaldo
      if (Energy[i].displayName === 'RIONANCESE.MT577_R' && Energy[i].quantityID === 129) {
        if (i === 0) {
          T577RActivaInicial = Energy[0].Value;
          T577RActivaFinal = Energy[1].Value;
          diferenciaT577RActiva = T577RActivaFinal - T577RActivaInicial;
          T577RActivaInicial = formatoHn(Number(T577RActivaInicial.toFixed(2)));
          T577RActivaFinal = formatoHn(Number(T577RActivaFinal.toFixed(2)));
          diferenciaT577RActiva = formatoHn(Number(diferenciaT577RActiva.toFixed(2)));
        } else {
          T577RActivaInicial = Energy[i - 1].Value;
          T577RActivaFinal = Energy[i].Value;
          diferenciaT577RActiva = T577RActivaFinal - T577RActivaInicial;
          T577RActivaInicial = formatoHn(Number(T577RActivaInicial.toFixed(2)));
          T577RActivaFinal = formatoHn(Number(T577RActivaFinal.toFixed(2)));
          diferenciaT577RActiva = formatoHn(Number(diferenciaT577RActiva.toFixed(2)));
        }

      }

      if (Energy[i].displayName === 'RIONANCESE.MT577_R' && Energy[i].quantityID === 91) {
        if (i === 0) {
          T577RReactivaInicial = Energy[0].Value;
          T577RReactivaFinal = Energy[1].Value;
          diferenciaT577RReactiva = T577RReactivaFinal - T577RReactivaInicial;
          T577RReactivaInicial = formatoHn(Number(T577RReactivaInicial.toFixed(2)));
          T577RReactivaFinal = formatoHn(Number(T577RReactivaFinal.toFixed(2)));
          diferenciaT577RReactiva = formatoHn(Number(diferenciaT577RReactiva.toFixed(2)));
        } else {
          T577RReactivaInicial = Energy[i - 1].Value;
          T577RReactivaFinal = Energy[i].Value;
          diferenciaT577RReactiva = T577RReactivaFinal - T577RReactivaInicial;
          T577RReactivaInicial = formatoHn(Number(T577RReactivaInicial.toFixed(2)));
          T577RReactivaFinal = formatoHn(Number(T577RReactivaFinal.toFixed(2)));
          diferenciaT577RReactiva = formatoHn(Number(diferenciaT577RReactiva.toFixed(2)));

        }
      }




    }

    //GILDAN-BECO
    //BE-T577
    for (let i = 0; i < dataM.length; i++) {

      if (dataM[i].displayName === 'RIONANCESE.MT577_P' && dataM[i].quantityID === 129) {
        MT577P_G += dataM[i].Value;
      }
      if (dataM[i].displayName === 'RIONANCESE.MT577_R' && dataM[i].quantityID === 129) {
        MT577R_R += dataM[i].Value;
      }
      EACT_N = (MT577P_G + MT577R_R) / 2;

      //BE-T578
      if (dataM[i].displayName === 'RIONANCESE.MT578_P' && dataM[i].quantityID === 129) {
        MT578P_G += dataM[i].Value;
      } else if (dataM[i].displayName === 'RIONANCESE.MT578_R' && dataM[i].quantityID === 129) {
        MT578R_R += dataM[i].Value;
      }
      EACT_O = (MT578P_G + MT577R_R) / 2;

      //AG SUMA DE N+O
      EACT_AG = EACT_N + EACT_O;


      //CALCULANDO COLUMNA C DE EACT
      if (dataM[i].displayName === 'BECO.MTG1_P' && dataM[i].quantityID === 129) {
        MTG1P_G += dataM[i].Value;

      }
      if (dataM[i].displayName === 'BECO.MTG1_R' && dataM[i].quantityID === 129) {
        MTG1R_R += dataM[i].Value;

      }
      EACT_C = (MTG1P_G + MTG1R_R) / 2;


      //CALCULANDO COLUMNA D DE EACT
      if (dataM[i].displayName === 'BECO.MTG1_P' && dataM[i].quantityID === 139) {
        MTG1P_H += dataM[i].Value;

      }
      if (dataM[i].displayName === 'BECO.MTG1_R' && dataM[i].quantityID === 139) {
        MTG1R_S += dataM[i].Value;

      }
      EACT_D = (MTG1P_H + MTG1R_S) / 2;


      //CALCULANDO COLUMNA E DE EACT
      if (dataM[i].displayName === 'BECO.MTG2_P' && dataM[i].quantityID === 129) {
        MTG2P_G += dataM[i].Value;
      }
      if (dataM[i].displayName === 'BECO.MTG2_R' && dataM[i].quantityID === 129) {
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
      if (dataM[i].displayName === 'BECO.MTG3_P' && dataM[i].quantityID === 129) {
        MTG3P_G += dataM[i].Value;
      }
      if (dataM[i].displayName === 'BECO.MTG3_R' && dataM[i].quantityID === 129) {
        MTG3R_R += dataM[i].Value;
      }
      EACT_G = (MTG3P_G + MTG3R_R) / 2;
      //CALCULANDO COLUMNA H DE EACT
      if (dataM[i].displayName === 'BECO.MTG3_P' && dataM[i].quantityID === 139) {
        MTG3P_H += dataM[i].Value;
      }
      if (dataM[i].displayName === 'BECO.MTG3_R' && dataM[i].quantityID === 139) {
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
      } else {
        EACT_AI = (EACT_AH * EACT_N) / EACT_AG;
        sumEACT_AI += EACT_AI;
      }
    }

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

    //reporte T577 Respaldop
    //energia activa
    dataM[0].energiaActivaInicialRT577 = T577RActivaInicial;
    dataM[0].energiaActivaFinalRT577 = T577RActivaFinal;
    dataM[0].diferenciaEnergiaActivaRT577 = diferenciaT577RActiva;
    //Energia Reactiva
    dataM[0].energiaReactivaInicialRT577 = T577RReactivaInicial;
    dataM[0].energiaReactivaFinalRT577 = T577RReactivaFinal;
    dataM[0].diferenciaEnergiaReactivaRT577 = diferenciaT577RReactiva;


    return {dataM}
  }

}
