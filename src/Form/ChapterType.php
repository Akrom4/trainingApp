<?php

namespace App\Form;

use App\Entity\Chapter;
use App\Entity\Courses;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class ChapterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'title',
                'required' => true,
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

            // Add this field to select the Course
            ->add('course', EntityType::class, [
                'class' => Courses::class,
                'choice_label' => 'title', 
                'label' => 'Cours',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Chapter::class,
        ]);
    }
}
