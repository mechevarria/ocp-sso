package org.redhat.api.test;

import java.util.HashMap;
//import java.util.logging.Logger;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("test")
@Produces(MediaType.APPLICATION_JSON)
public class TestController {
	
	//private Logger log = Logger.getLogger(this.getClass().getName());

	@GET
	public Response isUp() {
		
		Response.ResponseBuilder builder = null;
		
		HashMap<String,String> model = new HashMap<String, String>();
		model.put("status", "test service is working!");
		
		builder = Response.ok(model);
				
		return builder.build();
		
	}
}
