// CMRLibrary
// version 2.0.1
// by Doctor8296

console.log("%cCMRLibrary version: 2.0.1", 'font-family: monospace; font-size: 10 qpx; color: lime; background:black; padding-inline: 5px;');

(function() {

	const CMR = window.CMR = {};

	class ImageProcessor {
		constructor(baseElement) {

			if ("_cmr" in baseElement) 
				throw new Error('Element already has attached CMR instance');
			baseElement._cmr = this;

			this._baseElement = baseElement;

			this._state = {
				isDisposed: false,
				mouseMoveFunction: null,
				imageMoveFunction: null
			};

			Object.defineProperty(this, 'geometry', {
				get() {
					if (this._state.isDisposed)
						throw new Error('Instance was disposed');
					const rotationBaseElement = this._baseElement.querySelector('.cmr-rotation-base');
					const realCropElement = this._baseElement.querySelector('.cmr-real-crop');
					const imageElement = this._baseElement.querySelector('.cmr-image');
					return {
						cropWidth: realCropElement.clientWidth,
						cropHeight: realCropElement.clientHeight,
						cropX: realCropElement.offsetLeft,
						cropY: realCropElement.offsetTop,
						realCropEndX: realCropElement.offsetLeft + realCropElement.clientWidth,
						realCropEndY: realCropElement.offsetTop + realCropElement.clientHeight,
						imageWidth: imageElement.clientWidth,
						imageHeight: imageElement.clientHeight,
						imageX: imageElement.offsetLeft,
						imageY: imageElement.offsetTop,
						imageEndX: imageElement.offsetLeft + imageElement.clientWidth,
						imageEndY: imageElement.offsetTop + imageElement.clientHeight,
						baseWidth: this._baseElement.clientWidth,
						baseHeight: this._baseElement.clientHeight,
						baseX: this._baseElement.offsetLeft,
						baseY: this._baseElement.offsetTop,
						angle: Number.parseFloat((rotationBaseElement.style.transform.match(/rotate\((.*?)deg\)/) || [])[1]) || 0,
						imageRatio: imageElement.naturalWidth / imageElement.naturalHeight
					};
				}
			});
		}

		_relToWorld(offsetLeft, offsetTop, width, height, angleDegrees, x, y) {
			var angleRadians = (angleDegrees * Math.PI) / 180;
			var cx = width / 2;
			var cy = height / 2;
			var rotatedCx = cx * Math.cos(angleRadians) - cy * Math.sin(angleRadians);
			var rotatedCy = cx * Math.sin(angleRadians) + cy * Math.cos(angleRadians);
			var newDx = offsetLeft + (cx - rotatedCx);
			var newDy = offsetTop + (cy - rotatedCy);
			var rotatedX = (x * Math.cos(angleRadians)) - (y * Math.sin(angleRadians));
			var rotatedY = (x * Math.sin(angleRadians)) + (y * Math.cos(angleRadians));
			var pointX = rotatedX + newDx;
			var pointY = rotatedY + newDy;
			return [pointX, pointY];
		}

		_worldToRel(offsetLeft, offsetTop, width, height, angleDegrees, x, y) {
			var angleRadians = (angleDegrees * Math.PI) / 180;
			var cx = width / 2;
			var cy = height / 2;
			var rotatedCx = cx * Math.cos(angleRadians) - cy * Math.sin(angleRadians);
			var rotatedCy = cx * Math.sin(angleRadians) + cy * Math.cos(angleRadians);
			var newDx = offsetLeft + (cx - rotatedCx);
			var newDy = offsetTop + (cy - rotatedCy);
			var pointX = x - newDx;
			var pointY = y - newDy;
			var rotatedX = (pointX * Math.cos(angleRadians)) + (pointY * Math.sin(angleRadians));
			var rotatedY = (-pointX * Math.sin(angleRadians)) + (pointY * Math.cos(angleRadians));
			return [rotatedX, rotatedY];
		}

		_baseToRotateBase(x, y) {
			return this._worldToRel(0, 0, this.geometry.baseWidth, this.geometry.baseHeight, this.geometry.angle, x, y);
		}

		getBase() {
			return this._baseElement;
		}

		removeCrop() {
			const rotatedBaseWrapper = this._baseElement.querySelector('.cmr-rotated-base-wrapper');
			if (rotatedBaseWrapper === null)
				throw new Error('No crop found');

			const realCropElement = this._baseElement.querySelector('.cmr-real-crop');
			realCropElement.classList.remove('edit');
			rotatedBaseWrapper.remove();
		}

		setCrop() {
			if (this._state.isDisposed)
				throw new Error('Instance was disposed');

			if (this._baseElement.querySelector('.cmr-rotated-base-wrapper'))
				throw new Error('Crop is already exist');

			const rotationBaseElement = this._baseElement.querySelector('.cmr-rotation-base');
			const realCropElement = this._baseElement.querySelector('.cmr-real-crop');
			const imageElement = this._baseElement.querySelector('.cmr-image');

			realCropElement.classList.add('edit');

			const resizeWrapper = this._createElement('div', {
				options: {
					className: 'cmr-resize-image-wrapper',
					style: `width: ${this.geometry.imageWidth}px; height: ${this.geometry.imageHeight}px; left: ${this.geometry.imageX}px; top: ${this.geometry.imageY}px;);`,
				},
				children: [
					'ne', 'nw', 'sw', 'se'
				].map(positionName => {
					return this._createElement('span', {
						options: {
							className: `cmr-resizer-point cmr-point-${positionName}`,
							onmousedown: mouseDownEvent => {
								const startImageWidth = this.geometry.imageWidth;
								const startImageHeight = this.geometry.imageHeight;
								const startImageX = this.geometry.imageX;
								const startImageY = this.geometry.imageY;
								const startImageEndY = this.geometry.imageEndY;
								const startImageEndX = this.geometry.imageEndX;
								window.addEventListener('mousemove', this._state.resizePointMoveFunction = resizePointMoveEvent => {
									const relativeBaseX = resizePointMoveEvent.clientX - this.geometry.baseX;
									const relativeBaseY = resizePointMoveEvent.clientY - this.geometry.baseY;
									const [x, y] = this._baseToRotateBase(relativeBaseX, relativeBaseY);

									switch(positionName) {
										case 'se': {
											const relImageX = x - this.geometry.imageX;
											const relImageY = y - this.geometry.imageY;
											const perimteter = relImageX + relImageY;
											let calculatedWidth = perimteter * this.geometry.imageRatio / (this.geometry.imageRatio + 1);
											let calculatedHeight = perimteter - calculatedWidth;

											const minWidth = this.geometry.realCropEndX - this.geometry.imageX;
											const minHeight = this.geometry.realCropEndY - this.geometry.imageY;
											if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.imageRatio) {
												calculatedWidth = (minHeight) * this.geometry.imageRatio;
												calculatedHeight = minHeight;
											}
											if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.imageRatio) {
												calculatedWidth = minWidth;
												calculatedHeight = (minWidth) / this.geometry.imageRatio;
											}

											resizeWrapper.style.width = imageElement.style.width = calculatedWidth + 'px';
											resizeWrapper.style.height = imageElement.style.height = calculatedHeight + 'px';
											break;
										}
										case 'ne': {
											const relImageX = x - this.geometry.imageX;
											const relImageY = -y + this.geometry.imageY + this.geometry.imageHeight;
											const perimteter = relImageX + relImageY;
											let calculatedWidth = perimteter * this.geometry.imageRatio / (this.geometry.imageRatio + 1);
											let calculatedHeight = perimteter - calculatedWidth;

											const minWidth = this.geometry.realCropEndX - this.geometry.imageX;
											const minHeight = startImageEndY - this.geometry.cropY;
											if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.imageRatio) {
												calculatedWidth = (minHeight) * this.geometry.imageRatio;
												calculatedHeight = minHeight;
											}
											if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.imageRatio) {
												calculatedWidth = minWidth;
												calculatedHeight = (minWidth) / this.geometry.imageRatio;
											}

											resizeWrapper.style.top = imageElement.style.top = startImageY + (startImageHeight - calculatedHeight) + 'px';
											resizeWrapper.style.width = imageElement.style.width = calculatedWidth + 'px';
											resizeWrapper.style.height = imageElement.style.height = calculatedHeight + 'px';
											break;
										}
										case 'sw': {
											const relImageX = -x + this.geometry.imageX + this.geometry.imageWidth;
											const relImageY = y - this.geometry.imageY;
											const perimteter = relImageX + relImageY;
											let calculatedWidth = perimteter * this.geometry.imageRatio / (this.geometry.imageRatio + 1);
											let calculatedHeight = perimteter - calculatedWidth;

											const minWidth = startImageEndX - this.geometry.cropX;
											const minHeight = this.geometry.realCropEndY - this.geometry.imageY;
											if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.imageRatio) {
												calculatedWidth = (minHeight) * this.geometry.imageRatio;
												calculatedHeight = minHeight;
											}
											if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.imageRatio) {
												calculatedWidth = minWidth;
												calculatedHeight = (minWidth) / this.geometry.imageRatio;
											}

											resizeWrapper.style.left = imageElement.style.left = startImageX + (startImageWidth - calculatedWidth) + 'px';
											resizeWrapper.style.width = imageElement.style.width = calculatedWidth + 'px';
											resizeWrapper.style.height = imageElement.style.height = calculatedHeight + 'px';
											break;
										}
										case 'nw': {
											const relImageX = -x + this.geometry.imageX + this.geometry.imageWidth;
											const relImageY = -y + this.geometry.imageY + this.geometry.imageHeight;
											const perimteter = relImageX + relImageY;
											let calculatedWidth = perimteter * this.geometry.imageRatio / (this.geometry.imageRatio + 1);
											let calculatedHeight = perimteter - calculatedWidth;

											const minWidth = startImageEndX - this.geometry.cropX;
											const minHeight = startImageEndY - this.geometry.cropY;
											if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.imageRatio) {
												calculatedWidth = (minHeight) * this.geometry.imageRatio;
												calculatedHeight = minHeight;
											}
											if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.imageRatio) {
												calculatedWidth = minWidth;
												calculatedHeight = (minWidth) / this.geometry.imageRatio;
											}

											resizeWrapper.style.left = imageElement.style.left = startImageX + (startImageWidth - calculatedWidth) + 'px';
											resizeWrapper.style.top = imageElement.style.top = startImageY + (startImageHeight - calculatedHeight) + 'px';
											resizeWrapper.style.width = imageElement.style.width = calculatedWidth + 'px';
											resizeWrapper.style.height = imageElement.style.height = calculatedHeight + 'px';
											break;
										}
									}
								});
								window.addEventListener('mouseup', this._state.cancelResizeMoveFunction = () => {
									window.removeEventListener('mousemove', this._state.resizePointMoveFunction);
									window.removeEventListener('mouseup', this._state.cancelResizeMoveFunction);
								});
							}
						}
					});
				})
				.concat([
					this._createElement('span', {
						options: {
							className: 'cmr-image-move-wrapper',
							onmousedown: mouseDownEvent => {
								const startRelativeBaseX = mouseDownEvent.clientX - this.geometry.baseX;
								const startRelativeBaseY = mouseDownEvent.clientY - this.geometry.baseY;
								const [x, y] = this._baseToRotateBase(startRelativeBaseX, startRelativeBaseY);
								const startRelativeImageX = x - this.geometry.imageX;
								const startRelativeImageY = y - this.geometry.imageY;

								window.addEventListener('mousemove', this._state.imageMoveFunction = imageMoveEvent => {
									const relativeBaseX = imageMoveEvent.clientX - this.geometry.baseX;
									const relativeBaseY = imageMoveEvent.clientY - this.geometry.baseY;
									const [x, y] = this._baseToRotateBase(relativeBaseX, relativeBaseY);

									const calculatedX = x - startRelativeImageX;
									const calculatedY = y - startRelativeImageY;

									const adjustedX = Math.min(Math.max(calculatedX, this.geometry.realCropEndX - this.geometry.imageWidth), this.geometry.cropX);
									const adjustedY = Math.min(Math.max(calculatedY, this.geometry.realCropEndY - this.geometry.imageHeight), this.geometry.cropY);

									resizeWrapper.style.left = imageElement.style.left = adjustedX + 'px';
									resizeWrapper.style.top = imageElement.style.top = adjustedY + 'px';
								});
								window.addEventListener('mouseup', this._state.cancelImageMoveFunction = () => {
									window.removeEventListener('mousemove', this._state.imageMoveFunction);
									window.removeEventListener('mouseup', this._state.cancelImageMoveFunction);
								});
							}
						}
					})
				])
			});

			const cropElement = this._createElement('div', {
				options: {
					style: `width: ${this.geometry.cropWidth}px; height: ${this.geometry.cropHeight}px; left: ${this.geometry.cropX}px; top: ${this.geometry.cropY}px;`,
					className: 'cmr-crop'
				},
				children: [
					'e', 'n', 'w', 's', 'ne', 'nw', 'sw', 'se'
				].map((function (positionName) {
					return this._createElement('span', {
						options: {
							className: `cmr-cropper-point cmr-point-${positionName}`,
							onmousedown: (function (event) {
								event.stopPropagation();

								const startCropElementSize = [cropElement.clientWidth, cropElement.clientHeight];
								const startCropElementOffset = [cropElement.offsetLeft, cropElement.offsetTop];

								window.addEventListener('mouseup', this._state.mouseUpResizeFunction = (function () {
									window.removeEventListener('mouseup', this._state.mouseUpResizeFunction);
									window.removeEventListener('mousemove', this._state.mouseMoveResizeFunction);
								}).bind(this));

								window.addEventListener('mousemove', this._state.mouseMoveResizeFunction = (function (event) {
									var relX = event.clientX - this.geometry.baseX;
									var relY = event.clientY - this.geometry.baseY;

									var [cropRelX, cropRelY] = this._baseToRotateBase(relX, relY);

									for (var position of positionName) {
										switch (position) {
											case "e":
												{
													realCropElement.style.width = cropElement.style.width = Math.min(cropRelX - cropElement.offsetLeft,(this.geometry.imageWidth - (cropElement.offsetLeft - this.geometry.imageX))) + 'px';
													break;
												}
											case "s":
												{
													realCropElement.style.height = cropElement.style.height = Math.min(cropRelY - cropElement.offsetTop,(this.geometry.imageHeight - (cropElement.offsetTop - this.geometry.imageY))) + 'px';
													break;
												}
											case "n":
												{
													const adjustedY = Math.max(this.geometry.imageY, cropRelY);
													realCropElement.style.height = cropElement.style.height = startCropElementSize[1] - adjustedY + startCropElementOffset[1] + 'px';
													realCropElement.style.top = cropElement.style.top = adjustedY + 'px';
													break;
												}
											case "w":
												{
													const adjustedX = Math.max(this.geometry.imageX, cropRelX);
													realCropElement.style.width = cropElement.style.width = startCropElementSize[0] - adjustedX + startCropElementOffset[0] + 'px';
													realCropElement.style.left = cropElement.style.left = adjustedX + 'px';
													break;
												}
										}
									}
								}).bind(this));

							}).bind(this)
						}
					});
				}).bind(this))
				.concat(
					[
						'hor', 'vert'
					].map((function (positionType) {
						return this._createElement('span', {
							options: {
								className: `cmr-cropper-frames ${positionType}`
							}
						});
					}).bind(this))
				)
				.concat([
					this._createElement('img', {
						options: {
							className: 'cmr-center-symbol',
							src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='800px' height='800px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17Z' opacity='0.53' fill='%23ffffff'/%3E%3C/svg%3E"
						}
					})
				])
			});

			const rotatedBaseWrapper = this._createElement('div', {
				options: {
					style: ` transform: rotate(${this.geometry.angle}deg);`,
					className: 'cmr-rotated-base-wrapper',
				},
				children: [
					cropElement,
					resizeWrapper
				],
				parent: this._baseElement,
			});
			
			return rotatedBaseWrapper;
		}

		_createElement(tagName, {
			options = {}, attributes = {}, children = [], parent, init
		}) {
			var element = Object.assign(document.createElement(tagName), options);
			for (const child of children)
				element.appendChild(child);
			for (const attr in attributes)
				element.setAttribute(attr, attributes[attr]);
			if (parent instanceof Element)
				parent.appendChild(element);
			if (typeof init == 'function')
				init(element);
			return element;
		}

		dispose() {
			if (this._state.isDisposed)
				throw new Error('Instance is already disposed');
			const cropperWrapper = this._baseElement.querySelector('.cmr-rotated-base-wrapper');
			if (cropperWrapper !== null) {
				this.removeCrop();
			}
			delete this._baseElement._cmr;
			this._baseElement = null;
			this._state.isDisposed = true;
		}

	}

	ImageProcessor.isImageProcessor = function(baseElement) {
		return '_cmr' in baseElement;
	};

	CMR.ImageProcessor = ImageProcessor;

	CMR.createImageAsync = function(image, options, callback) {
		image = image instanceof HTMLImageElement ? image : Object.assign(document.createElement('img'), {src: image});
		if (typeof callback == 'function') {
			image.complete ? callback(CMR.createImage(image, options)) : image.addEventListener('load', () => callback(CMR.createImage(image, options)));
		} else {
			return new Promise(resolve => image.addEventListener('load', () => resolve(CMR.createImage(image, options))));
		}
	};

	CMR.createImage = function createImage(image, {
		baseWidth = image.naturalWidth,
		baseHeight = image.naturalHeight,
		cropX = 0,
		cropY = 0,
		cropWidth = image.naturalWidth,
		cropHeight = image.naturalHeight,
		imageX = 0,
		imageY = 0,
		imageWidth = image.naturalWidth,
		imageHeight = image.naturalHeight,
		angle = 0,
	} = {}) {
		function createElement(tagName, {
			options = {}, attributes = {}, children = [], parent, init
		}) {
			var element = Object.assign(document.createElement(tagName), options);
			for (const child of children)
				element.appendChild(child);
			for (const attr in attributes)
				element.setAttribute(attr, attributes[attr]);
			if (parent instanceof Element)
				parent.appendChild(element);
			if (typeof init == 'function')
				init(element);
			return element;
		}

		return createElement('div', {
			options: {
				className: 'cmr-base',
				style: `width: ${baseWidth}px; height: ${baseHeight}px;`
			},
			children: [
				createElement('div', {
					options: {
						className: 'cmr-rotation-base',
						style: `transform: rotate(${angle}deg)`
					},
					children: [
						Object.assign(image, {
							className: 'cmr-image',
							style: `width: ${imageWidth}px; height: ${imageHeight}px; left: ${imageX}px; top: ${imageY}px;`
						}),
						createElement('div', {
							options: {
								className: 'cmr-real-crop',
								style: `width: ${cropWidth}px; height: ${cropHeight}px; left: ${cropX}px; top: ${cropY}px;`,
							}
						})
					]
				})
			]
		});
	};

})();
