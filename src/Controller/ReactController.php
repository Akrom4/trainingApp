<?php

namespace App\Controller;

use App\Repository\ChapterRepository;
use App\Repository\CoursesRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ReactController extends AbstractController
{
    #[Route('/react', name: 'app_react')]
    public function index(CoursesRepository $coursesRepository): Response
    {
        
        $courses = $coursesRepository->findAll();
    
        return $this->render('react/index.html.twig', [
        'controller_name' => 'ReactController',
        'courses' => $courses,
    ]);
    }
    #[Route('/react/{courseId}/{chapterId}', name: 'app_react_course', methods: ['GET', 'POST'])]
    public function courseChapter(int $courseId, int $chapterId, CoursesRepository $coursesRepository, ChapterRepository $chapterRepository): Response
    {
        // Fetch the course
        $course = $coursesRepository->find($courseId);
        if (!$course) {
            throw $this->createNotFoundException('The course does not exist');
        }
        // Fetch the chapter
        $chapter = $chapterRepository->find($chapterId);
     
        if (!$chapter) {
            throw $this->createNotFoundException('The chapter does not exist');
        }
        
        $pgnData = $chapter->getPgndata();
        
        return $this->render('react/index.html.twig', [
            'chapter' => $pgnData,
        ]);
    }
}