<?php

namespace App\EventListener;

use App\Entity\Block;
use App\Service\ImageUploader;
use App\Repository\ChoiceRepository;
use App\Repository\BlockTypeRepository;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class BlockListener
{
    private $blockTypeRepository;
    private $choiceRepository;
    private $imageDownload;

    public function __construct(BlockTypeRepository $blockTypeRepository, ChoiceRepository $choiceRepository, ImageUploader $imageUploader)
    {
        $this->blockTypeRepository = $blockTypeRepository;
        $this->choiceRepository = $choiceRepository;
        $this->imageDownload = $imageUploader;
    }

    // the entity listener methods receive two arguments:
    // the entity instance and the lifecycle event
    public function checkTypeForBlock(Block $block, LifecycleEventArgs $event): void
    {
        // check if blockType of Block is null
        if ($block->getBlocktype() === null)
        {
            // Take the block type standard
            $blockType = $this->blockTypeRepository->findOneBy(['type'=>'standard']);

            // Set blockType with the type standard
            $block->setBlocktype($blockType);
        }
    }

    // Delete block but not the choice leads to this block
    public function removeBlockAndSetNullForLeadsOfChoice(Block $block, LifecycleEventArgs $event)
    {
        $choicesToComeFrom = $this->choiceRepository->choiceComeFromBlock($block);
        
        foreach ($choicesToComeFrom as $choice){

            $choice->setLeadsToBlock(null);
        }
    }

    // upload first image of block PrePersist
    public function firstImage(Block $block, LifecycleEventArgs $event)
    {
        if( $block->getImage() !== null && !empty($block->getImage())){

            $url = $block->getImage();

            //Don't renseign the last arg of metohd downloadFromUrl, it's for update image (edit)
            $pathToImage = $this->imageDownload->downloadFromUrl($url, $block->getTitle());

            $block->setImage($pathToImage);
        }
        else{
            $block->setImage(null);
        }
    }

    // Delete image in server when block is delete between delete story
    public function autoRemoveImage(Block $block, LifecycleEventArgs $event)
    {
        if ( $block->getImage() !== null && !empty($block->getImage()) )
        {
            $this->imageDownload->deleteFile($block->getImage());
        }
    }
}