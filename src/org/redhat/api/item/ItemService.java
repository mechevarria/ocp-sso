package org.redhat.api.item;

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

		ItemModel updated = em.find(ItemModel.class, item.getId());

		updated = em.merge(updated);

		updated.setYear(item.getYear());
		updated.setModel(item.getModel());
		updated.setMake(item.getMake());

		return item;
	}

	public boolean deleteItem(String id) {
		ItemModel toDelete = em.find(ItemModel.class, Long.valueOf(id));

		toDelete = em.merge(toDelete);
		em.remove(toDelete);

		return true;

	}

}
