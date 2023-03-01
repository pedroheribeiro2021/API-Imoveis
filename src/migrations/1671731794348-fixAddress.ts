import { MigrationInterface, QueryRunner } from "typeorm";

export class fixAddress1671731794348 implements MigrationInterface {
    name = 'fixAddress1671731794348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "number" character varying`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "value" TYPE numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "value" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "number" integer`);
    }

}
