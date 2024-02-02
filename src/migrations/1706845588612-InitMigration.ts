import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1706845588612 implements MigrationInterface {
    name = 'InitMigration1706845588612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(10) NOT NULL, \`last_name\` varchar(20) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(100) NOT NULL, \`phone_number\` varchar(15) NOT NULL, \`student_id\` varchar(15) NOT NULL, \`document_number\` varchar(15) NOT NULL, \`auth\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_17d1817f241f10a3dbafb169fd\` (\`phone_number\`), UNIQUE INDEX \`IDX_4bcc4fd204f448ad671c0747ab\` (\`student_id\`), UNIQUE INDEX \`IDX_5f6c1b67ac12a1e7eb454a48e5\` (\`document_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(100) NOT NULL, \`description\` varchar(500) NOT NULL, \`author\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book_views\` (\`id\` varchar(36) NOT NULL, \`opened_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, \`book_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`book_views\` ADD CONSTRAINT \`FK_91d2810192032c465190d68f809\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_views\` ADD CONSTRAINT \`FK_2637bcf8329aa862611d240f43a\` FOREIGN KEY (\`book_id\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_views\` DROP FOREIGN KEY \`FK_2637bcf8329aa862611d240f43a\``);
        await queryRunner.query(`ALTER TABLE \`book_views\` DROP FOREIGN KEY \`FK_91d2810192032c465190d68f809\``);
        await queryRunner.query(`DROP TABLE \`book_views\``);
        await queryRunner.query(`DROP TABLE \`books\``);
        await queryRunner.query(`DROP INDEX \`IDX_5f6c1b67ac12a1e7eb454a48e5\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_4bcc4fd204f448ad671c0747ab\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_17d1817f241f10a3dbafb169fd\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
