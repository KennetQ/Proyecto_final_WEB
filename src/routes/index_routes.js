const express = require('express');
const router = express.Router();

// Controllers
const home = require('../controllers/home');
const image = require('../controllers/image');

const { isAuthenticated } = require('../helpers/auth');

 //
 router.get('/', (req, res) => {
  res.render('main');
});
router.get('/home', isAuthenticated ,home.index)
  router.get('/image/:image_id',isAuthenticated, image.index); //Enrutador para mostrar imagen
  router.post('/image',isAuthenticated, image.create); //Enrutador para subir imagenes
  router.post('/image/:image_id/like', isAuthenticated,image.like); //Enrutador para dar like 
  router.post('/image/:image_id/comment',isAuthenticated, image.comment); //Enrutador para comentarios
  router.delete('/image/:image_id', isAuthenticated,image.remove); //Enrutador para eliminar imagenes 

  module.exports = router;
