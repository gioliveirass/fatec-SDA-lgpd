import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1685251609949 implements MigrationInterface {
    name = 'CreateTables1685251609949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "term" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_55b0479f0743f2e5d5ec414821e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "email" character varying NOT NULL, "cellphone" character varying NOT NULL, "passwordHash" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "logTermAcceptance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "accept" boolean NOT NULL, "userId" uuid, "termId" uuid, CONSTRAINT "PK_2770824b82946b8af4fdf9cea98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "logUserUpdate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "attribute" character varying NOT NULL, "oldValue" character varying NOT NULL, "newValue" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_8c55d6f94cd441e5bf4a49af2d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "term_users_who_accepted_user" ("termId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_2d86ce9c1297dcc1a964763eb1c" PRIMARY KEY ("termId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea9f7995c6784a6d9256c860c4" ON "term_users_who_accepted_user" ("termId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0558e725c04685b5361dcedd34" ON "term_users_who_accepted_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_accepted_terms_term" ("userId" uuid NOT NULL, "termId" uuid NOT NULL, CONSTRAINT "PK_7e436fcd2a1c2bf241553ac4dea" PRIMARY KEY ("userId", "termId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fa69e7df9d1d9871525db65053" ON "user_accepted_terms_term" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_170f5d4d665727a0c71bbabbf4" ON "user_accepted_terms_term" ("termId") `);
        await queryRunner.query(`ALTER TABLE "logTermAcceptance" ADD CONSTRAINT "FK_cc55fa6b7d539cffc0e84124195" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logTermAcceptance" ADD CONSTRAINT "FK_de1b38373b95b8402c27b662ae6" FOREIGN KEY ("termId") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logUserUpdate" ADD CONSTRAINT "FK_204b801c7e3bfd6e8742a63fe8e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "term_users_who_accepted_user" ADD CONSTRAINT "FK_ea9f7995c6784a6d9256c860c42" FOREIGN KEY ("termId") REFERENCES "term"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "term_users_who_accepted_user" ADD CONSTRAINT "FK_0558e725c04685b5361dcedd34c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_accepted_terms_term" ADD CONSTRAINT "FK_fa69e7df9d1d9871525db65053c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_accepted_terms_term" ADD CONSTRAINT "FK_170f5d4d665727a0c71bbabbf4b" FOREIGN KEY ("termId") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_accepted_terms_term" DROP CONSTRAINT "FK_170f5d4d665727a0c71bbabbf4b"`);
        await queryRunner.query(`ALTER TABLE "user_accepted_terms_term" DROP CONSTRAINT "FK_fa69e7df9d1d9871525db65053c"`);
        await queryRunner.query(`ALTER TABLE "term_users_who_accepted_user" DROP CONSTRAINT "FK_0558e725c04685b5361dcedd34c"`);
        await queryRunner.query(`ALTER TABLE "term_users_who_accepted_user" DROP CONSTRAINT "FK_ea9f7995c6784a6d9256c860c42"`);
        await queryRunner.query(`ALTER TABLE "logUserUpdate" DROP CONSTRAINT "FK_204b801c7e3bfd6e8742a63fe8e"`);
        await queryRunner.query(`ALTER TABLE "logTermAcceptance" DROP CONSTRAINT "FK_de1b38373b95b8402c27b662ae6"`);
        await queryRunner.query(`ALTER TABLE "logTermAcceptance" DROP CONSTRAINT "FK_cc55fa6b7d539cffc0e84124195"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_170f5d4d665727a0c71bbabbf4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa69e7df9d1d9871525db65053"`);
        await queryRunner.query(`DROP TABLE "user_accepted_terms_term"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0558e725c04685b5361dcedd34"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea9f7995c6784a6d9256c860c4"`);
        await queryRunner.query(`DROP TABLE "term_users_who_accepted_user"`);
        await queryRunner.query(`DROP TABLE "logUserUpdate"`);
        await queryRunner.query(`DROP TABLE "logTermAcceptance"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "term"`);
    }

}
