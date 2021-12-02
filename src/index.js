'use strict';

const Path = require('path');
const metricsMiddleware = { exports: {} };
require('pkginfo')(metricsMiddleware, { dir: Path.dirname(module.parent.filename), include: ['name', 'version'] });
const appVersion = metricsMiddleware.exports.version;
const projectName = metricsMiddleware.exports.name.replace(/-/g, '_');

module.exports = require('./metrics-middleware')(appVersion, projectName);
module.exports.HttpMetricsCollector = (projectName, extraLabels) => require('./request-response-collector')(projectName, extraLabels);
module.exports.koaMiddleware = require('./metrics-middleware')(appVersion, projectName, 'koa');
module.exports.expressMiddleware = require('./metrics-middleware')(appVersion, projectName, 'express');
