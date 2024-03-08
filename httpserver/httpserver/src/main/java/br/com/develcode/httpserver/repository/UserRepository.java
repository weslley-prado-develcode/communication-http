package br.com.develcode.httpserver.repository;
import br.com.develcode.httpserver.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Usuario, Long> {
}

