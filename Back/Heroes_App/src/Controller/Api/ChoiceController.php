<?php

namespace App\Controller\Api;

use App\Entity\Choice;
use App\Repository\ChoiceRepository;
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
class ChoiceController extends ApiCoreController
{
    /**
     * Get all choices
     * 
     * @Route("/choices", name="choices", methods="GET")
     */
    public function getAll(ChoiceRepository $choiceRepository): Response
    {
        $choices = $choiceRepository->findAll();

        return $this->json($choices, Response::HTTP_OK, [], ['groups' => 'choices_get']);
    }

    /**
     * Get one choice
     * 
     * @Route("/choices/{id<\d+>}", name="choices_get_one", methods="GET")
     */
    public function getOne(Choice $choice = null): Response
    {
        // 404 ?
        if ($choice === null) {
            // We send a real answer in JSON
            return $this->json(['message' => 'Choix non trouvé'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($choice, Response::HTTP_OK, [], ['groups' => 'choices_get']);
    }

    /**
     * Add a Choice
     *
     * @Route("/choices", name="choices_add", methods="POST")
     */
    public function addChoice(Request $request,SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {

        $jsonContent = $request->getContent();

        // deserialize an array of Choices with " App\Entity\Choice[] "
        $choicesList = $serializer->deserialize($jsonContent, 'App\Entity\Choice[]','json');

        $errors = $validator->validate($choicesList);

        if (count($errors) > 0) {
            return $this->json(['error' => $this->generateErrors($errors)], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // for each object Choice in ChoicesList, we persist this
        foreach($choicesList as $choice){
            $entityManager->persist($choice);
        }
        // and save all of them
        $entityManager->flush();

        return $this->json(
            $choicesList,
            Response::HTTP_CREATED,
            [
                'Location' => $this->generateUrl('api_choices_get_one', ['id' => $choice->getId()])
            ],
            ['groups' => 'choices_get']
        );
    }

    /**
     * Modificate a choice
     *
     * @Route("/choices/{id<\d+>}", name="choice_edit", methods={"PUT","PATCH"})
     */
    public function editChoice(Choice $choice = null, Request $request, EntityManagerinterface $entityManager, SerializerInterface $serializer, ValidatorInterface $validator)
    {   
        // same principle that edit block
        $this->denyAccessUnlessGranted('edit', $choice);

        // 404 ?
        if ($choice === null) {
            return $this->json(['message' => 'Choix non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $jsonContent = $request->getContent();

        $serializer->deserialize(
            $jsonContent,
            Choice::class,
            'json',
            // We have this additional argument which tells the serializer which existing entity to modify
            [AbstractNormalizer::OBJECT_TO_POPULATE => $choice]
        );

        $errors = $validator->validate($choice);

        if (count($errors) > 0) {
            return $this->json(['error' => $this->generateErrors($errors)], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->flush();

        return $this->json($choice, Response::HTTP_OK, [], ['groups' => 'choices_get']);
    }
    
    /**
     * Suppress a choice
     *
     * @Route("/choices/{id<\d+>}", name="choice_delete", methods="DELETE")
     */
    public function deleteChoice(Choice $choice = null, EntityManagerInterface $entityManager)
    {   
        // Same principle that delete block
        $this->denyAccessUnlessGranted('delete', $choice);

        if ($choice === null) {
            return $this->json(['message' => 'Choix non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($choice);
        $entityManager->flush();

        return $this->json(['message' => 'Choix supprimé'], Response::HTTP_OK);

    }
}



