import {assert} from 'chai';
import * as ssr from '../../src/ssr/index';
import * as server from '../../src/ssr/server';

describe('ssr/server', function () {
	describe('createRenderFn', function () {
		it('without retries', function () {
			let elCount = 0;
			const requestCounter = ssr.createRequestCounter();
			const renderFn = server.createRenderFn({
				requestCounter,
				createDataFn(el) {
					return {data: el};
				},
				createElFn() {
					return {elCount: ++elCount};
				},
			});

			renderFn().then(data => {
				assert.deepStrictEqual(data, {data: {elCount: 1}});
			});
		});

		it('with retries', function () {
			let elCount = 0;
			const requestCounter = ssr.createRequestCounter();
			const renderFn = server.createRenderFn({
				requestCounter,
				createDataFn(el) {
					return {data: el};
				},
				createElFn() {
					if (elCount < 4) {
						requestCounter.onRequest();
						setTimeout(() => requestCounter.onResponse());
					}

					return {elCount: ++elCount};
				},
			});

			renderFn().then(data => {
				assert.deepStrictEqual(data, {data: {elCount: 5}});
			});
		});

		it('with retries clipped', function () {
			let elCount = 0;
			const requestCounter = ssr.createRequestCounter();
			const renderFn = server.createRenderFn({
				requestCounter,
				maxRetries: 2,
				createDataFn(el) {
					return {data: el};
				},
				createElFn() {
					if (elCount < 4) {
						requestCounter.onRequest();
						setTimeout(() => requestCounter.onResponse());
					}

					return {elCount: ++elCount};
				},
			});

			renderFn().then(data => {
				assert.deepStrictEqual(data, {data: {elCount: 3}});
			});
		});
	});
});
