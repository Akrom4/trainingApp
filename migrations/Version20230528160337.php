<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230528160337 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_courses (id INT AUTO_INCREMENT NOT NULL, userid_id INT NOT NULL, courseid_id INT NOT NULL, completed_chapters LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', completion_percentage INT DEFAULT NULL, created_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL, INDEX IDX_F1A8444658E0A285 (userid_id), INDEX IDX_F1A84446EAC3334A (courseid_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_courses ADD CONSTRAINT FK_F1A8444658E0A285 FOREIGN KEY (userid_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE user_courses ADD CONSTRAINT FK_F1A84446EAC3334A FOREIGN KEY (courseid_id) REFERENCES courses (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_courses DROP FOREIGN KEY FK_F1A8444658E0A285');
        $this->addSql('ALTER TABLE user_courses DROP FOREIGN KEY FK_F1A84446EAC3334A');
        $this->addSql('DROP TABLE user_courses');
    }
}
