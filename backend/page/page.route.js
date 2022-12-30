import express from 'express';
import { publicWebPageTemplates, webPageTemplates } from '../assets/assets.controller';
import {
  changeContent,
  create,
  update,
  deletePageRecord,
  details,
  list,
  loadContent,
} from './page.controller';

const pageRoute = express.Router();
pageRoute.post('/', create);

// to get the publi pages 
pageRoute.get('/templates', (req, res) => {
  res.send(publicWebPageTemplates("test-user-id"));
});

pageRoute.post('/:pageId/content', changeContent);

pageRoute.put('/:pageId', update);

pageRoute.delete('/:pageId', deletePageRecord);

pageRoute.get('/:pageId', details);

pageRoute.get('/user/:userId', list); // get pages by userId and public true;

pageRoute.get('/:pageId/content', loadContent);


export default pageRoute;
