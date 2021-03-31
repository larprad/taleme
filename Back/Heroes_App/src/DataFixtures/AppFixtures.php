<?php

namespace App\DataFixtures;


use App\Entity\User;
use App\Entity\Block;
use App\Entity\Story;
use App\Entity\Theme;
use App\Entity\Choice;
use App\Entity\Duration;
use App\Entity\BlockType;
use Doctrine\DBAL\Connection;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /** Symfony password's encoder*/
    private $passwordEncoder;
    /** Symfony's Slugger */
    private $slugger;


    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder, SluggerInterface $slugger)
    {
        $this->passwordEncoder = $userPasswordEncoder;
        $this->slugger = $slugger;
    }

    public function load(ObjectManager $manager)
    {

        $user = new User();
        $user->setEmail('user@user.com');
        $user->setPseudo('user');
        $user->setRoles(['ROLE_USER']);
        $user->setPassword('user');
        $user->setCreatedAt(new \Datetime);
        $user->setIsActive(true);
        $manager->persist($user);

        $blocktypes = [];
        for ($i = 0; $i < 3; $i++) {
            $blocktype = new BlockType();
            $blocktype->setType('blocktype ' . $i);
            $blocktypes[] = $blocktype;
            $blocktype->setCreatedAt(new \Datetime);
            $manager->persist($blocktype);
        }

        $durations = [];
        for ($i = 0; $i < 3; $i++) {
            $duration = new Duration();
            $duration->setLength('duration ' . $i);
            $durations[] = $duration;
            $duration->setCreatedAt(new \Datetime);
            $manager->persist($duration);
        }

        $themes = [];
        for ($i = 0; $i < 8; $i++) {
            $theme = new Theme();
            $theme->setName('theme ' . $i);
            $themes[] = $theme;
            $theme->setCreatedAt(new \Datetime);
            $manager->persist($theme);
        }


        $story = new Story();
        $story->setTitle('story ' . $i);
        $story->setSummary('story ' . $i);
        $story->setStatus(mt_rand(1, 4));
        $story->setImage('story ' . $i);
        $story->setRating(mt_rand(0, 5));

        shuffle($themes);
        // loop to get a random theme on your stories
        for ($r = 1; $r <= mt_rand(1, 3); $r++) {
            $randomTheme = $themes[$r];
            $story->addTheme($randomTheme);
        }
        $story->setDuration($durations[mt_rand(0, 2)]);
        $story->setUser($user);
        $story->setCreatedAt(new \Datetime);
        $manager->persist($story);


        $blocks = [];

        for ($i = 1; $i <= 10; $i++) {
            $block = new Block();
            $block->setTitle('block ' . $i);
            $block->setText('block ' . $i);
            $block->setImage('block ' . $i);
            $block->setBlocktype($blocktypes[mt_rand(0, 2)]);
            $block->setCreatedAt(new \Datetime);

            $blocks[] = $block;


            $block->setStory($story);
            $manager->persist($block);
        }

        $blockList = [];
        for ($i = 0; $i < 40; $i++) {
            $choice = new Choice();
            $choice->setText('choice ' . $i);
            $choice->setBelongToBlock($blocks[mt_rand(0, 9)]);
            $choice->setLeadsToBlock($blocks[mt_rand(0, 9)]);
            $choice->setCreatedAt(new \Datetime);

            $manager->persist($choice);
        }

        $manager->flush();
    }
}
