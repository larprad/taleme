<?php

namespace App\EventListener;

use App\Entity\User;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordListener
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $this->encoder = $userPasswordEncoder;
    }

    // the entity listener methods receive two arguments:
    // the entity instance and the lifecycle event
    public function hashPassword(User $user, LifecycleEventArgs $event): void
    {
        $user->setPassword($this->encoder->encodePassword($user, $user->getPassword()));
    }
}