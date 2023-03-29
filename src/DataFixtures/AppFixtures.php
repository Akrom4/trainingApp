<?php

namespace App\DataFixtures;


use Faker\Factory;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    protected UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher){
        $this->hasher = $hasher;
    }
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        for ($i = 0 ; $i < 15 ; $i++){
            $user = new User();
            $hash = $this->hasher->hashPassword($user, "pouet");
            $user->setUsername($faker->userName())
                ->setEmail($faker->safeEmail())
                ->setPassword($hash)
                ->setCreatedAt(new DateTimeImmutable());
            $i === 1 ? $user->setRoles(['ROLE_ADMIN']) : $user->setRoles(['ROLE_USER']);
            $manager->persist($user);
        }
        $manager->flush();
    }
}
