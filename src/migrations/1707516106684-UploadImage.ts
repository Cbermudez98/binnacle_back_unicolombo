import { MigrationInterface, QueryRunner } from "typeorm";

export class UploadImage1707516106684 implements MigrationInterface {
    name = 'UploadImage1707516106684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`image\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`image\``);
    }

}
