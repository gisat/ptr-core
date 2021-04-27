import configDefaults from './defaults';

import _ from "lodash";

export default (appDefaults) => {
	/**
	 * Parse configuration values from env
	 */
	let env = {};
	_.each(_.keys(_.merge({}, configDefaults, appDefaults)), (property) => {
		if (process.env.hasOwnProperty(`REACT_APP_${property}`)) {
			env[property] = process.env[`REACT_APP_${property}`];
		}
	})

	/**
	 * Use configuration values from external runtime configuration file
	 */
	let runtimeConfig = {};
	if (typeof window !== "undefined"
		&& window.hasOwnProperty("runtimeConfig")
	) {
		runtimeConfig = window.runtimeConfig;
	}

	/**
	 * Use configuration values prepared by SSR
	 */
	let preloadedStateConfig = {};
	if (typeof window !== "undefined"
		&& window.hasOwnProperty("__PRELOADED_STATE__")
		&& window.__PRELOADED_STATE__.hasOwnProperty("app")
		&& window.__PRELOADED_STATE__.app.hasOwnProperty("localConfiguration")
	) {
		preloadedStateConfig = window.__PRELOADED_STATE__.app.localConfiguration;
	}

	return _.merge({}, configDefaults, appDefaults, env, runtimeConfig, preloadedStateConfig)
}