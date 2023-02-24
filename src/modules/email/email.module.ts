import { Module } from '@nestjs/common'
import { EmailController } from './controllers/email.controller'

import EmailService from './services/email.service'
import EmailSchedulingService from './services/emailSchedule.service'

@Module({
    controllers: [EmailController],
    providers: [EmailService, EmailSchedulingService],
})
export class EmailModule {}
