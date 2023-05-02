<?php

namespace App\Controller;

use App\Entity\Courses;
use App\Entity\Chapters;
use App\Form\CoursesType;
use App\Repository\CoursesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\VarDumper\VarDumper;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/courses')]
class CoursesController extends AbstractController
{
    #[Route('/', name: 'app_courses_index', methods: ['GET'])]
    public function index(CoursesRepository $coursesRepository): Response
    {
        return $this->render('courses/index.html.twig', [
            'courses' => $coursesRepository->findAll(),
        ]);
    }

    #[Route('/{id}/edit', name: 'app_courses_edit', methods: ['GET', 'POST'])]
    #[Route('/new', name: 'app_courses_new', methods: ['GET', 'POST'])]
    public function new(Request $request, Courses $course = null, CoursesRepository $coursesRepository, EntityManagerInterface $entityManager): Response
    {
        if (!$course) {
            $course = new Courses();
            $course->setCreatedAt(new \DateTimeImmutable());
        } else {
            $course->setUpdatedAt(new \DateTime());
        }
        $form = $this->createForm(CoursesType::class, $course);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            // Get the parsed JSON data from the request
            $pgnData = json_decode($request->request->get('pgndata'), true);
            var_dump($pgnData);

            // Create and add chapters from the parsed JSON data
            if ($pgnData && is_array($pgnData)) {
                foreach ($pgnData as $chapterData) {
                    $chapter = new Chapters();
                    $chapter->setTitle($chapterData['title']);
                    $chapter->setPgnData($chapterData['chapter']);
                    $chapter->setCourse($course);
                    $course->addChapter($chapter);
                    $entityManager->persist($chapter);
                }
            }

            $entityManager->persist($course);
            $entityManager->flush();

            return $this->redirectToRoute('app_courses_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('courses/new.html.twig', [
            'course' => $course,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_courses_show', methods: ['GET'])]
    public function show(Courses $course): Response
    {
        return $this->render('courses/show.html.twig', [
            'course' => $course,
        ]);
    }

    #[Route('/{id}', name: 'app_courses_delete', methods: ['POST'])]
    public function delete(Request $request, Courses $course, CoursesRepository $coursesRepository): Response
    {
        if ($this->isCsrfTokenValid('delete' . $course->getId(), $request->request->get('_token'))) {
            $coursesRepository->remove($course, true);
        }

        return $this->redirectToRoute('app_courses_index', [], Response::HTTP_SEE_OTHER);
    }
}