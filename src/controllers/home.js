const sidebar = require('../helpers/sidebar');
const { Image } = require('../models');

const ctrl = {};

//Exporta un mensaje por pantalla 
ctrl.index = async (req, res) => {
  const images = await Image
    .find()
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render('index', viewModel);
};

module.exports = ctrl; //exporta la funcion index
