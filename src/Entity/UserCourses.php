<?php

namespace App\Entity;

use App\Repository\UserCoursesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserCoursesRepository::class)]
class UserCourses
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'userCourses')]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $userid = null;

    #[ORM\ManyToOne(inversedBy: 'userCourses')]
    #[ORM\JoinColumn(nullable: false)]
    private ?courses $courseid = null;

    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private array $completedChapters = [];

    #[ORM\Column(nullable: true)]
    private ?int $completionPercentage = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserid(): ?user
    {
        return $this->userid;
    }

    public function setUserid(?user $userid): self
    {
        $this->userid = $userid;

        return $this;
    }

    public function getCourseid(): ?courses
    {
        return $this->courseid;
    }

    public function setCourseid(?courses $courseid): self
    {
        $this->courseid = $courseid;

        return $this;
    }

    public function getCompletedChapters(): array
    {
        return $this->completedChapters;
    }

    public function setCompletedChapters(?array $completedChapters): self
    {
        $this->completedChapters = $completedChapters;

        return $this;
    }

    public function getCompletionPercentage(): ?int
    {
        return $this->completionPercentage;
    }

    public function setCompletionPercentage(?int $completionPercentage): self
    {
        $this->completionPercentage = $completionPercentage;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
