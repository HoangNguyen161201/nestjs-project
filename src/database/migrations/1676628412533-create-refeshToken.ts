import { MigrationInterface, QueryRunner } from "typeorm";

export class createRefeshToken1676628412533 implements MigrationInterface {
    name = 'createRefeshToken1676628412533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
    }

}
