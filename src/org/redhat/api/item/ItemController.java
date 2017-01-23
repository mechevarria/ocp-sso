package org.redhat.api.item;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("item")
@Produces(MediaType.APPLICATION_JSON)
public class ItemController {
	
	@Inject
	private ItemService itemService;

	@GET
	public Response getAllItems() {
		Response.ResponseBuilder builder = null;
		
		List<ItemModel> items = itemService.findAll();

		builder = Response.ok(items);
		return builder.build();
	}
	
	@GET
	@Path("/{id}")
	public Response getItem(@PathParam("id") String id) {
		Response.ResponseBuilder builder = null;
		
		ItemModel item = itemService.findById(id);

		builder = Response.ok(item);
		return builder.build();
	}

	@POST
	public Response createItem(ItemModel item) {
		Response.ResponseBuilder builder = null;
		
		ItemModel savedItem = itemService.createItem(item);

		builder = Response.ok(savedItem);
		return builder.build();
	}
	
	@PUT
	public Response updateItem(ItemModel item) {
		Response.ResponseBuilder builder = null;
		
		ItemModel updatedItem = itemService.updateItem(item);

		builder = Response.ok(updatedItem);
		return builder.build();
	}
	
	@DELETE
	@Path("/{id}")
	public Response deleteItem(@PathParam("id") String id) {
		Response.ResponseBuilder builder = null;
		
		HashMap<String,Boolean> status = new HashMap<String,Boolean>();
		
		status.put("isDeleted", itemService.deleteItem(id));

		builder = Response.ok(status);
		return builder.build();
	}

}
