<?php

namespace App\Entity;


use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use Vich\UploaderBundle\Entity\File;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CoursesRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: CoursesRepository::class)]

#[ApiResource(types: [], operations: [
    new Get(),
    new Put(security: "is_granted('ROLE_ADMIN')"),
    new Post(
        security: "is_granted('ROLE_ADMIN')",
    ),
])]

#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'description' => 'partial'])]

class Courses
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]

    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 1000, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\Column(nullable: true)]
    private array $pgndata = [];

    #[ORM\Column]
    private ?\DateTimeImmutable $createdat = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $updatedat = null;

    #[ORM\OneToMany(mappedBy: 'course', targetEntity: Chapter::class)]
    private Collection $chapters;

    public function __construct()
    {
        $this->chapters = new ArrayCollection();
    }

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

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

    public function getCreatedat(): ?\DateTimeImmutable
    {
        return $this->createdat;
    }

    public function setCreatedat(\DateTimeImmutable $createdat): self
    {
        $createdat ? $this->createdat = $createdat : $this->createdat = new \DateTimeImmutable();

        return $this;
    }

    public function getUpdatedat(): ?\DateTimeInterface
    {
        return $this->updatedat;
    }

    public function setUpdatedat(?\DateTimeInterface $updatedat): self
    {
        $this->updatedat = $updatedat;

        return $this;
    }

    /**
     * @return Collection<int, Chapter>
     */
    public function getChapters(): Collection
    {
        return $this->chapters;
    }

    public function addChapter(Chapter $chapter): self
    {
        if (!$this->chapters->contains($chapter)) {
            $this->chapters->add($chapter);
            $chapter->setCourse($this);
        }

        return $this;
    }

    public function removeChapter(Chapter $chapter): self
    {
        if ($this->chapters->removeElement($chapter)) {
            // set the owning side to null (unless already changed)
            if ($chapter->getCourse() === $this) {
                $chapter->setCourse(null);
            }
        }

        return $this;
    }
}