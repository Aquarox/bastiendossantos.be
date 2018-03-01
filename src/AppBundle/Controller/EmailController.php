<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class EmailController extends Controller
{

    /**
     * @Route("/email", name="sendmail", options={"expose"=true})
     * @Method("POST")
     */
    public function sendmail(\Swift_Mailer $mailer, Request $request)
    {

        $message = (new \Swift_Message('Nouveau message depuis bastiendossantos.be'))
        ->setFrom('bastiendos@gmail.com')
        ->setTo('bastiendos@gmail.com')
        ->setBody(
            $this->renderView(
                'email.html.twig', array('data' => $request->request->all())
            ),
            'text/html'
        );

        $numSent = $mailer->send($message);
   
        $this->render('default/index.html.twig');

        return new JsonResponse(array('data' => 'ok'));
    }
}
