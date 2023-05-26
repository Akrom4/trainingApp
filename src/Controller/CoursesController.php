<?php

namespace App\Controller;


use App\Entity\Courses;
use App\Form\CoursesType;
use App\Repository\CoursesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

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
    public function edit(Request $request, Courses $course = null, EntityManagerInterface $entityManager, SluggerInterface $slugger): Response
    {
        $course->setUpdatedAt(new \DateTime());
        $form = $this->createForm(CoursesType::class, $course);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($course);
            $entityManager->flush();
            return $this->redirectToRoute('app_courses_index');
        }

        return $this->renderForm('courses/edit.html.twig', [
            'course' => $course,
            'form' => $form,
        ]);
    }

    #[Route('/new', name: 'app_courses_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $course = new Courses();
        $course->setCreatedAt(new \DateTimeImmutable());

        $form = $this->createForm(CoursesType::class, $course);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($course);
            $entityManager->flush();
            return $this->redirectToRoute('app_courses_index');
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
    public function delete(Request $request, Courses $course, CoursesRepository $coursesRepository,EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $course->getId(), $request->request->get('_token'))) {
            foreach ($course->getChapters() as $chapter) {
                $chapter->setCourse(null);
                $entityManager->persist($chapter);
            }
            $coursesRepository->remove($course, true);
        }

        return $this->redirectToRoute('app_courses_index', [], Response::HTTP_SEE_OTHER);
    }
}