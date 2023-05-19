<?php

namespace App\Form;

use App\Entity\Courses;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Vich\UploaderBundle\Form\Type\VichFileType;


class CoursesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'title',
                'required' => true,
            ])
            ->add('description', TextType::class, [
                'label' => 'description',
                'required' => false,
            ])
            ->add('image', FileType::class, [
                'label' => 'image',
                'required' => false,
                'mapped' => false,
            ])
            ->add('pgnText', TextareaType::class, [
                'label' => 'Fichier Pgn',
                'required' => false,
                'mapped' => false,
                'data' => '',
                'attr' => [
                    'id' => 'pgnText',
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Courses::class,
        ]);
    }
}