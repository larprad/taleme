<?php

namespace App\Controller\Api;

use App\Entity\Duration;
use App\Repository\DurationRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api", name="api_")
 */
class DurationController extends ApiCoreController
{
    /**
     * Get all durations
     * 
     * @Route("/durations", name="durations", methods="GET")
     */
    public function getAll(DurationRepository $durationRepository): Response
    {
        $durations = $durationRepository->findAll();

        return $this->json($durations, Response::HTTP_OK, [], ['groups' => 'durations_get']);
    }

    /**
     * Get one duration
     * 
     * @Route("/durations/{id<\d+>}", name="durations_get_one", methods="GET")
     */
    public function getOne(Duration $duration = null): Response
    {
        // 404 ?
        if ($duration === null) {
            // We send a real answer in JSON
            return $this->json(['message' => 'Duration not found.'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($duration, Response::HTTP_OK, [], ['groups' => 'durations_get']);
    }
}
