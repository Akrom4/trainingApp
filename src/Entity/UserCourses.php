<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserCoursesRepository;


#[ORM\Entity(repositoryClass: UserCoursesRepository::class)]
#[ApiResource( operations: [
    new Get(
        security: "is_granted('ROLE_ADMIN')"),
    new Put(
        security: "is_granted('ROLE_ADMIN')"),
    new Post(
        security: "is_granted('ROLE_ADMIN')",
    ),
])]
class UserCourses
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'userCourses')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $userid = null;

    #[ORM\ManyToOne(inversedBy: 'userCourses')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Courses $courseid = null;

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

    public function getUserid(): ?User
    {
        return $this->userid;
    }

    public function setUserid(?User $userid): self
    {
        $this->userid = $userid;

        return $this;
    }

    public function getCourseid(): ?Courses
    {
        return $this->courseid;
    }

    public function setCourseid(?Courses $courseid): self
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
