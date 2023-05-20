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
    #[Route('/new', name: 'app_courses_new', methods: ['GET', 'POST'])]
    public function new(Request $request, Courses $course = null, EntityManagerInterface $entityManager, SluggerInterface $slugger): Response
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

            /* $imageData = $form->get('image')->getData();

        if ($imageData) {
            // Remove the 'data:image/png;base64,' part
            $imageData = str_replace('^data:image/\w+;base64,', '', $imageData);
            // Decode the base64 data
            $imageData = base64_decode($imageData);
            
            // Create a tmp file in the system's temporary directory
            $tmpFilePath = sys_get_temp_dir().'/'.uniqid();
            file_put_contents($tmpFilePath, $imageData);

            // Create a File instance for VichUploader
            $imageFile = new \Symfony\Component\HttpFoundation\File\File($tmpFilePath);

            $course->setImage($imageFile); 
        } */
        $base64_image = $form->get('image')->getData();

    if ($base64_image) {
        list($type, $base64_image) = explode(';', $base64_image);
        list(, $base64_image) = explode(',', $base64_image);
        $base64_image = base64_decode($base64_image);

        $imageName = uniqid() . '.png';  // Choose your own filename and extension if necessary
        $imagePath = $this->getParameter('kernel.project_dir') . '/public/images/courses/' . $imageName;


        file_put_contents($imagePath, $base64_image);
        $course->setImage('images/courses/' . $imageName);
    }
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
    public function delete(Request $request, Courses $course, CoursesRepository $coursesRepository): Response
    {
        if ($this->isCsrfTokenValid('delete' . $course->getId(), $request->request->get('_token'))) {
            $coursesRepository->remove($course, true);
        }

        return $this->redirectToRoute('app_courses_index', [], Response::HTTP_SEE_OTHER);
    }
}