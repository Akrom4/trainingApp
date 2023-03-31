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

    #[Route('/react/{id}', name: 'app_react_course', methods: ['GET', 'POST'])]
    public function courseChapter(int $id, CoursesRepository $coursesRepository): Response
    {
        $course = $coursesRepository->find($id);
        $pgnData = $course->getPgndata();

        return $this->render('react/index.html.twig', [
            'chapter' => $pgnData,
        ]);
    }
}