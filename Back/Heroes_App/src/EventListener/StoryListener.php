<?php

namespace App\EventListener;

use App\Entity\Story;
use App\Service\MySlugger;
use App\Service\ImageUploader;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Doctrine\Persistence\Event\PreUpdateEventArgs;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class StoryListener
{
    private $mySlugger;
    private $imageDownload;


    public function __construct(MySlugger $mySlugger, ImageUploader $imageUploader)
    {
        $this->mySlugger = $mySlugger;
        $this->imageDownload = $imageUploader;
    }

    // the entity listener methods receive two arguments:
    // the entity instance and the lifecycle event
    public function updateSlug(Story $story, LifecycleEventArgs $event): void
    {
        $story->setSlug($this->mySlugger->slugify($story->getTitle()));
    }

    // upload first image of story PrePersist
    public function firstImage(Story $story, LifecycleEventArgs $event)
    {
        if( $story->getImage() !== null && !empty($story->getImage())){

            $url = $story->getImage();

            //Don't renseign the last arg of metohd downloadFromUrl, it's for update image (edit)
            $pathToImage = $this->imageDownload->downloadFromUrl($url, $story->getSlug());

            $story->setImage($pathToImage);
        }
        else{
            $story->setImage(null);
        }
    }
}