<?php

namespace App\Controller\EasyAdmin;


use App\Entity\Story;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;


class StoryCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Story::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            
            TextField::new('title'),
            TextField::new('summary')->hideOnForm(),
            ImageField::new('image')->hideOnForm(),
            NumberField::new('status'),
            NumberField::new('rating')->hideOnForm(),
            TextField::new('slug')->hideOnForm(),
            DateTimeField::new('created_at')->hideOnForm(),
            DateTimeField::new('updated_at')->hideOnForm(),
            AssociationField::new('duration')->hideOnForm()->formatValue( function($value,$entity){
                return $entity->getDuration()===null ? null :$entity->getDuration()->getLength();}),
            AssociationField::new('user')->hideOnForm()->formatValue( function($value,$entity){
                return $entity->getUser()->getPseudo();})

        ];
       
    }

    #public function configureFilters(Filters $filters): Filters
    #{
    #     return $filters
    #     ->add('duration')
    #     ->add('user')
    #     ->add('status')
    #;
    #}
    
    
}
