import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1685620065027 implements MigrationInterface {
    name = 'UpdateEntities1685620065027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "term_permissions_included_term" ("termId_1" uuid NOT NULL, "termId_2" uuid NOT NULL, CONSTRAINT "PK_012a37b7e0f0ee36d830edba6fc" PRIMARY KEY ("termId_1", "termId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e7c462d4f5d98f78a1cb052e91" ON "term_permissions_included_term" ("termId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_f65b2aa88643c0998ce9618697" ON "term_permissions_included_term" ("termId_2") `);
        await queryRunner.query(`CREATE TABLE "term_included_in_the_terms_term" ("termId_1" uuid NOT NULL, "termId_2" uuid NOT NULL, CONSTRAINT "PK_c120f66feebd4593e3ef2a3d4fd" PRIMARY KEY ("termId_1", "termId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_72893400179da521e6ec35beed" ON "term_included_in_the_terms_term" ("termId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_84b2fa989a82cac5939ba58419" ON "term_included_in_the_terms_term" ("termId_2") `);
        await queryRunner.query(`CREATE TABLE "user_accepted_permissions_term" ("userId" uuid NOT NULL, "termId" uuid NOT NULL, CONSTRAINT "PK_7da11dc3bd4106c1721e747b5cc" PRIMARY KEY ("userId", "termId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_10595a49384f146b80471006c4" ON "user_accepted_permissions_term" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ed63cdc4605347adf7ad62578a" ON "user_accepted_permissions_term" ("termId") `);
        await queryRunner.query(`ALTER TABLE "logUserUpdate" DROP COLUMN "oldValue"`);
        await queryRunner.query(`ALTER TABLE "logUserUpdate" DROP COLUMN "newValue"`);
        await queryRunner.query(`ALTER TABLE "term" ADD "version" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "term" ADD "permissions" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logTermAcceptance" ADD "termVersion" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logTermAcceptance" ADD "permissionId" uuid`);
        await queryRunner.query(`ALTER TABLE "logTermAcceptance" ADD CONSTRAINT "FK_136c1db43da6575136413e8f605" FOREIGN KEY ("permissionId") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "term_permissions_included_term" ADD CONSTRAINT "FK_e7c462d4f5d98f78a1cb052e91b" FOREIGN KEY ("termId_1") REFERENCES "term"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "term_permissions_included_term" ADD CONSTRAINT "FK_f65b2aa88643c0998ce96186971" FOREIGN KEY ("termId_2") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "term_included_in_the_terms_term" ADD CONSTRAINT "FK_72893400179da521e6ec35beedb" FOREIGN KEY ("termId_1") REFERENCES "term"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "term_included_in_the_terms_term" ADD CONSTRAINT "FK_84b2fa989a82cac5939ba584192" FOREIGN KEY ("termId_2") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_accepted_permissions_term" ADD CONSTRAINT "FK_10595a49384f146b80471006c40" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_accepted_permissions_term" ADD CONSTRAINT "FK_ed63cdc4605347adf7ad62578ae" FOREIGN KEY ("termId") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_accepted_permissions_term" DROP CONSTRAINT "FK_ed63cdc4605347adf7ad62578ae"`);
        await queryRunner.query(`ALTER TABLE "user_accepted_permissions_term" DROP CONSTRAINT "FK_10595a49384f146b80471006c40"`);
        await queryRunner.query(`ALTER TABLE "term_included_in_the_terms_term" DROP CONSTRAINT "FK_84b2fa989a82cac5939ba584192"`);
        await queryRunner.query(`ALTER TABLE "term_included_in_the_terms_term" DROP CONSTRAINT "FK_72893400179da521e6ec35beedb"`);
        await queryRunner.query(`ALTER TABLE "term_permissions_included_term" DROP CONSTRAINT "FK_f65b2aa88643c0998ce96186971"`);
        await queryRunner.query(`ALTER TABLE "term_permissions_included_term" DROP CONSTRAINT "FK_e7c462d4f5d98f78a1cb052e91b"`);
        await queryRunner.query(`ALTER TABLE "logTermAcceptance" DROP CONSTRAINT "FK_136c1db43da6575136413e8f605"`);
        await queryRunner.query(`ALTER TABLE "logTermAcceptance" DROP COLUMN "permissionId"`);
        await queryRunner.query(`ALTER TABLE "logTermAcceptance" DROP COLUMN "termVersion"`);
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "permissions"`);
        await queryRunner.query(`ALTER TABLE "term" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "logUserUpdate" ADD "newValue" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logUserUpdate" ADD "oldValue" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed63cdc4605347adf7ad62578a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10595a49384f146b80471006c4"`);
        await queryRunner.query(`DROP TABLE "user_accepted_permissions_term"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_84b2fa989a82cac5939ba58419"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72893400179da521e6ec35beed"`);
        await queryRunner.query(`DROP TABLE "term_included_in_the_terms_term"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f65b2aa88643c0998ce9618697"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7c462d4f5d98f78a1cb052e91"`);
        await queryRunner.query(`DROP TABLE "term_permissions_included_term"`);
    }

}
