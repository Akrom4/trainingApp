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
    public function index(EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();
        if (!$user) {
            throw $this->createAccessDeniedException('You must be logged in to view your courses');
        }

        $userCourses = $entityManager->getRepository(UserCourses::class)->findBy(['userid' => $user]);

        $courses = [];
        foreach ($userCourses as $userCourse) {
            $courses[] = $userCourse->getCourseid();
        }

        return $this->render('user_courses/index.html.twig', [
            'courses' => $courses,
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

        // Check if the user is already following the course
        $userCourse = $entityManager->getRepository(UserCourses::class)->findOneBy([
            'userid' => $user,
            'courseid' => $course,
        ]);
        if ($userCourse) {
            // The user is already following the course, return a response or ignore the request
            return new Response('You are already following this course');
        }
        $userCourses = new UserCourses();
        $userCourses->setUserid($user);
        $userCourses->setCourseid($course);

        $entityManager->persist($userCourses);
        $entityManager->flush();

        return $this->redirectToRoute('app_courses_list');
    }

    #[Route('/usercourses/{courseId}/remove', name: 'app_unfollow_courses')]
    public function remove(int $courseId, EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();
        if (!$user) {
            throw $this->createAccessDeniedException('You must be logged in to unfollow a course');
        }
        $course = $entityManager->getRepository(Courses::class)->find($courseId);
        if (!$course) {
            throw $this->createNotFoundException('The course does not exist');
        }

        $userCourse = $entityManager->getRepository(UserCourses::class)->findOneBy([
            'userid' => $user,
            'courseid' => $course,
        ]);
        if (!$userCourse) {
            throw $this->createNotFoundException('You are not following this course');
        }

        $entityManager->remove($userCourse);
        $entityManager->flush();

        return $this->redirectToRoute('app_user_courses');
    }
}