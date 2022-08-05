import { MigrationInterface, QueryRunner } from 'typeorm';

export class Teste1659728046875 implements MigrationInterface {
  name = 'Teste1659728046875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`usuario_plataforma\` ADD \`teste\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`usuario_plataforma\` DROP COLUMN \`teste\``,
    );
  }
}
