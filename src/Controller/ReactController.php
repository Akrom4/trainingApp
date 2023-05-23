<?php

namespace App\Controller;

use App\Repository\CoursesRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ReactController extends AbstractController
{
    #[Route('/react', name: 'app_react')]
    public function index(): Response
    {
        return $this->render('react/index.html.twig', [
            'controller_name' => 'ReactController',
        ]);
    }

    #[Route('/react/{courseId}/{chapterId}', name: 'app_react_course', methods: ['GET', 'POST'])]
    public function courseChapter(int $courseId, int $chapterId, CoursesRepository $coursesRepository): Response
    {
        // Fetch the course
        $course = $coursesRepository->find($courseId);
        if (!$course) {
            throw $this->createNotFoundException('The course does not exist');
        }

        // Fetch the chapters of the course
        $chapters = $course->getChapters();
        if (!$chapters || !isset($chapters[$chapterId])) {
            throw $this->createNotFoundException('The chapter does not exist');
        }

        // Fetch the chapter
        $chapter = $chapters[$chapterId];
        $pgnData = $chapter->getPgndata();

        return $this->render('react/index.html.twig', [
            'chapter' => $pgnData,
        ]);
    }
}