<?php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class UserVoter extends Voter
{
    const EDIT = 'edit';
    const DELETE = 'delete';

    protected function supports($attribute, $subject)
    {
        // 2 manière d'écrire (constante de classe ou chaine de caractères)
        if ( !in_array( $attribute, [self::EDIT, self::DELETE] ) ){
            return false;
        }

        if ( !$subject instanceof User ){
            return false;
        }

        return true;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();

        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
        
            // EDIT
            case self::EDIT:
                return $subject === $user;
                break;
            //DELETE
            case self::DELETE:
                return $subject === $user;
                break;
                
        }

        return false;
    }
}
