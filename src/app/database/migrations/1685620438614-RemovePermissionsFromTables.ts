import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePermissionsFromTables1685620438614 implements MigrationInterface {
    name = 'RemovePermissionsFromTables1685620438614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "permissions"`);
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "term" ADD "version" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "term" ADD "version" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "term" ADD "permissions" character varying NOT NULL`);
    }

}
