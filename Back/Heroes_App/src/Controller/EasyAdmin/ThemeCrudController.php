<?php

namespace App\Controller\EasyAdmin;

use App\Entity\Theme;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;


class ThemeCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {   
        return Theme::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            
            TextField::new('name'),
            DateTimeField::new('created_at')->hideOnForm(),
            DateTimeField::new('updated_at')->hideOnForm()
        ];
    }
    
}
