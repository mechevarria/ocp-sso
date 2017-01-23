package org.redhat.api.item;

import java.util.List;

import javax.annotation.Resource;
import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.UserTransaction;

@RequestScoped
public class ItemService {

	@PersistenceContext
	private EntityManager em;

	@Resource
	private UserTransaction utx;

	public List<ItemModel> findAll() {

		TypedQuery<ItemModel> query = em.createNamedQuery("findAll", ItemModel.class);
		List<ItemModel> list = query.getResultList();

		return list;
	}

	public ItemModel findById(String id) {

		return em.find(ItemModel.class, Long.valueOf(id));
	}

	public ItemModel createItem(ItemModel item) {
		try {
			utx.begin();

			em.persist(item);
			em.flush();

			utx.commit();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return item;
	}

	public ItemModel updateItem(ItemModel item) {

		ItemModel updated = em.find(ItemModel.class, item.getId());

		try {
			utx.begin();
			
			updated = em.merge(updated);

			updated.setYear(item.getYear());
			updated.setModel(item.getModel());
			updated.setMake(item.getMake());

			utx.commit();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return item;
	}

	public boolean deleteItem(String id) {
		ItemModel toDelete = em.find(ItemModel.class, Long.valueOf(id));

		try {
			utx.begin();
			
			toDelete = em.merge(toDelete);
			em.remove(toDelete);

			utx.commit();

			return true;
		} catch (Exception e) {
			e.printStackTrace();
			
			return false;
		}

	}

}
