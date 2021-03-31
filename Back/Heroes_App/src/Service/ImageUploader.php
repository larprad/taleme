<?php

namespace App\Service;

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\RequestStack;

class ImageUploader
{

    private $urlPattern;
    private $requestStack;
    private $targetDirectory;
    private $filesystem;
    //array of imag's formats
    private $formatImage = [
        'jpg',
        'jpeg',
        'svg',
        'png',
        'webp',
        'gif',
    ];

    public function __construct($targetDirectory, $urlPattern, Filesystem $filesystem, RequestStack $requestStack)
    {
        $this->targetDirectory = $targetDirectory;
        $this->urlPattern = $urlPattern;
        $this->filesystem = $filesystem;
        $this->requestStack = $requestStack;
    }

    /**
     * Download image file on server
     *
     * @param string $url URL from front
     * @param string $identify For unique image
     * @param string|null $oldPathImage Use this argument for update image !
     * @return string|null
     */
    public function downloadFromUrl(string $url, string $identify, $oldPathImage = null) : ?string
    {
        // Take the current request
        $request = $this->requestStack->getCurrentRequest();

        // Check the method http to use for request
        if ( $request->isMethod('GET') )
        {
            return null;
        }

        // check if doc in the url is present
        if ( $this->checkURL($url) == false )
        {
            return null;
        }

        // get extension of file
        $pathinfo = pathinfo($url);
        $extension = $pathinfo['extension'];

        // check image's format
        if ( !in_array($extension, $this->formatImage) )
        {
            return null;
        }

        // Get content of file from url
        $image = file_get_contents($url);

        // rename file
        $fileName = md5($identify.uniqid()).'.'.$extension;
        
        // save the new file
        file_put_contents($this->getTargetDirectory().'/'. $fileName, $image);

        // check if third argments, is not null, and if ok this edit for change image
        if( $oldPathImage !== null ){

            // separate string in a array each '/'
            $arrayPartOfPath = explode('/', $oldPathImage);

            // Take the last of the array
            $nameOfFile = end($arrayPartOfPath);

            // Take the path of the old file in the server
            $pathToOldImage = $this->getTargetDirectory().'/'.$nameOfFile;

            // Check if $pathToOldImage is differente of $targetDirectory
            // for not delete all file in directory '/.../images/'
            if( $pathToOldImage !== $this->targetDirectory.'/')
            {
                // Remove the file
                $this->filesystem->remove($pathToOldImage);
            }
        }

        // return the path for the front
        return $this->urlPattern.$fileName;
    }

    /**
     * Delete file from server
     *
     * @param string $pathToFile The path of image in BDD
     * @return void
     */
    public function deleteFile($pathToFile)
    {
        // separate string in a array each '/'
        $arrayPartOfPath = explode('/', $pathToFile);

        // Take the last of the array
        $nameOfFile = end($arrayPartOfPath);

        // Take the path of the old file
        $pathToOldImage = $this->getTargetDirectory().'/'.$nameOfFile;

        // Check if $pathToOldImage is differente of $targetDirectory/ 
        // for not delete all file in directory '/.../images/'
        if( $pathToOldImage !== $this->targetDirectory.'/')
        {   
            // Remove the file
            $this->filesystem->remove($pathToOldImage);
        }
    }

    /**
     * Check the URL
     *
     * @param string $url URL of image we want upload
     * @return bool
     */
    private function checkURL($url = null)
    {
        // open file of destiny
        $check = @fopen($url, 'r');
        
        // check if file exist
        if(!$check){
            return false;
        }else{
            return true;
        }
    }

    /**
     * Get the taget directory for upload image
     */
    private function getTargetDirectory()
    {
        return $this->targetDirectory;
    }
} 