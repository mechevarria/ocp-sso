package hello;

import java.time.LocalDateTime;
import java.util.HashMap;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping("/springboot-api")
    public HashMap<String, String> index() {

        HashMap<String, String> model = new HashMap<>();

        model.put("status", "Greetings from Spring Boot!");
        model.put("time", LocalDateTime.now().toString());

        return model;
    }

}