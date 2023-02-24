import { Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'
import EmailDto from '../dto/email.dto'
import EmailService from './email.service'

@Injectable()
export default class EmailSchedulingService {
    constructor(
        private readonly emailService: EmailService,
        private readonly schedulerRegistry: SchedulerRegistry
    ) {}

    scheduleEmail(emailSchedule: EmailDto) {
        const job = new CronJob(emailSchedule.date, () => {
            this.emailService.sendMail({
                to: emailSchedule.recipient,
                subject: emailSchedule.subject,
                text: emailSchedule.content,
            })
        })

        this.schedulerRegistry.addCronJob(
            `${Date.now()}-${emailSchedule.subject}`,
            job
        )
        job.start()
    }
}
