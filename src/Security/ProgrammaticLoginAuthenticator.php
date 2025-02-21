<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use App\Repository\UserRepository; // ✅ Import UserRepository
use Symfony\Component\Security\Core\User\UserInterface;

class ProgrammaticLoginAuthenticator extends AbstractAuthenticator
{
    private UrlGeneratorInterface $urlGenerator;
    private UserRepository $userRepository;

    public function __construct(UrlGeneratorInterface $urlGenerator, UserRepository $userRepository)
    {
        $this->urlGenerator = $urlGenerator;
        $this->userRepository = $userRepository;
    }

    public function supports(Request $request): ?bool
    {
        // This supports the /programmatic route directly
        return $request->getPathInfo() === '/programmatic';
    }

    public function authenticate(Request $request): SelfValidatingPassport
{
    $email = 'gggg@test.test';

    $passport = new SelfValidatingPassport(
        new UserBadge($email, function ($userIdentifier) {
            $user = $this->userRepository->findOneBy(['email' => $userIdentifier]);
            if (!$user) {
                throw new AuthenticationException("User not found: " . $userIdentifier);
            }
            return $user;
        })
    );

    // Mark the user as fully authenticated
    $passport->setAttribute('is_fully_authenticated', true);

    return $passport;
}

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        $redirectUrl = $this->urlGenerator->generate('app_homepage');
        dump("Authenticated User:", $token->getUser());
        return new RedirectResponse($redirectUrl);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $redirectUrl = $this->urlGenerator->generate('app_login');
        return new RedirectResponse($redirectUrl);
    }
}
