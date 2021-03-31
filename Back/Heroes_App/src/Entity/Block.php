<?php

namespace App\Entity;

use App\Entity\Story;
use App\Entity\Choice;
use App\Entity\BlockType;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\BlockRepository;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=BlockRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Block
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"blocks_get","get_block_story"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"blocks_get","get_block_story"})
     * @Assert\NotBlank
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"blocks_get","get_block_story"})
     */
    private $text;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"blocks_get","get_block_story"})
     */
    private $image;

    /**
     * @ORM\Column(type="datetime")
     * 
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Story::class, inversedBy="blocks")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("blocks_get")
     */
    private $story;

    /**
     * @ORM\ManyToOne(targetEntity=BlockType::class, inversedBy="blocks")
     * 
     */
    private $blocktype;

    /**
     * @ORM\OneToMany(targetEntity=Choice::class, mappedBy="BelongToBlock", cascade={"persist"}, orphanRemoval=true)
     */
    private $choices;

    /**
     * @ORM\OneToMany(targetEntity=Choice::class, mappedBy="leadsToBlock")
     */
    private $comeFromChoice;

    public function __construct()
    {
        $this->choices = new ArrayCollection();
        $this->comeFromChoice = new ArrayCollection();
    }

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

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): self
    {
        $this->text = $text;

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

    public function getStory(): ?Story
    {
        return $this->story;
    }

    public function setStory(?Story $story): self
    {
        $this->story = $story;

        return $this;
    }

    public function getBlocktype(): ?BlockType
    {
        return $this->blocktype;
    }

    public function setBlocktype(?BlockType $blocktype): self
    {
        $this->blocktype = $blocktype;

        return $this;
    }

    /**
     * @return Collection|Choice[]
     */
    public function getChoices(): Collection
    {
        return $this->choices;
    }

    public function addChoice(Choice $choice): self
    {
        if (!$this->choices->contains($choice)) {
            $this->choices[] = $choice;
            $choice->setBelongToBlock($this);
        }

        return $this;
    }

    public function removeChoice(Choice $choice): self
    {
        if ($this->choices->removeElement($choice)) {
            // set the owning side to null (unless already changed)
            if ($choice->getBelongToBlock() === $this) {
                $choice->setBelongToBlock(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Choice[]
     */
    public function getComeFromChoice(): Collection
    {
        return $this->comeFromChoice;
    }

    public function addComeFromChoice(Choice $choice): self
    {
        if (!$this->comeFromChoice->contains($choice)) {
            $this->comeFromChoice[] = $choice;
            $choice->setLeadsToBlock($this);
        }

        return $this;
    }

    public function removeComeFromChoice(Choice $choice): self
    {
        if ($this->comeFromChoice->removeElement($choice)) {
            // set the owning side to null (unless already changed)
            if ($choice->getLeadsToBlock() === $this) {
                $choice->setLeadsToBlock(null);
            }
        }

        return $this;
    }

    /**
     * Get Choice's Id of one block
     * 
     * @Groups({"get_block_story","blocks_get"})
     *
     */
    public function getIdChoices()
    {
        $idChoiceArray = [];

        foreach($this->choices as $choice ){
            $idChoiceArray[] = $choice->getId();
        }
        
        return $idChoiceArray;
    }

    /**
     * Get type of block
     * 
     * @Groups({"blocks_get","get_block_story"})
     */
    public function getType()
    {
        return $this->blocktype->getId();
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
        $this->createdAt = new \DateTime();
    }
}
