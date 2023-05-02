<?php

namespace App\Entity;

use App\Repository\ChaptersRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Courses;

#[ORM\Entity(repositoryClass: ChaptersRepository::class)]
class Chapters
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Courses::class, inversedBy: "chapters")]
    #[ORM\JoinColumn(nullable: false)]
    private $course;

    public function getCourse(): ?Courses
    {
        return $this->course;
    }

    public function setCourse(?Courses $course): self
    {
        $this->course = $course;

        return $this;
    }
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::ARRAY , nullable: true)]
    private array $pgnData = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getPgnData(): ?array
    {
        return $this->pgnData;
    }

    public function setPgnData(?array $pgnData): self
    {
        $this->pgnData = $pgnData;

        return $this;
    }
}