<?php

namespace App\Controller\Api;

use App\Entity\BlockType;
use App\Repository\BlockTypeRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api", name="api_")
 */
class BlockTypeController extends ApiCoreController
{
    /**
     * Get all blocktypes
     * 
     * @Route("/blocktypes", name="blocktypes", methods="GET")
     */
    public function getAll(BlockTypeRepository $blocktypeRepository): Response
    {
        $blocktypes = $blocktypeRepository->findAll();

        return $this->json($blocktypes, Response::HTTP_OK, [], ['groups' => 'blocktypes_get']);
    }

    /**
     * Get one blocktype
     * 
     * @Route("/blocktypes/{id<\d+>}", name="blocktypes_get_one", methods="GET")
     */
    public function getOne(BlockType $blocktype = null): Response
    {
        // 404 ?
        if ($blocktype === null) {
            // We send a real answer in JSON
            return $this->json(['message' => 'BlockType non trouvé'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($blocktype, Response::HTTP_OK, [], ['groups' => 'blocktypes_get']);
    }
}
