<?php

namespace App\Controller\EasyAdmin;

use App\Entity\User;
use App\Entity\Story;
use App\Entity\Theme;
use App\Entity\Duration;
use App\Entity\BlockType;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use Symfony\Component\EventDispatcher\EventDispatcher;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Router\CrudUrlGenerator;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;



class DashboardController extends AbstractDashboardController
{
    /**
    * @Route("/admin", name="admin")
    */
    public function index(): Response
    {
        $routeBuilder = $this->get(AdminUrlGenerator::class);

        return $this->redirect($routeBuilder->setController(StoryCrudController::class)->generateUrl());
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Heroes App')
            ->disableUrlSignatures();

            
    }
    
    

    public function configureMenuItems(): iterable
    {
            
                yield MenuItem::linkToCrud('Utilisateurs','fa fa-user',User::class);
                yield MenuItem::linkToCrud('Histoires','fa fa-file-text',Story::class);
                yield MenuItem::linkToCrud('Durée','fa fa-tags',Duration::class);
                yield MenuItem::linkToCrud('Thème','fa fa-tags',Theme::class);
                yield MenuItem::linkToCrud('Type de bloc','fa fa-tags',BlockType::class);
    }

    

}
