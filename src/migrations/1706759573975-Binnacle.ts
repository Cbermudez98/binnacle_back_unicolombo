import { MigrationInterface, QueryRunner } from "typeorm";

export class Binnacle1706759573975 implements MigrationInterface {
    name = 'Binnacle1706759573975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(100) NOT NULL, \`description\` varchar(500) NOT NULL, \`author\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL, \`url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bookViews\` (\`id\` varchar(36) NOT NULL, \`openedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` int NULL, \`bookId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bookViews\` ADD CONSTRAINT \`FK_1ec49986f0e888da0fb47e81778\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookViews\` ADD CONSTRAINT \`FK_76034be284193089855e66edc42\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookViews\` DROP FOREIGN KEY \`FK_76034be284193089855e66edc42\``);
        await queryRunner.query(`ALTER TABLE \`bookViews\` DROP FOREIGN KEY \`FK_1ec49986f0e888da0fb47e81778\``);
        await queryRunner.query(`DROP TABLE \`bookViews\``);
        await queryRunner.query(`DROP TABLE \`books\``);
    }

}
