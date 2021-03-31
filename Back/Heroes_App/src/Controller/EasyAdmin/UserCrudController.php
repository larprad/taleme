<?php

namespace App\Controller\EasyAdmin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use Symfony\Component\Serializer\SerializerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;



class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            
            EmailField::new('email'),
            ArrayField::new('roles'),
            TextField::new('pseudo'),
            Field::new('password')->hideOnIndex(),
            BooleanField::new('isActive'),
            DateTimeField::new('createdAt')->hideOnForm(),
            DateTimeField::new('updatedAt')->hideOnForm()
        ];
    }
    
    public function updateAction(Actions $actions): Actions
    {
        return $actions
            // ...
            ->add(Crud::PAGE_INDEX, Action::DELETE)
        ;
    }

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
