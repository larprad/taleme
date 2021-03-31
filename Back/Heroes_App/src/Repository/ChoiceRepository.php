<?php

namespace App\Repository;

use App\Entity\Block;
use App\Entity\Choice;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Choice|null find($id, $lockMode = null, $lockVersion = null)
 * @method Choice|null findOneBy(array $criteria, array $orderBy = null)
 * @method Choice[]    findAll()
 * @method Choice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChoiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Choice::class);
    }

    public function choiceForOneBlock(Block $block)
    {
         return $this->createQueryBuilder('c')
                    ->where('c.BelongToBlock = :block')
                    ->setParameter('block', $block)
                    ->getQuery()
                    ->getResult();
    }

    public function choiceComeFromBlock(Block $block)
    {
        return $this->createQueryBuilder('c')
                    ->where('c.leadsToBlock = :block')
                    ->setParameter('block', $block)
                    ->getQuery()
                    ->getResult();
    }

    // /**
    //  * @return Choice[] Returns an array of Choice objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Choice
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
