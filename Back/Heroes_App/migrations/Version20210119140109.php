<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210119140109 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE story_theme (story_id INT NOT NULL, theme_id INT NOT NULL, INDEX IDX_4B3547ABAA5D4036 (story_id), INDEX IDX_4B3547AB59027487 (theme_id), PRIMARY KEY(story_id, theme_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE story_theme ADD CONSTRAINT FK_4B3547ABAA5D4036 FOREIGN KEY (story_id) REFERENCES story (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE story_theme ADD CONSTRAINT FK_4B3547AB59027487 FOREIGN KEY (theme_id) REFERENCES theme (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE story ADD duration_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE story ADD CONSTRAINT FK_EB56043837B987D8 FOREIGN KEY (duration_id) REFERENCES duration (id)');
        $this->addSql('CREATE INDEX IDX_EB56043837B987D8 ON story (duration_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE story_theme');
        $this->addSql('ALTER TABLE story DROP FOREIGN KEY FK_EB56043837B987D8');
        $this->addSql('DROP INDEX IDX_EB56043837B987D8 ON story');
        $this->addSql('ALTER TABLE story DROP duration_id');
    }
}
