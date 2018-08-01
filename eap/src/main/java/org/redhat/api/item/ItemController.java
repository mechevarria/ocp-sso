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

@Path("item")
@Produces(MediaType.APPLICATION_JSON)
public class ItemController {
	
	@Inject
	private ItemService itemService;	

	@GET
	public List<ItemModel> getAllItems() {
				
		List<ItemModel> items = itemService.findAll();
		
		return items;
	}
	
	@GET
	@Path("/{id}")
	public ItemModel getItem(@PathParam("id") String id) {
		
		ItemModel item = itemService.findById(id);
		return item;
	}

	@POST
	public ItemModel createItem(ItemModel item) {
		
		ItemModel savedItem = itemService.createItem(item);
		return savedItem;
	}
	
	@PUT
	public ItemModel updateItem(ItemModel item) {
		
		ItemModel updatedItem = itemService.updateItem(item);
		return updatedItem;
	}
	
	@DELETE
	@Path("/{id}")
	public HashMap<String,Boolean> deleteItem(@PathParam("id") String id) {
		
		HashMap<String,Boolean> status = new HashMap<String,Boolean>();
		status.put("isDeleted", itemService.deleteItem(id));

		return status;
	}

}
