<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ChapterRepository;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;


#[ApiResource(types: [], operations: [
    new Get(),
    new Put(security: "is_granted('ROLE_ADMIN')"),
    new Post(
        security: "is_granted('ROLE_ADMIN')",
    ),
])]

#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'title' => 'partial'])]

#[ORM\Entity(repositoryClass: ChapterRepository::class)]
class Chapter
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $title = null;

    #[ORM\ManyToOne(inversedBy: 'chapters')]
    private ?Courses $course = null;

    #[ORM\Column(nullable: true)]
    private array $pgndata = [];

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $rawpgn = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getCourse(): ?Courses
    {
        return $this->course;
    }

    public function setCourse(?Courses $course): self
    {
        $this->course = $course;

        if ($course) {
            $course->addChapter($this);
        }

        return $this;
    }

    public function getPgndata(): array
    {
        return $this->pgndata;
    }

    public function setPgndata(?array $pgndata): self
    {
        $this->pgndata = $pgndata;

        return $this;
    }

    public function getRawpgn(): ?string
    {
        return $this->rawpgn;
    }

    public function setRawpgn(?string $rawpgn): self
    {
        $this->rawpgn = $rawpgn;

        return $this;
    }
}
