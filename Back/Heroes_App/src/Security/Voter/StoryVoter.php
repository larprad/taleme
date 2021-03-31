<?php

namespace App\Security\Voter;

use App\Entity\Story;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class StoryVoter extends Voter
{
    const EDIT = 'edit';
    const DELETE = 'delete';

    protected function supports($attribute, $subject)
    {
        if ( !in_array( $attribute, [self::EDIT, self::DELETE] ) ){
            return false;
        }

        if ( !$subject instanceof Story ){
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
                return $subject->getUser() === $user;
                break;
            //DELETE
            case self::DELETE:
                return $subject->getUser() === $user;
                break;
                
        }

        return false;
    }
}
