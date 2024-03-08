package br.com.develcode.httpserver.controller;

import br.com.develcode.httpserver.model.Usuario;
import br.com.develcode.httpserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Usuario> getUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public Usuario createUser(@RequestBody Usuario user) {
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    public Usuario updateUser(@PathVariable Long id, @RequestBody Usuario userDetails) {
        Usuario user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}

