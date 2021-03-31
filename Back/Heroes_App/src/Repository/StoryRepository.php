<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Story;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Story|null find($id, $lockMode = null, $lockVersion = null)
 * @method Story|null findOneBy(array $criteria, array $orderBy = null)
 * @method Story[]    findAll()
 * @method Story[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Story::class);
    }


    /**
     * Request doctrine custom for only sotries valid
     *
     */
    public function AllStoriesValid()
    {
        return $this->createQueryBuilder('s')
                    ->where('s.status = 3')
                    ->orderBy('s.createdAt', 'DESC')
                    ->getQuery()
                    ->getResult();
    }

    /**
     * Request for one user's stories 
     */
    public function getAllForOneUser(User $user)
    {
        return $this->createQueryBuilder('s')
                    ->where('s.user = :user')
                    ->setParameter('user', $user)
                    ->orderBy('s.createdAt', 'DESC')
                    ->getQuery()
                    ->getResult();
    }

    // /**
    //  * @return Story[] Returns an array of Story objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Story
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
