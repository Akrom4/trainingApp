<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class UserFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('username', TextType::class, [
                'label' => 'Username',
                'required' => true,
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email',
                'required' => true,
            ])
            ->add('roles', ChoiceType::class, [
                'label' => 'Roles',
                'required' => false,
                'expanded' => true, // This will render checkboxes
                'multiple' => true, // This allows selecting multiple options
                'choices' => [
                    'User' => 'ROLE_USER',
                    'Admin' => 'ROLE_ADMIN',
                ],   
            ])
            ->add('password', PasswordType::class, [
                'label' => 'Password',
                'required' => true,
            ]);

            $builder->addEventListener(FormEvents::SUBMIT, function ($event) {
                $user = $event->getData();
                $roles = $user->getRoles();
                $user->setRoles(array_unique($roles));
                $event->setData($user);
            });
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'button_label' => 'Submit',
        ]);
    }
}