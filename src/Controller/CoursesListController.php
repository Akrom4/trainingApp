<?php

namespace App\Controller;

use App\Repository\CoursesRepository;
use App\Entity\Courses;
use App\Entity\UserCourses; 
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/courseslist')]
class CoursesListController extends AbstractController
{
    #[Route('/', name: 'app_courses_list')]
    public function index(CoursesRepository $coursesRepository, EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();
        if (!$user) {
            throw $this->createAccessDeniedException('You must be logged in to view courses');
        }
    
        $courses = $entityManager->getRepository(Courses::class)->findAll();
    
        $userCourses = $entityManager->getRepository(UserCourses::class)->findBy(['userid' => $user]);
    
        $followedCourses = [];
        foreach ($userCourses as $userCourse) {
            $followedCourses[] = $userCourse->getCourseid();
        }
    
        return $this->render('courses_list/index.html.twig', [
            'courses' => $courses,
            'followedCourses' => $followedCourses,
        ]);
    }
}
