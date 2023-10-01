import { /* inject, */ BindingScope, injectable} from '@loopback/core/dist';
var nodemailer = require('nodemailer');

@injectable({scope: BindingScope.TRANSIENT})
export class NotifyService {
  constructor() { }

  async EmailNotification(email: string, subject: string, content: string, atachment?: any) {
    let isSend: boolean = false;
    var mailOptions: any;
    var transporter = nodemailer.createTransport({
      service: 'outlook',
      port: 587,
      secure: false,
      auth: {
        user: 'jramos@falconingenieria.com',
        pass: 'Estemporal1!'
      }
    });
    if (atachment) {
      mailOptions = {
        from: 'jramos@falconingenieria.com',
        to: `${email}`,
        subject: `${subject}`,
        text: `${content}`,
        attachments: [
          {
            __filename: 'Factura-consumo.pdf',
            path: atachment
          }]
      };

    } else {
      mailOptions = {
        from: 'jramos@falconingenieria.com',
        to: `${email}`,
        subject: `${subject}`,
        text: `${content}`,
      };

    }

    await transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
        isSend = false;
      } else {
        console.log('Email enviado: ' + info.response);
        isSend = true;
      }
    });

    return isSend;


  }

}
