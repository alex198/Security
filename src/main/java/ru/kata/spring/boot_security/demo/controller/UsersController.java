package ru.kata.spring.boot_security.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;


@Controller
public class UsersController {

//    private final UserService userService;
//
//    @Autowired
//    public UsersController(UserService userService) {
//        this.userService = userService;
//    }

    @GetMapping("/")
    public String redirect() {
        return "redirect:/login";
    }

//    @GetMapping("/user")
//    public String showUser(Model model, Principal principal) {
//        User user = userService.findUserByUsername(principal.getName());
//        model.addAttribute("title", "Данные пользователя");
//        model.addAttribute("user", user);
//        return "user";
//    }

    @GetMapping(value = "login")
    public String loginPage() {
        return "redirect:/user";
    }

}
