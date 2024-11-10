import { StatusCodes } from 'http-status-codes';
import { createStore } from '../services/store.service.js';
import { listStoreReviews } from '../services/store.service.js';

export const handleStore = async (req, res) => {
  try {
    const storeData = {
      regionId: req.body.regionId,
      name: req.body.name,
      address: req.body.address,
      score:req.body.score
    };
    
    const storeId = await createStore(storeData); 
    res.status(StatusCodes.CREATED).json({ id: storeId }); 
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message }); 
  }
};


export const handleListStoreReviews = async (req, res) => {
  const storeId = parseInt(req.params.storeId); 
  const cursor = req.query.cursor || 0;  

  
  if (isNaN(storeId)) {
    return res.status(400).json({
      success: false,
      message: 'storeId 존재하지않음',
    });
  }

  try {
    const reviews = await listStoreReviews(storeId, cursor);

    
    res.status(200).json({
      success: true,
      data: reviews,
    });

  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

