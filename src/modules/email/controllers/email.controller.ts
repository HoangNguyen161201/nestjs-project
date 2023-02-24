import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth/jwt-auth.guard'
import EmailDto from '../dto/email.dto'
import EmailSchedulingService from '../services/emailSchedule.service'

@Controller('email')
export class EmailController {
    constructor(
        private readonly emailScheduleService: EmailSchedulingService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('schedule')
    async scheduleEmail(@Body() emailSchedule: EmailDto) {
        this.emailScheduleService.scheduleEmail(emailSchedule)
    }
}
