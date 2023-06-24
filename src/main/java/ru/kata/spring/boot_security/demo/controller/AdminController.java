package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImp;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleServiceImp roleServiceImp;

    @Autowired
    public AdminController(UserService userService, RoleServiceImp roleServiceImp) {
        this.userService = userService;
        this.roleServiceImp = roleServiceImp;
    }

    @GetMapping
    public String getAllUsers(Model model) {
        List<User> userList = userService.getAllUsers();
        model.addAttribute("title", "Список пользователей");
        model.addAttribute("users", userList);
        return "admin";
    }

    @GetMapping("/user-create")
    public String createUserForm(Model model, @ModelAttribute("user") User user) {
        List<Role> roles = roleServiceImp.getRoles();
        model.addAttribute("addRoles", roles);
        return "/user-create";
    }

    @PostMapping
    public String createUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/user-delete")
    public String deleteUser(@RequestParam(value = "id") String id) {
        userService.deleteUser(Long.parseLong(id));
        return "redirect:/admin";
    }

    @GetMapping("/user-update")
    public String updateUserForm(@RequestParam(value = "id") Long id, Model model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        model.addAttribute("addRoles", roleServiceImp.getRoles());
        return "/user-update";
    }

    @PostMapping("/user-update")
    public String updateUser(User user) {
        userService.editeUser(user);
        return "redirect:/admin";
    }

}
