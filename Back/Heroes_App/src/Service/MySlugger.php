<?php

namespace App\Service;

use Symfony\Component\String\Slugger\SluggerInterface;

/**
 * Us slug class that uses Symfony's Slugger service.
 * We create it to be able to configure the way of "slugging"
 */
class MySlugger
{
    /** The Symfony's Slugger */
    private $slugger;
    /**
     * Lowercase or not
     * => Configured in .env and service.yaml
     * Transmitted automatically when the service container instantiates ou slugger.
     */
    private $toLower;

    public function __construct(SluggerInterface $slugger, $toLower)
    {
        $this->slugger = $slugger;
        $this->toLower = $toLower;
    }

    /**
     * Creates a slug from a string
     * 
     * @var string $string The string to slug
     */
    public function slugify($string)
    {
        if ($this->toLower === true) {
            return $this->slugger->slug($string)->lower();
        } else {
            return $this->slugger->slug($string);
        }
    }
}