<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Block;
use App\Entity\Story;
use App\Entity\Choice;
use App\Service\ImageUploader;
use App\Repository\UserRepository;
use App\Repository\BlockRepository;
use App\Repository\StoryRepository;
use App\Repository\ChoiceRepository;
use App\Repository\BlockTypeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Laminas\EventManager\EventInterface;
use App\Controller\Api\ApiCoreController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\Bundle\DoctrineBundle\EventSubscriber\EventSubscriberInterface;

/**
 * @Route("/api", name="api_")
 */
class StoryController extends ApiCoreController
{
    /**
     * Get all stories without blocks and choices
     *
     * @Route("/stories", name="all_stories", methods="GET"))
     */
    public function getAll(StoryRepository $storyRepository): Response
    {
        // Request for get all stories valided
        $stories = $storyRepository->AllStoriesValid();

        return $this->json($stories, Response::HTTP_OK, [], ['groups' => 'get_all_stories']);
    }

    /**
     * Get all the stories for one user
     * 
     * @Route("/stories/user", name="user_storie", methods="GET")
     */
    public function allStoriesUser(StoryRepository $storyRepository)
    {
        // Get the user connected 
        $user = $this->getUser();
        
        // find all the stories belonging to this user
        $stories = $storyRepository->getAllForOneUser($user);

        return $this->json($stories, Response::HTTP_OK, [], ['groups' => 'get_all_stories']);
    }

    /**
     * Get one story with blocks and choices
     *
     * @param Story $story Story matching id
     * @param BlockRepository
     * @param ChoiceRepository
     *
     * @Route("/stories/{id<\d+>}", name="one_story", methods="GET")
     */
    public function getOne(Story $story = null, BlockRepository $blockRepository, ChoiceRepository $choiceRepository)
    {
        // if the story is not found, answer with message json and status code 404
        if ($story === null) {
            return $this->json(['message' => 'histoire introuvable.'], Response::HTTP_NOT_FOUND);
        }

        // Request for get blocks linked for one story
        $blocks = $blockRepository->blockForOneStory($story);

        // create an Array of choice
        $choicesList = [];

        foreach ($blocks as $block) {

            // Request for get choices linked for one block
            $choices = $choiceRepository->choiceForOneBlock($block);

            // check if choices is empty or not
            if (!empty($choices)) {
                foreach ($choices as $choice) {
                    
                    // put the choice in array choiceList
                    $choicesList[] = $choice;
                }
            }
        }

        // return simple Json format for front
        return $this->json(
            [
                'storyInformations' => $story,
                'blocks' => $blocks,
                'choices' => $choicesList,
            ],
            Response::HTTP_OK,
            [],
            [
                'groups' => ['get_one_story', 'get_block_story', 'get_choice_story' ]
            ]
        );
    }

    /**
     * Get blocks for one story
     * 
     * @Route("/stories/blocks/{id<\d+>}", name="all_blocks_story", methods="GET")
     */
    public function getAllBlocksForOneStory(Story $story = null, BlockRepository $blockRepository)
    {
        // if the story is not found, answer with message json and status code 404
        if ($story === null) {
            return $this->json(['message' => 'histoire introuvable.'], Response::HTTP_NOT_FOUND);
        }

        $blocksOneStory = $blockRepository->blockForOneStory($story);

        return $this->json(['blocks' => $blocksOneStory], Response::HTTP_OK, [], ['groups' => 'get_block_story']);
    }
    
    /**
     * Get choices for one story
     * 
     * @Route("/stories/choices/{id<\d+>}", name="all_choices_story", methods="GET")
     */
    public function getAllChoicesForOneStory(Story $story =null, BlockRepository $blockRepository, ChoiceRepository $choiceRepository)
    {
        // if the story is not found, answer with message json and status code 404
        if ($story === null) {
            return $this->json(['message' => 'histoire introuvable.'], Response::HTTP_NOT_FOUND);
        };

        // Request for get blocks linked for one story
        $blocks = $blockRepository->blockForOneStory($story);

        // create an Array of choice
        $choicesList = [];

        foreach ($blocks as $block) {

            // Request for get choices linked for one block
            $choices = $choiceRepository->choiceForOneBlock($block);

            // check if choices is empty or not
            if (!empty($choices)) {
                foreach ($choices as $choice) {
                    
                    // put the choice in array choiceList
                    $choicesList[] = $choice;
                }
            }
        }
        
        return $this->json(['choices' => $choicesList], Response::HTTP_OK, [], ['groups' => 'get_choice_story']);
    }

    /**
     * Create Story information
     *
     * @Route("/stories", name="add_story", methods="POST")
     */
    public function addStory(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator, BlockTypeRepository $blockTypeRepository)
    {
        $jsonContent = $request->getContent();

        $story = $serializer->deserialize($jsonContent, Story::class, 'json');

        $errors = $validator->validate($story);

        if (count($errors) > 0) {
            return $this->json(['error' => $this->generateErrors($errors)], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Get current User connected
        $currentUser = $this->getUser();
        // Link Story with current user
        $story->setUser($currentUser);

        // And save the story
        $entityManager->persist($story);
        $entityManager->flush();

        // Created new block for initial
        $initialBlock = new Block;
        // set title default
        $initialBlock->setTitle("Bloc initial");
        // give type initial
        $initialBlock->setBlocktype($blockTypeRepository->findOneBy(['type'=>'initial']));
        // Link with story save before
        $initialBlock->setStory($story);

        // And save
        $entityManager->persist($initialBlock);
        $entityManager->flush();

        // Created new choice for intial
        $initialChoice = new Choice;
        // Set text default
        $initialChoice->setText('Choix initial');
        // Link with the block intial
        $initialChoice->setBelongToBlock($initialBlock);

        // And save
        $entityManager->persist($initialChoice);
        $entityManager->flush();

        return $this->json(
            [
                'storyInformations' => $story,
                'blocks' => [$initialBlock],
                'choices'=> [$initialChoice],
            ],
            Response::HTTP_CREATED,
            [
                'Location' => $this->generateUrl('api_one_story', ['id' => $story->getId()])
            ],
            [
                'groups' => ['get_one_story', 'get_block_story', 'get_choice_story']
            ]
        );
    }

    /**
     * Edit a story
     * 
     * @Route("/stories/{id<\d+>}", name="edit_story", methods={"PUT", "PATCH"})
     */
    public function editStory(Story $story = null, Request $request, EntityManagerinterface $entityManager, SerializerInterface $serializer, ValidatorInterface $validator, ImageUploader $imageUploader)
    {   
        // Same principle that edit Block
        $this->denyAccessUnlessGranted('edit', $story);
        
        // if the story is not found, answer with message json and status code 404
        if ($story === null) {
            return $this->json(['message' => 'histoire introuvable.'], Response::HTTP_NOT_FOUND);
        }

        // Take the path of image before any change
        $oldImage = $story->getImage();

        $jsonContent = $request->getContent();

        $serializer->deserialize(
            $jsonContent,
            Story::class,
            'json',
            // We have this additional argument which tells the serializer which existing entity to modify
            [AbstractNormalizer::OBJECT_TO_POPULATE => $story]
        );

        // check if new value of image is differente of old value
        if ($oldImage !== $story->getImage()){

            // check if image of story is not null or not empty
            if( $story->getImage() !== null && !empty($story->getImage())){

                // Get the new new URL receive in json for upload
                $url = $story->getImage();

                // call the ImageUploader service's metohd, and give him $url, slug of story and old path image.
                $pathToImage = $imageUploader->downloadFromUrl($url, $story->getSlug(), $oldImage);

                // erase the url with the new path of server.
                $story->setImage($pathToImage);
            }
        }

        $errors = $validator->validate($story);

        if (count($errors) > 0) {
            return $this->json(['error' => $this->generateErrors($errors)], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->flush();

        return $this->json( $story, Response::HTTP_OK, [], ['groups'=>['get_one_story']]);
    }

    /**
     * Delete a story
     * 
     * @Route("/stories/{id<\d+>}", name="delete_story", methods="DELETE")
     */
    public function deleteStory(Story $story = null, EntityManagerInterface $entityManager, ImageUploader $imageUploader)
    {   
        // Same principle that delete Block
        $this->denyAccessUnlessGranted('delete', $story);

        // if the story is not found, answer with message json and status code 404
        if ($story === null) {
            return $this->json(['message' => 'histoire introuvable.'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($story);

        if ( $story->getImage() !== null && !empty($story->getImage()) )
        {
            $imageUploader->deleteFile($story->getImage());
        }
        
        $entityManager->flush();

        return $this->json(['message' => 'Histoire supprimée.'], Response::HTTP_OK);
    }


}