import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'
import { createTransport } from 'nodemailer'
import * as Mail from 'nodemailer/lib/mailer'

@Injectable()
export default class EmailService {
    private nodemailerTransport: Mail
    private oAuth2Client: OAuth2Client
    constructor(private readonly configService: ConfigService) {
        const oAuth2Client = new google.auth.OAuth2(
            configService.get('email.clientId'),
            configService.get('email.clientSecret'),
            configService.get('email.redirectUri')
        )

        oAuth2Client.setCredentials({
            refresh_token: configService.get('email.refreshToken'),
        })

        this.oAuth2Client = oAuth2Client
    }

    async sendMail(options: Mail.Options) {
        try {
            const accessToken = await this.oAuth2Client.getAccessToken()
            this.nodemailerTransport = createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: this.configService.get('email.gmail'),
                    clientId: this.configService.get('email.clientId'),
                    clientSecret: this.configService.get('email.clientSecret'),
                    refreshToken: this.configService.get('email.refreshToken'),
                    accessToken: `${accessToken}`,
                },
            })
            await this.nodemailerTransport.sendMail(options)
            console.log('Send mail successfully')
        } catch (error) {
            console.log(error)
        }
    }
}
