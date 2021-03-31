<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser() && in_array('ROLE_ADMIN', $this->getUser()->getRoles())) {
             return $this->redirectToRoute('admin');
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    
    // /**
    //  * Method called if JSON login worked
    //  * 
    //  * @Route("/api/login_check", name="api_login", methods={"POST"})
    //  * 
    //  */
    // public function apiLoginSucessful(Request $request, UserRepository $userRepository, UserPasswordEncoderInterface $encoder)
    // {
    //     // the user is connected we stock it
    //     $user = $this->getUser();
        
    //         // Return infos needed ==========> TO DO: test if the user gets logged in

    //         return new JsonResponse(
    //             [
    //                 'username' => $user->getUsername(),
    //                 'pseudo' => $user->getPseudo(),
    //                 'roles' => $user->getRoles(),
    //                 'id' => $user->getId(),
    //             ]
    //             );

    //     }
    }

     

