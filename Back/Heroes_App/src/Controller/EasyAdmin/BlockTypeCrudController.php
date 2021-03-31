<?php

namespace App\Controller\EasyAdmin;

use App\Entity\BlockType;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;


class BlockTypeCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return BlockType::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            
            TextField::new('type'),
            DateTimeField::new('created_at')->hideOnForm(),
            DateTimeField::new('updated_at')->hideOnForm()
        ];
    }
    
}
