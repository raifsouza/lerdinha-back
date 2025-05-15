import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1747144878701 implements MigrationInterface {
    name = 'InitialMigration1747144878701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`corrida\` (\`id\` int NOT NULL AUTO_INCREMENT, \`finalizada\` tinyint NOT NULL DEFAULT 0, \`dataCriacao\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`tartarugaVencedora\` varchar(255) NULL, \`taxaPremio\` decimal(5,2) NOT NULL DEFAULT '0.70', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`aposta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tartaruga\` varchar(255) NOT NULL, \`valor\` decimal(10,2) NOT NULL, \`premio\` decimal(10,2) NOT NULL DEFAULT '0.00', \`vencedora\` tinyint NOT NULL DEFAULT 0, \`usuarioId\` int NULL, \`corridaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nomeCompleto\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`saldo\` decimal(10,2) NOT NULL DEFAULT '0.00', \`telefone\` varchar(255) NOT NULL, \`chavePix\` varchar(255) NULL, \`senha\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ebebcaef8457dcff6e6d69f17b\` (\`cpf\`), UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promocao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(255) NOT NULL, \`taxaPremio\` decimal(5,2) NOT NULL, \`ativa\` tinyint NOT NULL DEFAULT 0, \`criadaEm\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expiraEm\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`aposta\` ADD CONSTRAINT \`FK_e9bff60fe377a9d0a6c05ec67c6\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`aposta\` ADD CONSTRAINT \`FK_5b8e82a32afe69a78b1695c9bc8\` FOREIGN KEY (\`corridaId\`) REFERENCES \`corrida\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aposta\` DROP FOREIGN KEY \`FK_5b8e82a32afe69a78b1695c9bc8\``);
        await queryRunner.query(`ALTER TABLE \`aposta\` DROP FOREIGN KEY \`FK_e9bff60fe377a9d0a6c05ec67c6\``);
        await queryRunner.query(`DROP TABLE \`promocao\``);
        await queryRunner.query(`DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\` ON \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_ebebcaef8457dcff6e6d69f17b\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`aposta\``);
        await queryRunner.query(`DROP TABLE \`corrida\``);
    }

}
