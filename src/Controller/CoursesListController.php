<?php

namespace App\Controller;

use App\Repository\CoursesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/courseslist')]
class CoursesListController extends AbstractController
{
    #[Route('/', name: 'app_courses_list')]
    public function index(CoursesRepository $coursesRepository): Response
    {
        return $this->render('courses_list/index.html.twig', [
            'controller_name' => 'CoursesListController',
            'courses' => $coursesRepository->findAll(),
        ]);
    }
}
