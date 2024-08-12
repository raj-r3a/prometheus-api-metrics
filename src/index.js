'use strict';

const Path = require('path');
const Prometheus = require('prom-client');
const metricsMiddleware = { exports: {} };
require('pkginfo')(metricsMiddleware, { dir: Path.dirname(module.parent.filename), include: ['name', 'version'] });
const appVersion = metricsMiddleware.exports.version;
const projectName = metricsMiddleware.exports.name.replace(/-/g, '_');

module.exports = require('./metrics-middleware')(appVersion, projectName);
module.exports.HttpMetricsCollector = (metricsPrefix, extraLabels) => require('./request-response-collector')(metricsPrefix, extraLabels);
module.exports.koaMiddleware = require('./metrics-middleware')(appVersion, projectName, 'koa');
module.exports.expressMiddleware = require('./metrics-middleware')(appVersion, projectName, 'express');
module.exports.prometheusClient = Prometheus;
