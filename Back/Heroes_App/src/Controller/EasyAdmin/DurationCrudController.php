<?php

namespace App\Controller\EasyAdmin;

use App\Entity\Duration;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;


class DurationCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Duration::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            
            TextField::new('length'),
            DateTimeField::new('created_at')->hideOnForm(),
            DateTimeField::new('updated_at')->hideOnForm()
        ];
    }
}
