import { Module } from '@nestjs/common';
import EmailService from './services/email.service';
import { EmailController } from './controllers/email.controller'; 
import EmailSchedulingService from './services/emailSchedule.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, EmailSchedulingService]
})
export class EmailModule {}
