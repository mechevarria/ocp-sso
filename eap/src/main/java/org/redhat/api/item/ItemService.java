package org.redhat.api.item;

import java.sql.Date;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Stateless
public class ItemService {

	@PersistenceContext
	private EntityManager em;

	public List<ItemModel> findAll() {

		TypedQuery<ItemModel> query = em.createQuery("SELECT i FROM ItemModel i", ItemModel.class);
		
		List<ItemModel> list = query.getResultList();
		
		return list;
	}

	public ItemModel findById(String id) {

		return em.find(ItemModel.class, Long.valueOf(id));
	}

	public ItemModel createItem(ItemModel item) {

		em.persist(item);
		em.flush();

		return item;
	}

	public ItemModel updateItem(ItemModel item) {
		
		item.setLastUpdateDate(new Date(System.currentTimeMillis()));

		// find the existing item in the db
		ItemModel updated = em.find(ItemModel.class, item.getId());

		// merge the existing model with the model passed in
		updated = em.merge(item);

		return updated;
	}

	public boolean deleteItem(String id) {
		ItemModel toDelete = em.find(ItemModel.class, Long.valueOf(id));

		toDelete = em.merge(toDelete);
		em.remove(toDelete);

		return true;

	}

}
