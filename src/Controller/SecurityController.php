<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use App\Security\LoginFormAuthenticator;
use App\Security\ProgrammaticLoginAuthenticator;

class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('app_homepage');
        }

        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', [
            'last_username' => $lastUsername, 
            'error' => $error
        ]);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    #[Route(path: '/admin', name: 'app_admin_dashboard')]
    public function index(): Response
    {
        return $this->render('admin_dashboard/administration.html.twig');
    }

    #[Route('/demolink', name: 'demo_link')]
public function demoLink(
    UserProviderInterface $userProvider,
    TokenStorageInterface $tokenStorage,
    RequestStack $requestStack,
    EventDispatcherInterface $dispatcher
): Response {
    // Load the user
    $user = $userProvider->loadUserByIdentifier('gggg@test.test');

    // Force the token to have a role (if the user doesn't already have one)
    $roles = $user->getRoles();
    if (empty($roles)) {
        $roles = ['ROLE_USER'];
    }

    // Create an authentication token using your firewall name ('main')
    $token = new UsernamePasswordToken($user, 'main', $roles);

    // Store the token in the token storage
    $tokenStorage->setToken($token);

    // Persist the token in the session so it lasts across requests
    $session = $requestStack->getSession();
    $session->set('_security_main', serialize($token));

    // Dispatch the interactive login event so any login listeners are triggered
    $event = new InteractiveLoginEvent($requestStack->getCurrentRequest(), $token);
    $dispatcher->dispatch($event, 'security.interactive_login');

    // Redirect to a secured route (for example, your homepage)
    return $this->redirectToRoute('app_homepage');
}




}
