import { BullModuleOptions, SharedBullAsyncConfiguration } from '@nestjs/bull'
import { ConfigModule, ConfigService } from '@nestjs/config'

export const bullAsyncConfig: SharedBullAsyncConfiguration = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService
    ): Promise<BullModuleOptions> => {
        return {
            redis: {
                host: configService.get('redis.host'),
                port: configService.get('redis.port'),
            },
        }
    },
}
