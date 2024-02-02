import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1706843968669 implements MigrationInterface {
    name = 'InitMigration1706843968669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(10) NOT NULL, \`last_name\` varchar(20) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(100) NOT NULL, \`phone_number\` varchar(15) NOT NULL, \`student_id\` varchar(15) NOT NULL, \`document_number\` varchar(15) NOT NULL, \`auth\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_01eea41349b6c9275aec646eee\` (\`phone_number\`), UNIQUE INDEX \`IDX_726563a72061070f771b221345\` (\`student_id\`), UNIQUE INDEX \`IDX_94e0e9a24f448b343ab07fdc86\` (\`document_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(100) NOT NULL, \`description\` varchar(500) NOT NULL, \`author\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bookViews\` (\`id\` varchar(36) NOT NULL, \`openedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` varchar(36) NULL, \`bookId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bookViews\` ADD CONSTRAINT \`FK_1ec49986f0e888da0fb47e81778\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookViews\` ADD CONSTRAINT \`FK_76034be284193089855e66edc42\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookViews\` DROP FOREIGN KEY \`FK_76034be284193089855e66edc42\``);
        await queryRunner.query(`ALTER TABLE \`bookViews\` DROP FOREIGN KEY \`FK_1ec49986f0e888da0fb47e81778\``);
        await queryRunner.query(`DROP TABLE \`bookViews\``);
        await queryRunner.query(`DROP TABLE \`books\``);
        await queryRunner.query(`DROP INDEX \`IDX_94e0e9a24f448b343ab07fdc86\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_726563a72061070f771b221345\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_01eea41349b6c9275aec646eee\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
