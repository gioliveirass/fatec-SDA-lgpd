import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTermToPermissionRelation1686258379249 implements MigrationInterface {
    name = 'UpdateTermToPermissionRelation1686258379249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" ADD "termId" uuid`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_ef29249f1bf09f06ac409726c9b" FOREIGN KEY ("termId") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_ef29249f1bf09f06ac409726c9b"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "termId"`);
    }

}
