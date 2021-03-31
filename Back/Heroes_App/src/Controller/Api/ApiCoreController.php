<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiCoreController extends AbstractController
{
    /**
     * Générate errors
     */
    protected function generateErrors($errors)
    {
        // If there are more than 0 errors
        if (count($errors) > 0) {
            
            // We create an empty array where we will store the errors
            $errorsList = [];

            // We loop on $errors to extract each error
            foreach ($errors as $error) {
                // We store the errors (the field in error in key and the message in value)
                // (associative array)
                
                    $errorsList[$error->getPropertyPath()] = $error->getMessage();
                
            }
        }
        
        return $errorsList;
    }
}
