import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1686268059370 implements MigrationInterface {
    name = 'InitDatabase1686268059370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "term" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "title" character varying NOT NULL, "description" character varying NOT NULL, "version" character varying NOT NULL, CONSTRAINT "PK_55b0479f0743f2e5d5ec414821e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "title" character varying NOT NULL, "description" character varying NOT NULL, "termId" uuid, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "email" character varying NOT NULL, "cellphone" character varying NOT NULL, "passwordHash" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "logPermissionAcceptance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "termVersion" character varying NOT NULL, "accept" boolean NOT NULL, "userId" uuid, "termId" uuid, "permissionId" uuid, CONSTRAINT "PK_74e9f37aec94e928ff8566cd994" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "logUserUpdate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "attribute" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_8c55d6f94cd441e5bf4a49af2d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_accepted_permissions_permission" ("userId" uuid NOT NULL, "permissionId" uuid NOT NULL, CONSTRAINT "PK_01c6b42b92e8a50c331890b3b62" PRIMARY KEY ("userId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3b637e58c59a98453366a73412" ON "user_accepted_permissions_permission" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_312137199e03196377982f0d42" ON "user_accepted_permissions_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_ef29249f1bf09f06ac409726c9b" FOREIGN KEY ("termId") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logPermissionAcceptance" ADD CONSTRAINT "FK_fa7c1628ce3772a0b5d20d50d1e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logPermissionAcceptance" ADD CONSTRAINT "FK_0f01fa51f527fdd33b6cf3327d6" FOREIGN KEY ("termId") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logPermissionAcceptance" ADD CONSTRAINT "FK_1a7065e984718584cff469761c0" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logUserUpdate" ADD CONSTRAINT "FK_204b801c7e3bfd6e8742a63fe8e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_accepted_permissions_permission" ADD CONSTRAINT "FK_3b637e58c59a98453366a734126" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_accepted_permissions_permission" ADD CONSTRAINT "FK_312137199e03196377982f0d42e" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_accepted_permissions_permission" DROP CONSTRAINT "FK_312137199e03196377982f0d42e"`);
        await queryRunner.query(`ALTER TABLE "user_accepted_permissions_permission" DROP CONSTRAINT "FK_3b637e58c59a98453366a734126"`);
        await queryRunner.query(`ALTER TABLE "logUserUpdate" DROP CONSTRAINT "FK_204b801c7e3bfd6e8742a63fe8e"`);
        await queryRunner.query(`ALTER TABLE "logPermissionAcceptance" DROP CONSTRAINT "FK_1a7065e984718584cff469761c0"`);
        await queryRunner.query(`ALTER TABLE "logPermissionAcceptance" DROP CONSTRAINT "FK_0f01fa51f527fdd33b6cf3327d6"`);
        await queryRunner.query(`ALTER TABLE "logPermissionAcceptance" DROP CONSTRAINT "FK_fa7c1628ce3772a0b5d20d50d1e"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_ef29249f1bf09f06ac409726c9b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_312137199e03196377982f0d42"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b637e58c59a98453366a73412"`);
        await queryRunner.query(`DROP TABLE "user_accepted_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "logUserUpdate"`);
        await queryRunner.query(`DROP TABLE "logPermissionAcceptance"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "term"`);
    }

}
