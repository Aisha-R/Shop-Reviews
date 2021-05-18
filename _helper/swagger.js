const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');

try {
  const swaggerDocument = YAML.load(fs.readFileSync('./swagger.yaml'), 'utf-8');
  console.log(swaggerDocument);
  router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  console.log(err);
}

module.exports = router;