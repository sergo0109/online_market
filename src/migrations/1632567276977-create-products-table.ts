import {MigrationInterface, QueryRunner} from "typeorm";

export class createProductsTable1632567276977 implements MigrationInterface {
    name = 'createProductsTable1632567276977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "products_category_enum" AS ENUM('pills')`);
        await queryRunner.query(`CREATE TABLE 
    "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
    "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
    "user_id" uuid NOT NULL, "name" character varying NOT NULL, 
    "description" character varying NOT NULL, 
    "price" numeric(5,2) NOT NULL, 
    "category" "products_category_enum" NOT NULL, 
    CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_176b502c5ebd6e72cafbd9d6f7" ON "products" ("user_id") `);
        await queryRunner.query(`ALTER TABLE 
    "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY ("user_id") 
        REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"`);
        await queryRunner.query(`DROP INDEX "IDX_176b502c5ebd6e72cafbd9d6f7"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "products_category_enum"`);
    }

}
