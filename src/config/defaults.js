/**
 * DEFAULT CONFIG VALUES FOR ALL INSTANCES
 *
 * Default values only.
 * Do not use this file for development, per-instance config, etc.
 */

export default {
	apiGeoserverWFSProtocol: 'http',
	apiGeoserverWFSHost: 'localhost',
	apiGeoserverWFSPath: 'geoserver/wfs',

	apiGeoserverWMSProtocol: 'http',
	apiGeoserverWMSHost: 'localhost',
	apiGeoserverWMSPath: 'geoserver/wms',

	apiGeoserverOWSPath: 'backend/geoserver/ows',

	apiBackendProtocol: 'http',
	apiBackendHost: 'localhost',
	apiBackendPath: '',
	apiBackendAoiLayerPeriodsPath: 'backend/rest/imagemosaic/getDates',
	apiBackendSzifPath: 'backend/rest/szif/case',

	devHostnames: [],

	requestPageSize: 100,
};
