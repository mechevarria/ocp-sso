package org.redhat.api.status;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.time.LocalDateTime;
import java.util.HashMap;


@Path("status")
@Produces(MediaType.APPLICATION_JSON)
public class StatusController {

    @GET
    public HashMap<String, String> isUp() {

        HashMap<String, String> model = new HashMap<>();

        model.put("status", "The JBoss REST API is now up!");
        model.put("time", LocalDateTime.now().toString());

        return model;

    }
}
