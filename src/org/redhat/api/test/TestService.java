package org.redhat.api.test;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path("test")
@Produces(MediaType.APPLICATION_JSON)
public class TestService {

	@GET
	public Map<String,String> isUp() {
		
		Map<String,String> response = new HashMap<String,String>();
		response.put("status","Test service is up!");
		
		return response;
		
	}
}
