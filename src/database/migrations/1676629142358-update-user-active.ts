import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserActive1676629142358 implements MigrationInterface {
    name = 'updateUserActive1676629142358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "active" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
    }

}
