<?php

namespace App\Entity;

use App\Entity\User;
use App\Entity\Block;
use App\Entity\Theme;
use App\Entity\Duration;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\StoryRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=StoryRepository::class)
 * @ORM\HasLifecycleCallbacks()
 * @UniqueEntity("title")
 */
class Story
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"get_all_stories","get_one_story", "blocks_get"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"get_all_stories","get_one_story"})
     * @Assert\NotBlank
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=500, nullable=true)
     * @Groups({"get_all_stories","get_one_story"})
     */
    private $summary;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"get_all_stories","get_one_story"})
     */
    private $image;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"get_all_stories","get_one_story"})
     */
    private $status;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"get_all_stories","get_one_story"})
     */
    private $rating;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"get_all_stories","get_one_story"})
     */
    private $slug;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToMany(targetEntity=Theme::class, inversedBy="stories")
     */
    private $theme;

    /**
     * @ORM\ManyToOne(targetEntity=Duration::class, inversedBy="stories")
     */
    private $duration;

    /**
     * @ORM\OneToMany(targetEntity=Block::class, mappedBy="story", orphanRemoval=true)
     */
    private $blocks;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="stories")
     * @Groups({"get_all_stories","get_one_story"})
     */
    private $user;

    /**
     * Value default for ceatedAt
     */
    public function __construct()
    {
        $this->theme = new ArrayCollection();
        $this->blocks = new ArrayCollection();
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

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(?string $summary): self
    {
        $this->summary = $summary;

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

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(?int $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(?string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
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

    /**
     * @return Collection|Theme[]
     */
    public function getTheme(): Collection
    {
        return $this->theme;
    }

    public function addTheme(Theme $theme): self
    {
        if (!$this->theme->contains($theme)) {
            $this->theme[] = $theme;
        }

        return $this;
    }

    public function removeTheme(Theme $theme): self
    {
        $this->theme->removeElement($theme);

        return $this;
    }

    public function getDuration(): ?Duration
    {
        return $this->duration;
    }

    public function setDuration(?Duration $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * @return Collection|Block[]
     */
    public function getBlocks(): Collection
    {
        return $this->blocks;
    }

    public function addBlock(Block $block): self
    {
        if (!$this->blocks->contains($block)) {
            $this->blocks[] = $block;
            $block->setStory($this);
        }

        return $this;
    }

    public function removeBlock(Block $block): self
    {
        if ($this->blocks->removeElement($block)) {
            // set the owning side to null (unless already changed)
            if ($block->getStory() === $this) {
                $block->setStory(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Give only id for front
     * @Groups({"get_all_stories","get_one_story"})
    */
    public function getIdDuration()
    {
        if ($this->duration === null ){
            return null;
        }

        return $this->duration->getId();
    }

    /**
     * Get Theme's Id of one story
     * @Groups({"get_all_stories","get_one_story"})
     */
    public function getIdThemes()
    {
        $idThemeArray = [];

        foreach($this->theme as $theme ){
            $idThemeArray[] = $theme->getId();
        }
        
        return $idThemeArray;
    }

    /**
     * We update the updatedAt property at each UPDATE
     * 
     * @ORM\PreUpdate()
     */
    public function setUpdatedAtValue()
    {
        $this->updatedAt = new \DateTime();
    }

    /**
     * Set default value before each save in BDD
     * 
     * @ORM\PrePersist()
     */
    public function setValueDefault()
    {
        $this->status = 1;
        $this->createdAt = new \DateTime();
    }
}
