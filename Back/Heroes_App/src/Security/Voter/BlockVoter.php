<?php

namespace App\Security\Voter;
use App\Entity\User;
use App\Entity\Block;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class BlockVoter extends Voter
{
    const EDIT = 'edit';
    const DELETE = 'delete';

    protected function supports($attribute, $subject)
    {
        // Check if $attribute is in the array of const
        if ( !in_array( $attribute, [self::EDIT, self::DELETE] ) ){
            return false;
        }

        // Check if subject is instance of Object we want use
        if ( !$subject instanceof Block ){
            return false;
        }

        return true;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        // get the user connect
        $user = $token->getUser();

        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            // EDIT
            case self::EDIT:
                return $subject->getStory()->getUser() === $user;
                break;
            //DELETE
            case self::DELETE:
                return $subject->getStory()->getUser() === $user;
                break;
                
        }

        return false;
    }
}
