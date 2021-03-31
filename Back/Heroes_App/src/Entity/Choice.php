<?php

namespace App\Entity;

use App\Repository\ChoiceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ChoiceRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Choice
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"choices_get","get_choice_story", "blocks_get"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=1000, nullable=true)
     * @Groups({"choices_get","get_choice_story", "blocks_get"})
     * @Assert\NotBlank
     */
    private $text;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    private $color;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Block::class, inversedBy="choices", cascade={"persist"})
     * @ORM\JoinColumn(nullable=true))
     */
    private $BelongToBlock;

    /**
     * @ORM\ManyToOne(targetEntity=Block::class, inversedBy="comeFromChoice")
     * @ORM\JoinColumn(nullable=true))
     */
    private $leadsToBlock;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): self
    {
        $this->color = $color;

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

    public function getUpdatedAt(): \DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getBelongToBlock(): Block
    {
        return $this->BelongToBlock;
    }

    public function setBelongToBlock(?Block $BelongToBlock): self
    {
        $this->BelongToBlock = $BelongToBlock;

        return $this;
    }

    public function getLeadsToBlock(): Block
    {
        return $this->leadsToBlock;
    }

    public function setLeadsToBlock(?Block $leadsToBlock): self
    {
        $this->leadsToBlock = $leadsToBlock;

        return $this;
    }

    /**
     * Get Block's Id of Choice
     * 
     * @Groups({"get_choice_story", "choices_get"})
     *
     */
    public function getIdBlocks()
    {
        $idBlockArray = [];

        $idBlockArray['belongToBlock'] = $this->BelongToBlock->getId();

        if ($this->leadsToBlock !== null) {
            $idBlockArray['leadsToBlock'] = $this->leadsToBlock->getId();
        }
        else{
            $idBlockArray['leadsToBlock'] = null;
        }
        
        return $idBlockArray;
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
