import { StatusCodes } from 'http-status-codes';
import { createStore } from '../services/store.service.js';

// 가게 추가 핸들러
export const handleStore = async (req, res) => {
  try {
    const storeData = {
      region_id: req.body.region_id,
      name: req.body.name,
      address: req.body.address,
    };
    
    const storeId = await createStore(storeData); 
    res.status(StatusCodes.CREATED).json({ id: storeId }); 
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message }); 
  }
};
