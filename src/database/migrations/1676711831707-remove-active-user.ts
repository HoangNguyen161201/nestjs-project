import { MigrationInterface, QueryRunner } from "typeorm";

export class removeActiveUser1676711831707 implements MigrationInterface {
    name = 'removeActiveUser1676711831707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "active" boolean`);
    }

}
