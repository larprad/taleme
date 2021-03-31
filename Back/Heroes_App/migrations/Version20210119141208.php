<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210119141208 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE block ADD story_id INT NOT NULL, ADD blocktype_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE block ADD CONSTRAINT FK_831B9722AA5D4036 FOREIGN KEY (story_id) REFERENCES story (id)');
        $this->addSql('ALTER TABLE block ADD CONSTRAINT FK_831B972275D13D9B FOREIGN KEY (blocktype_id) REFERENCES block_type (id)');
        $this->addSql('CREATE INDEX IDX_831B9722AA5D4036 ON block (story_id)');
        $this->addSql('CREATE INDEX IDX_831B972275D13D9B ON block (blocktype_id)');
        $this->addSql('ALTER TABLE choice ADD belong_to_block_id INT DEFAULT NULL, ADD leads_to_block_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE choice ADD CONSTRAINT FK_C1AB5A92BF8061B1 FOREIGN KEY (belong_to_block_id) REFERENCES block (id)');
        $this->addSql('ALTER TABLE choice ADD CONSTRAINT FK_C1AB5A9245C7833 FOREIGN KEY (leads_to_block_id) REFERENCES block (id)');
        $this->addSql('CREATE INDEX IDX_C1AB5A92BF8061B1 ON choice (belong_to_block_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C1AB5A9245C7833 ON choice (leads_to_block_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE block DROP FOREIGN KEY FK_831B9722AA5D4036');
        $this->addSql('ALTER TABLE block DROP FOREIGN KEY FK_831B972275D13D9B');
        $this->addSql('DROP INDEX IDX_831B9722AA5D4036 ON block');
        $this->addSql('DROP INDEX IDX_831B972275D13D9B ON block');
        $this->addSql('ALTER TABLE block DROP story_id, DROP blocktype_id');
        $this->addSql('ALTER TABLE choice DROP FOREIGN KEY FK_C1AB5A92BF8061B1');
        $this->addSql('ALTER TABLE choice DROP FOREIGN KEY FK_C1AB5A9245C7833');
        $this->addSql('DROP INDEX IDX_C1AB5A92BF8061B1 ON choice');
        $this->addSql('DROP INDEX UNIQ_C1AB5A9245C7833 ON choice');
        $this->addSql('ALTER TABLE choice DROP belong_to_block_id, DROP leads_to_block_id');
    }
}
