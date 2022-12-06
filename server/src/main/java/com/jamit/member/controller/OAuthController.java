package com.jamit.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OAuthController {

    @GetMapping("/user/login/google")
    public String login() {
        return "oauth-login";
    }
}
