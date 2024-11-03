import { addStore, checkStoreExists } from '../repositories/store.repository.js';

export const createStore = async (storeData) => {
  const storeExists = await checkStoreExists(storeData.name, storeData.region_id);
  if (storeExists) {
    throw new Error('Store already exists in this region'); 
}

  const storeId = await addStore(storeData);
  return storeId; 
};
