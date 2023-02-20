import {
    Body, Controller, Post, UseGuards
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth/jwt-auth.guard'
import EmailScheduleDto from '../dto/emailSchedule.dto'
import EmailSchedulingService from '../services/emailSchedule.service'

@Controller('email')
export class EmailController {
    constructor(
        private readonly emailScheduleService: EmailSchedulingService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('schedule')
    async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
        this.emailScheduleService.scheduleEmail(emailSchedule)
    }
}
