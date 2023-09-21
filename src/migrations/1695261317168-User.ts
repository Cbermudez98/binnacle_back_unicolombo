import { MigrationInterface, QueryRunner } from "typeorm";

export class User1695261317168 implements MigrationInterface {
    name = 'User1695261317168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(10) NOT NULL, \`last_name\` varchar(20) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(100) NOT NULL, \`phone_number\` varchar(15) NOT NULL, \`student_id\` varchar(15) NOT NULL, \`document_number\` varchar(15) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_01eea41349b6c9275aec646eee\` (\`phone_number\`), UNIQUE INDEX \`IDX_726563a72061070f771b221345\` (\`student_id\`), UNIQUE INDEX \`IDX_94e0e9a24f448b343ab07fdc86\` (\`document_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_94e0e9a24f448b343ab07fdc86\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_726563a72061070f771b221345\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_01eea41349b6c9275aec646eee\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
