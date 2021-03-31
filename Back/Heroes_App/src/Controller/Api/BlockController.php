<?php

namespace App\Controller\Api;

use App\Entity\Block;
use App\Entity\Story;
use App\Form\BlockType;
use App\Service\ImageUploader;
use App\Repository\BlockRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Controller\Api\ApiCoreController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api", name="api_")
 */
class BlockController extends ApiCoreController
{
    /**
     * Get all blocks
     * 
     * @Route("/blocks", name="blocks", methods="GET")
     */
    public function getAll(BlockRepository $blockRepository): Response
    {
        $blocks = $blockRepository->findAll();

        return $this->json($blocks, Response::HTTP_OK, [], ['groups' => 'blocks_get']);
    }

    /**
     * Get one block
     * 
     * @Route("/blocks/{id<\d+>}", name="blocks_get_one", methods="GET")
     */
    public function getOne(Block $block = null): Response
    {
        // 404 ?
        if ($block === null) {
            // We send a real answer in JSON
            return $this->json(['message' => 'Bloc non trouvé'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($block, Response::HTTP_OK, [], ['groups' => 'blocks_get']);
    }

    /**
     * Add a Block
     *
     * @Route("/blocks", name="block_add", methods="POST")
     */
    public function addBlock(Request $request,SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {

        $jsonContent = $request->getContent();

        $block = $serializer->deserialize($jsonContent, Block::class,'json');

        // Checks for errors
        $errors = $validator->validate($block);

        // if errors return json with message of errors
        if (count($errors) > 0) {
            return $this->json(['error' => $this->generateErrors($errors)], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->persist($block);
        $entityManager->flush();

        return $this->json(
            $block,
            Response::HTTP_CREATED,
            [
                'Location' => $this->generateUrl('api_blocks_get_one', ['id' => $block->getId()])
            ],
            ['groups' => 'blocks_get']
        );
    }

    /**
     * Modificate a block
     *
     * @Route("/blocks/{id<\d+>}", name="block_edit", methods={"PUT","PATCH"})
     */
    public function editBlock(Block $block = null, Request $request, EntityManagerinterface $entityManager, SerializerInterface $serializer, ValidatorInterface $validator, ImageUploader $imageUploader)
    {   
        // Check if the user is the owner of block, he want to modify
        $this->denyAccessUnlessGranted('edit', $block);

        // 404 ?
        if ($block === null) {
            return $this->json(['message' => 'Bloc non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Take the path of image before any change
        $oldImage = $block->getImage();

        $jsonContent = $request->getContent();

        $serializer->deserialize(
            $jsonContent,
            Block::class,
            'json',
            // We have this additional argument which tells the serializer which existing entity to modify
            [AbstractNormalizer::OBJECT_TO_POPULATE => $block]
        );

        // check if new value of image is differente of old value
        if ($oldImage !== $block->getImage()){

            // check if image of story is not null or not empty
            if( $block->getImage() !== null && !empty($block->getImage())){

                // Get the new new URL receive in json for upload
                $url = $block->getImage();

                // call the ImageUploader service's metohd, and give him $url, slug of block and old path image.
                $pathToImage = $imageUploader->downloadFromUrl($url, $block->getTitle(), $oldImage);

                // erase the url with the new path of server.
                $block->setImage($pathToImage);
            }
        }

        $errors = $validator->validate($block);

        if (count($errors) > 0) {
            return $this->json(['error' => $this->generateErrors($errors)], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->flush();

        return $this->json($block, Response::HTTP_OK, [], ['groups' => 'blocks_get']);
    }
    
    
    /**
     * Suppress a block
     *
     * @Route("/blocks/{id<\d+>}", name="block_delete", methods="DELETE")
     */
    public function deleteBlock(Block $block = null, EntityManagerInterface $entityManager, ImageUploader $imageUploader)
    {   
         // Check if the user is the owner of block, he want to delete
        $this->denyAccessUnlessGranted('delete', $block);

        // error for 404
        if ($block === null) {
            return $this->json(['message' => 'Bloc non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // check if bloc was blockType initial, prevent deletion if this the case
        if ($block->getBlocktype()->getType() === 'initial'){
            return $this->json(['message' => 'Bloc initial, impossible de le supprimer'], Response::HTTP_FORBIDDEN);
        }

        $entityManager->remove($block);

        if ( $block->getImage() !== null && !empty($block->getImage()) )
        {
            $imageUploader->deleteFile($block->getImage());
        }

        $entityManager->flush();

        return $this->json(['message' => 'Bloc supprimé'], Response::HTTP_OK);

    }
}
