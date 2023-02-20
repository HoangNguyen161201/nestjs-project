import { MigrationInterface, QueryRunner } from "typeorm";

export class createProduct1676817628207 implements MigrationInterface {
    name = 'createProduct1676817628207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "price" double precision NOT NULL, "urlImgs" text array NOT NULL DEFAULT '{}', "quantity" bigint NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
