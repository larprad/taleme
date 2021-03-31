<?php

namespace App\Tests\Service;

use App\Service\MySlugger;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class MySluggerTest extends WebTestCase
{
    /**
     * Slugify default = uppercase
     */
    public function testSlugify()
    {
        // Possibility 1 : We have to instantiate the Slugger ourselves
        $symfonySlugger = new AsciiSlugger();

        // false because we test the slug without "->lower()"
        $mySlugger = new MySlugger($symfonySlugger, false);
        $result = $mySlugger->slugify('HELLO WORLD!'); // HELLO-WORLD

        $this->assertEquals('HELLO-WORLD', $result);
    }

    /**
     * Slugify lowercase
     */
    public function testSlugifyToLower()
    {
        // possibility 2 : We go through the service container

        // /!\ It works because "extends WebTestCase"
        self::bootKernel();
        $container = self::$container;
        $symfonySlugger = $container->get('Symfony\Component\String\Slugger\SluggerInterface');

        // true because we test the slug with "->lower()" in our service
        $mySlugger = new MySlugger($symfonySlugger, true);
        $result = $mySlugger->slugify('HELLO WORLD!'); // hello-world

        $this->assertEquals('hello-world', $result);
    }
}
