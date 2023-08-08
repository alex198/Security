package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UsersController {

    @GetMapping("/")
    public String redirect() {
        return "redirect:/login";
    }

    @GetMapping(value = "login")
    public String loginPage() {
        return "redirect:/user";
    }

}
