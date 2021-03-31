<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210120134011 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE choice DROP INDEX UNIQ_C1AB5A9245C7833, ADD INDEX IDX_C1AB5A9245C7833 (leads_to_block_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE choice DROP INDEX IDX_C1AB5A9245C7833, ADD UNIQUE INDEX UNIQ_C1AB5A9245C7833 (leads_to_block_id)');
    }
}
