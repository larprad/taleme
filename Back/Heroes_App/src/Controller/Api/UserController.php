<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\StoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Controller\Api\ApiCoreController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/api", name="api_")
 */
class UserController extends ApiCoreController
{
    /**
     * regiter one user of application
     * 
     * @Route("/users/subscribe", name="user_register", methods="POST")
     */
    public function register(Request $request,SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator): Response
    {
        $jsonContent = $request->getContent();

        $newUser = $serializer->deserialize($jsonContent, User::class, 'json');
           
        $errors = $validator->validate($newUser);

        if (count($errors) > 0) {
            return $this->json($this->generateErrors($errors), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        
        //* Encode the password before save in database in PasswordListener to globalize the password's hash
        
        // Give the role basic for user
        $newUser->setRoles(["ROLE_USER"]);

        // we persist
        $entityManager->persist($newUser);
        
        // and Save
        $entityManager->flush();
        
        // return a json with the information of new user
        return $this->json([
            'id' => $newUser->getId(),
            'email' => $newUser->getEmail(),
            'pseudo' => $newUser->getPseudo(),
            'roles' => $newUser->getRoles(),
        ],
        Response::HTTP_CREATED);
    }

    /**
     * Modify an user
     * 
     * @Route("/users/update/{id<\d+>}", name="user_update", methods={"PUT", "PATCH"})
     */
    public function editUser(User $user = null, Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, ValidatorInterface $validator, UserPasswordEncoderInterface $encoder)
    {
        $this->denyAccessUnlessGranted('edit', $user);

        // if the user is not found, answer with message json and status code 404
        if ($user === null) {
            // On retourne un message JSON + un statut 404
            return $this->json(['error' => 'Utilisateur non trouvé.'], Response::HTTP_NOT_FOUND);
        }

        // Take the old password encoded
        $oldPassword = $user->getPassword();

        $jsonContent = $request->getContent();

        $updatedUser = $serializer->deserialize(
            $jsonContent, 
            User::class, 
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $user]);
           
        
        $errors = $validator->validate($updatedUser);

        if (count($errors) > 0) {
            return $this->json($this->generateErrors($errors), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // if value in key "password" change, we go inside condition
        if( $updatedUser->getPassword() !== $oldPassword )
        {
            // take the new value of "password"
            $newPassword = $updatedUser->getPassword();

            // Erase the old password with the new password encoded
            $updatedUser->setPassword($encoder->encodePassword($updatedUser, $newPassword));
        }
        
        $entityManager->flush();

        return $this->json(['message' => 'Utilisateur modifié.'], Response::HTTP_OK);
    }

    //? Method DELETE is not for the MVP !!
    //? It's for another version
    /**
     * Delete an user
     * 
     * @Route("/users/delete/{id<\d+>}", name="user_delete", methods="DELETE")
     */
    // public function deleteUser(User $user, EntityManagerInterface $entityManager)
    // {
    //     $this->denyAccessUnlessGranted('delete', $user);

            // if the user is not found, answer with message json and status code 404
    //     if ($user === null) {
    //         return $this->json(['error' => 'Utilisateur non trouvé.'], Response::HTTP_NOT_FOUND);
    //     }

    //     $entityManager->remove($user);
    //     $entityManager->flush();

    //     return $this->json(['message' => 'Utilisateur supprimé.'], Response::HTTP_OK);
    // }


}
