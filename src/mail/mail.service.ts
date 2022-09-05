import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationType } from '3dily-schema';
@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}
  send(
    to: string,
    type: string,
    content: { link: string; name: string; text: string },
  ) {
    console.log('context', content);
    const email = ({
      link,
      name,
      text,
      height,
    }: {
      link: string;
      text: string;
      name: string;
      height: number;
    }) => {
      return `<!DOCTYPE html>
    <html
        lang="en"
        style="margin: 0; padding: 0; box-sizing: border-box; height: 1200px; width: 1200px"
    >
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="http://fonts.cdnfonts.com/css/roboto" rel="stylesheet" />
            <title>Document</title>
        </head>
    
        <body style="font-family: roboto">
            <header style="width: 700px; margin: 0 auto; padding-block: 10px">
                <img
                    src="https://i.postimg.cc/Jhp3XMFM/Asset-3.png"
                    alt=""
                    style="width: 120px; height: 35.2px"
                />
                <h1 style="padding-block: 20px; font-size: 1.5rem; color: #000">Hello ${
                  name || 'Client'
                }</h1>
            </header>
            <div
                style="
                    overflow: hidden;
                    border-radius: 20px;
                    height: ${height || 500}px;
                    margin: 0 auto;
                    width: 700px;
                    background-color: black;
                "
            >
                <div style="height: 30%; width: 100%">
                    <div
                        style="
                            background: url('https://i.postimg.cc/4d4B1sSy/Half-Pipe1-Transparent-1-3.png');
                            height: 100%;
                            width: 20%;
                            background-repeat: no-repeat;
                            background-position: left;
                        "
                    ></div>
                </div>
                <div style="height: 40%; width: 100%; text-align: center">
                    <img
                        src="https://i.postimg.cc/BnLT4td2/Vector.png"
                        style="color: white; height: 30px; width: 30px; margin-top: 10px"
                        alt=""
                    />
                    <h1 style="color: white; font-size: 1rem; font-weight: 400; margin-top: 10px">
                        Hello ${name || 'Client'}
                    </h1>
                    <p
                        style="
                            line-height: 25px;
                            text-align: center;
                            width: 60%;
                            color: white;
                            font-size: 1rem;
                            margin: 25px auto;
                        "
                    >
                  ${text}
                    </p>
                    <button
                        style="
                            color: #ffff;
                            font-weight: bold;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            background-color: #8b60e7;
                        "
                    >
                        <a href="${
                          link || '#'
                        }" style="text-decoration: none; color: white">Go to Link</a>
                    </button>
                </div>
                <div style="height: 30%; width: 100%">
                    <div
                        style="
                            height: 100%;
                            width: 100%;
                            background-image: url(https://i.postimg.cc/T3wbQhRZ/Cube8-Transparent-1.png);
                            background-repeat: no-repeat;
                            margin-left: auto;
                            background-position: right;
                        "
                    ></div>
                </div>
            </div>
            <footer style="width: 700px; margin: 0 auto">
                <div
                    style="
                        margin-top: 20px;
                        padding-block: 10px;
                        border-bottom: 1px solid #d9d9d9;
                        border-top: 1px solid #d9d9d9;
                        text-align: center;
                    "
                >
                    <img
                        src="https://i.postimg.cc/Bvd36yL6/Vector-1.png"
                        style="object-fit: contain; height: 30px; margin: 10px; width: 30px"
                    />
                    <img
                        src="https://i.postimg.cc/0rgK0ZB2/Vector-2.png"
                        style="object-fit: contain; height: 30px; margin: 10px; width: 30px"
                    />
                    <img
                        src="https://i.postimg.cc/FHpgh56y/Vector-3.png"
                        style="height: 30px; margin: 10px; width: 20px"
                        width="10px"
                    />
                    <img
                        src="https://i.postimg.cc/bwrdS7JH/Vector-4.png"
                        style="object-fit: contain; height: 30px; margin: 10px; width: 30px"
                    />
                </div>
                <div style="">
                    <p style="text-align: center; padding-top: 20px; color: #000">
                        © 2022 3Dily. All rights reserved.
                    </p>
                    <ul
                        style="
                            list-style: none;
                            padding-block: 20px;
                            justify-content: center;
                            width: 90%;
                            margin: 0 auto;
                            text-align: center;
                        "
                    >
                        <li
                            style="
                                font-size: 16px;
                                margin-block: 10px;
                                padding-right: 10px;
                                margin-right: 10px;
                                border-right: 2px solid #d9d9d9;
                                color: #000;
                                display: inline-block;
                            "
                        >
                            Viale Bianca Maria 31, 20122 Milano, Italy
                        </li>
                        <li style="display: inline-block">
                            <a
                                style="
                                    font-size: 16px;
                                    margin-block: 10px;
                                    margin-right: 10px;
                                    padding-right: 10px;
                                    border-right: 2px solid #d9d9d9;
                                    color: #000;
                                "
                                href="#"
                                >+39 0276016146</a
                            >
                        </li>
                        <li style="display: inline-block; margin: 0">
                            <a
                                style="
                                    font-size: 16px;
                                    margin-block: 10px;
                                    margin-right: 10px;
                                    padding-right: 10px;
                                    border-right: 2px solid #d9d9d9;
                                    color: #2663ff;
                                "
                                href="#"
                                >+39 393 426 6993</a
                            >
                        </li>
                        <li style="display: inline-block; margin: 0">
                            <a
                                style="
                                    font-size: 16px;
                                    margin-block: 10px;
                                    margin-right: 10px;
                                    padding-right: 10px;
                                    border-right: 2px solid #d9d9d9;
                                    color: #2663ff;
                                "
                                href="#"
                                >info@3dily.com</a
                            >
                        </li>
                        <li style="display: inline-block; margin: 0">
                            <a
                                style="
                                    font-size: 16px;
                                    margin-block: 10px;
                                    margin-right: 10px;
                                    padding-right: 10px;
                                    border-right: 2px solid #d9d9d9;
                                    color: #000;
                                "
                                href="#"
                                >Home</a
                            >
                        </li>
                        <li style="display: inline-block; margin: 0">
                            <a style="font-size: 16px; margin-right: 10px; padding-right: 10px; color: #000"
                                >Terms of service</a
                            >
                        </li>
                    </ul>
                </div>
            </footer>
        </body>
    </html>
    `;
    };
    return this.mailService.sendMail({
      to,
      subject: '3Dily',
      from: process.env.MAIL_EMAIL,
      html: email({
        link: content.link,
        name: content.name,
        text: content.text,
        height: type === NotificationType.SIGNUP ? 700 : 500,
      }),
    });
  }
}
