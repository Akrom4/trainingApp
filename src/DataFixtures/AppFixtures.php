<?php

namespace App\DataFixtures;


use Faker\Factory;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        for ($i = 0 ; $i < 15 ; $i++){
            $user = new User();

            $user->setUsername($faker->userName())
                ->setEmail($faker->safeEmail())
                ->setPassword('pouet')
                ->setCreatedAt(new DateTimeImmutable());
            $i === 1 ? $user->setRole('admin') : $user->setRole('user');
            $manager->persist($user);
        }
        $manager->flush();
    }
}
