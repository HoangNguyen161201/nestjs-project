import { OnQueueActive, Process, Processor } from '@nestjs/bull'
import EmailScheduleDto from 'src/modules/email/dto/emailSchedule.dto'
import EmailService from 'src/modules/email/services/email.service'

@Processor('send-mail')
export class SendMail {
    constructor(private emailService: EmailService) {}
    @OnQueueActive()
    onActive(options) {
        console.log(options.data)
    }

    @Process('register')
    async registerMail(options) {
        const data: EmailScheduleDto = options?.data
        await this.emailService.sendMail({ ...data, to: data.recipient })
    }
}
