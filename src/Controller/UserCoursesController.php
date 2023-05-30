<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Courses;
use App\Entity\UserCourses;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



class UserCoursesController extends AbstractController
{
    #[Route('/usercourses', name: 'app_user_courses')]
    public function index(): Response
    {
        return $this->render('user_courses/index.html.twig', [
            'controller_name' => 'UserCoursesController',
        ]);
    }

    #[Route('/usercourses/{courseId}', name: 'app_follow_courses')]
    public function follow(int $courseId, EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();
        if (!$user) {
            throw $this->createAccessDeniedException('You must be logged in to follow a course');
        }
        $course = $entityManager->getRepository(Courses::class)->find($courseId);
        if (!$course) {
            throw $this->createNotFoundException('The course does not exist');
        }

        $userCourses = new UserCourses();
        $userCourses->setUserid($user);
        $userCourses->setCourseid($course);

        $entityManager->persist($userCourses);
        $entityManager->flush();

        return $this->redirectToRoute('courses_index');
    }
}
