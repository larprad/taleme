<?php

namespace App\Contorller\Api\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AnonymousTest extends WebTestCase
{

    /**
     * Test authorization route for anonymous
     * 
     * @dataProvider provideUrls
     */
    public function testAuthorization($url)
    {
        $client = self::createClient();
        $client->request('GET', $url);

        $this->assertResponseStatusCodeSame(200);
    }

    public function provideUrls()
    {
        yield ['/api/stories'];
        yield ['/api/stories/1'];
    }

    /**
     * Test unauthorization for anonymous
     * 
     * @dataProvider provideUrlsForPost
     */
    public function testUnauthorizationForPost($url)
    {
        $client = self::createClient();
        $client->request('POST', $url);

        $this->assertResponseStatusCodeSame(401);
    }

    public function provideUrlsForPost()
    {
        $urlList =[
            'stories',
            'blocks',
            'choices',
        ];

        foreach( $urlList as $url){
            yield ['/api/'.$url];
        }
    }

    /**
     * Test unauthorization for anonymous
     * 
     * @dataProvider provideUrlsForPatch
     */
    public function testUnauthorizationForPatch($url)
    {
        $client = self::createClient();
        $client->request('PATCH', $url);

        $this->assertResponseStatusCodeSame(401);
    }

    public function provideUrlsForPatch()
    {
        $urlList =[
            'stories',
            'blocks',
            'choices',
        ];

        foreach( $urlList as $url){
            yield ['/api/'.$url.'/1'];
        }

        yield ['/api/users/update/10'];
    }

    /**
     * Test unauthorization for anonymous
     * 
     * @dataProvider provideUrlsForDelete
     */
    public function testUnauthorizationForDelete($url)
    {
        $client = self::createClient();
        $client->request('DELETE', $url);

        $this->assertResponseStatusCodeSame(401);
    }

    public function provideUrlsForDelete()
    {
        $urlList =[
            'stories',
            'blocks',
            'choices',
        ];

        foreach( $urlList as $url){
            yield ['/api/'.$url.'/1'];
        }

        yield ['/api/users/delete/10'];
    }

    /**
     * Test authorization anonymous login
     * 
     */
    public function testSubscribeAnonymous()
    {
        $client = self::createClient();

        $client->request(
            'POST', 
            '/api/users/subscribe',
            [],
            [],
            [
                'CONTENT_TYPE' => 'application/json',
            ],
            '{
                "pseudo": "test1",
                "email": "test1@gmail.com",
                "password": "test1"
            }'
        );// Change content request for each test execute, between error "{"email":"Cette valeur est déjà utilisée."}"


        $this->assertResponseStatusCodeSame(201);
    }


    

}


