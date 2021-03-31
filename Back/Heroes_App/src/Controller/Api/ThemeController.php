<?php

namespace App\Controller\Api;

use App\Entity\Theme;
use App\Repository\ThemeRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api", name="api_")
 */
class ThemeController extends ApiCoreController
{
    /**
     * Get all themes
     * 
     * @Route("/themes", name="themes", methods="GET")
     */
    public function getAll(ThemeRepository $themeRepository): Response
    {
        $themes = $themeRepository->findAll();

        return $this->json($themes, Response::HTTP_OK, [], ['groups' => 'themes_get']);
    }

    /**
     * Get one theme
     * 
     * @Route("/themes/{id<\d+>}", name="themes_get_one", methods="GET")
     */
    public function getOne(Theme $theme = null): Response
    {
        // 404 ?
        if ($theme === null) {
            // We send a real answer in JSON
            return $this->json(['message' => 'Theme not found.'], Response::HTTP_NOT_FOUND);
        }
        
        return $this->json($theme, Response::HTTP_OK, [], ['groups' => 'themes_get']);
    }
}
