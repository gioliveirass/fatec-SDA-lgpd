import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIncludedInTheTerms1685622526869 implements MigrationInterface {
    name = 'UpdateIncludedInTheTerms1685622526869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "term" ADD "version" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "term" ADD "version" character varying NOT NULL`);
    }

}
