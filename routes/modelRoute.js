const express = require('express');
const router = express.Router();
const controllers = require('../controllers/modelController');
const { 
  Phone, Location, OwnerLink, 
  Section, WhatWeDoImage, AboutUs, Gallary,
  Service, Team, TeamLink, Project, Partner 
} = require('../models/index');


// Generic CRUD routes
const bindCRUD = (path, Model, includes = [], fieldName = 'key') => {
  router.post(`/${path}`, controllers.createModel(Model));
  router.get(`/${path}`, controllers.getAllModels(Model, includes));
  router.get(`/${path}/latest`, controllers.getLatestModel(Model, includes));
  router.get(`/${path}/values/:value`, controllers.getModelByValue(Model, fieldName, includes));
  router.get(`/${path}/:id`, controllers.getModelById(Model, includes));
  router.put(`/${path}/id/:id`, controllers.updateModel(Model, includes));
  router.delete(`/${path}/:id`, controllers.deleteModel(Model));
};

// Phones, Locations, Links
bindCRUD('phones', Phone);
bindCRUD('locations', Location);
bindCRUD('links', OwnerLink);

// gallary
bindCRUD('gallery', Gallary);

// Sections
bindCRUD('sections', Section, [{ model: Team, as: 'teams' }, { model: Project, as: 'projects' }, { model: Service, as: 'services' }, { model: Partner, as: 'partners' }]);

// Section-related content
bindCRUD('what-we-do-images', WhatWeDoImage, [{ model: Section, as: 'section' }]);
bindCRUD('about_us', AboutUs);
bindCRUD('services', Service, [{ model: Section, as: 'section' }]);
bindCRUD('teams', Team, [{ model: Section, as: 'section' }]);
bindCRUD('team-links', TeamLink);
bindCRUD('projects', Project, [{ model: Section, as: 'section' }]);
bindCRUD('partners', Partner, [{ model: Section, as: 'section' }]);

module.exports = router;
