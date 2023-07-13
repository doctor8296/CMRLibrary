// CMRLibrary
// version 4.1.5
// by Doctor8296

console.log("%cCMRLibrary version: 2.0.1", 'font-family: monospace; font-size: 10 qpx; color: lime; background:black; padding-inline: 5px;');


(function() {

	const CMR = window.CMR = {};

	class ImageProcessor {
		constructor(frame) {

			if ("_cmr" in frame)
				throw new Error('Element already has attached CMR instance');

			this._frame = frame;
			this._controller = null;
			frame._cmr = this;
			const image = this._frame.querySelector('.cmr-image');
			const container = frame.parentNode;

			Object.defineProperty(this, 'geometry', {
				get() {
					const angle = Number.parseFloat((frame.style.transform.match(/rotate\((.*?)deg\)/) || [])[1]) || 0;
					return {
						// FRAME

						// container relative position
						frameWidth: frame.clientWidth,
						frameHeight: frame.clientHeight,
						frameX0: frame.offsetLeft,
						frameY0: frame.offsetTop,
						frameX1: frame.offsetLeft + frame.clientWidth,
						frameY1: frame.offsetTop + frame.clientHeight,
						frameCenterX: frame.offsetLeft + frame.clientWidth / 2,
						frameCenterY: frame.offsetTop + frame.clientHeight / 2,
						frameContainerX0: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, 0, 0)[0],
						frameContainerY0: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, 0, 0)[1],
						frameContainerX1: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, frame.clientWidth, frame.clientHeight)[0],
						frameContainerY1: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, frame.clientWidth, frame.clientHeight)[1],
						frameCenterContainerX: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, frame.clientWidth / 2, frame.clientHeight / 2)[0],
						frameCenterContainerY: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, frame.clientWidth / 2, frame.clientHeight / 2)[1],

						// IMAGE
						imageWidth: image.clientWidth,
						imageHeight: image.clientHeight,

						// frame relative position
						imageFrameX0: image.offsetLeft,
						imageFrameY0: image.offsetTop,
						imageFrameX1: image.offsetLeft + image.offsetLeft,
						imageFrameY1: image.offsetTop + image.offsetTop,
						imageCenterFrameX: image.offsetLeft + image.offsetLeft / 2,
						imageCenterFrameY: image.offsetTop + image.offsetTop / 2,

						// container unrotated relative position
						imageUnrotatedContainerX0: frame.offsetLeft + image.offsetLeft,
						imageUnrotatedContainerY0: frame.offsetTop + image.offsetTop,
						imageUnrotatedContainerX1: frame.offsetLeft + image.offsetLeft + image.clientWidth,
						imageUnrotatedContainerY1: frame.offsetTop + image.offsetTop + image.clientHeight,
						imageCenterUnrotatedContainerX: image.offsetLeft + image.clientWidth / 2,
						imageCenterUnrotatedContainerY: image.offsetTop + image.clientHeight / 2,

						// container relative position
						imageContainerX0: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, image.offsetLeft, image.offsetTop)[0],
						imageContainerY0: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, image.offsetLeft, image.offsetTop)[1],
						imageContainerX1: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, image.offsetLeft + image.clientWidth, image.offsetTop + image.clientHeight)[0],
						imageContainerY1: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, image.offsetLeft + image.clientWidth, image.offsetTop + image.clientHeight)[1],
						imageCenterContainerX: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, image.offsetLeft + image.clientWidth / 2, image.offsetTop + image.clientHeight / 2)[0],
						imageCenterContainerY: this._relToWorld(frame.offsetLeft, frame.offsetTop, frame.clientWidth, frame.clientHeight, angle, image.offsetLeft + image.clientWidth / 2, image.offsetTop + image.clientHeight / 2)[1],

						// CONTAINER
						containerWidth: container.clientWidth,
						containerHeight: container.clientHeight,

						// document absolute container position
						containerX0: container.getBoundingClientRect().left,
						containerY0: container.getBoundingClientRect().top,
						containerX1: container.getBoundingClientRect().left + container.clientWidth,
						containerY1: container.getBoundingClientRect().top + container.clientHeight,
						containerCenterX: container.getBoundingClientRect().left + container.clientWidth / 2,
						containerCenterY: container.getBoundingClientRect().top + container.clientHeight / 2,

						// ADDITIONAL VALUES
						angle: angle,
						angleDegrees: angle,
						angleRadians: (angle * Math.PI) / 180,
						ratio: image.naturalWidth / image.naturalHeight
					};
				}
			});
		}

		getFrame() {
			return this._frame;
		}

		_relToWorld(offsetLeft, offsetTop, width, height, angleDegrees, x, y) {
			const angleRadians = (angleDegrees * Math.PI) / 180;
			const cx = width / 2;
			const cy = height / 2;
			const rotatedCx = cx * Math.cos(angleRadians) - cy * Math.sin(angleRadians);
			const rotatedCy = cx * Math.sin(angleRadians) + cy * Math.cos(angleRadians);
			const newDx = offsetLeft + (cx - rotatedCx);
			const newDy = offsetTop + (cy - rotatedCy);
			const rotatedX = (x * Math.cos(angleRadians)) - (y * Math.sin(angleRadians));
			const rotatedY = (x * Math.sin(angleRadians)) + (y * Math.cos(angleRadians));
			const pointX = rotatedX + newDx;
			const pointY = rotatedY + newDy;
			return [pointX, pointY];
		}

		_worldToRel(offsetLeft, offsetTop, width, height, angleDegrees, x, y) {
			const angleRadians = (angleDegrees * Math.PI) / 180;
			const cx = width / 2;
			const cy = height / 2;
			const rotatedCx = cx * Math.cos(angleRadians) - cy * Math.sin(angleRadians);
			const rotatedCy = cx * Math.sin(angleRadians) + cy * Math.cos(angleRadians);
			const newDx = offsetLeft + (cx - rotatedCx);
			const newDy = offsetTop + (cy - rotatedCy);
			const pointX = x - newDx;
			const pointY = y - newDy;
			const rotatedX = (pointX * Math.cos(angleRadians)) + (pointY * Math.sin(angleRadians));
			const rotatedY = (-pointX * Math.sin(angleRadians)) + (pointY * Math.cos(angleRadians));
			return [rotatedX, rotatedY];
		}

		_containerToFrameRelative(x, y) {
			return this._worldToRel(
				this.geometry.frameX0,
				this.geometry.frameY0,
				this.geometry.frameWidth,
				this.geometry.frameHeight,
				this.geometry.angle,
				x,
				y
			);
		}

		_frameToContainer(x, y) {
			return this._relToWorld(this.geometry.frameX0, this.geometry.frameY0, this.geometry.frameWidth, this.geometry.frameHeight, this.geometry.angle, x, y);
		}


		_baseToRotateBase(x, y) {
			return this._worldToRel(0, 0, this.geometry.containerWidth, this.geometry.containerHeight, this.geometry.angleDegrees, x, y);
		}

		removeController() {
			const frame = this._frame;
			const image = frame.querySelector('.cmr-image');
			const container = frame.parentNode;

			if (this._controller === null || this._controller.parentNode !== container)
				throw new Error('No controller found');

			const imageController = container.querySelector('.cmr-image-controller');
			const frameController = container.querySelector('.cmr-frame-controller');

			image.style.width = imageController.style.width;
			image.style.height = imageController.style.height;
			frame.style.width = frameController.style.width;
			frame.style.height = frameController.style.height;

			image.style.left = imageController.offsetLeft - frameController.offsetLeft + 'px';
			image.style.top = imageController.offsetTop - frameController.offsetTop + 'px';

			const [frameControllerX, frameControllerY] = this._relToWorld(
				0, 0, this.geometry.containerWidth, this.geometry.containerHeight, this.geometry.angleDegrees, frameController.offsetLeft, frameController.offsetTop
			);

			const [left, top] = this.calculateLeftTopPositionByAbsoluteXYofUpperLeftCorner(this.geometry.frameWidth, this.geometry.frameHeight, this.geometry.angleDegrees, frameControllerX, frameControllerY);

			frame.style.left = left + 'px';
			frame.style.top = top + 'px';

			container.classList.remove('edit');
			frame.classList.remove('edit');
			this._controller.remove();
			this._controller = null;
		}

		calculateLeftTopPositionByAbsoluteXYofUpperLeftCorner(rect2Width, rect2Height, rect2Angle, X, Y) {
			const angleInRadians = rect2Angle * Math.PI / 180;

			const rect2CenterX = X + (rect2Width / 2) * Math.cos(angleInRadians) - (rect2Height / 2) * Math.sin(angleInRadians);
			const rect2CenterY = Y + (rect2Height / 2) * Math.cos(angleInRadians) + (rect2Width / 2) * Math.sin(angleInRadians);

			const rect2Top = rect2CenterY - rect2Height / 2;
			const rect2Left = rect2CenterX - rect2Width / 2;
			return [rect2Left, rect2Top];
		}

		setController() {
			const frame = this._frame;
			const image = frame.querySelector('.cmr-image');
			const container = frame.parentNode;

			if (container.querySelector('.cmr-controller'))
				throw new Error('frame is already exist');

			frame.classList.add('edit');
			container.classList.add('edit');

			const imageController = this._createElement('div', {
				options: {
					style: `position: absolute; width: ${this.geometry.imageWidth}px; height: ${this.geometry.imageHeight}px;`,
					className: 'cmr-image-controller',
				},
				init: element => {
					const [imageControllerX0, imageControllerY0] = this._worldToRel(0, 0, this.geometry.containerWidth, this.geometry.containerHeight, this.geometry.angleDegrees, this.geometry.imageContainerX0, this.geometry.imageContainerY0);
					element.style.left = imageControllerX0 + 'px';
					element.style.top = imageControllerY0 + 'px';
				},
				children: [
					Object.assign(image.cloneNode(true), {
						style: '',
						className: 'cmr-image-copy'
					})
				].concat([
					'ne', 'nw', 'sw', 'se'
				].map(positionName => {
					return this._createElement('span', {
						options: {
							className: `cmr-resizer-point cmr-point-${positionName}`,
							onmousedown: mouseDownEvent => {
								const startImageWidth = imageController.clientWidth;
								const startImageHeight = imageController.clientHeight;
								const startImageX0 = imageController.offsetLeft;
								const startImageY0 = imageController.offsetTop;
								const startImageX1 = imageController.offsetLeft + imageController.clientWidth;
								const startImageY1 = imageController.offsetTop + imageController.clientHeight;

								const resize = resizePointMoveEvent => {
									const relativeBaseX = resizePointMoveEvent.clientX - this.geometry.containerX0;
									const relativeBaseY = resizePointMoveEvent.clientY - this.geometry.containerY0;
									const [x, y] = this._baseToRotateBase(relativeBaseX, relativeBaseY);

									switch (positionName) {
										case 'se':
											{
												const relImageX = x - imageController.offsetLeft;
												const relImageY = y - imageController.offsetTop;
												const perimteter = relImageX + relImageY;
												let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
												let calculatedHeight = perimteter - calculatedWidth;

												const minWidth = frameController.offsetLeft + frameController.clientWidth - imageController.offsetLeft;
												const minHeight = frameController.offsetTop + frameController.clientHeight - imageController.offsetTop;
												if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
													calculatedWidth = minHeight * this.geometry.ratio;
													calculatedHeight = minHeight;
												}
												if (calculatedWidth < minWidth && minHeight <= minWidth / this.geometry.ratio) {
													calculatedWidth = minWidth;
													calculatedHeight = minWidth / this.geometry.ratio;
												}

												imageController.style.width = calculatedWidth + 'px';
												imageController.style.height = calculatedHeight + 'px';
												break;
											}
										case 'ne':
											{
												const relImageX = x - imageController.offsetLeft;
												const relImageY = -y + imageController.offsetTop + imageController.clientHeight;
												const perimteter = relImageX + relImageY;
												let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
												let calculatedHeight = perimteter - calculatedWidth;

												const minWidth = frameController.offsetLeft + frameController.clientWidth - imageController.offsetLeft;
												const minHeight = startImageY1 - frameController.offsetTop;
												if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
													calculatedWidth = minHeight * this.geometry.ratio;
													calculatedHeight = minHeight;
												}
												if (calculatedWidth < minWidth && minHeight <= minWidth / this.geometry.ratio) {
													calculatedWidth = minWidth;
													calculatedHeight = minWidth / this.geometry.ratio;
												}

												imageController.style.top = startImageY0 + (startImageHeight - calculatedHeight) + 'px';
												imageController.style.width = calculatedWidth + 'px';
												imageController.style.height = calculatedHeight + 'px';
												break;
											}
										case 'sw':
											{
												const relImageX = -x + imageController.offsetLeft + imageController.clientWidth;
												const relImageY = y - imageController.offsetTop;
												const perimteter = relImageX + relImageY;
												let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
												let calculatedHeight = perimteter - calculatedWidth;

												const minWidth = startImageX1 - frameController.offsetLeft;
												const minHeight = frameController.offsetTop + frameController.clientHeight - imageController.offsetTop;
												if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
													calculatedWidth = minHeight * this.geometry.ratio;
													calculatedHeight = minHeight;
												}
												if (calculatedWidth < minWidth && minHeight <= minWidth / this.geometry.ratio) {
													calculatedWidth = minWidth;
													calculatedHeight = minWidth / this.geometry.ratio;
												}

												imageController.style.left = startImageX0 + (startImageWidth - calculatedWidth) + 'px';
												imageController.style.width = calculatedWidth + 'px';
												imageController.style.height = calculatedHeight + 'px';
												break;
											}
										case 'nw':
											{
												const relImageX = -x + imageController.offsetLeft + imageController.clientWidth;
												const relImageY = -y + imageController.offsetTop + imageController.clientHeight;
												const perimteter = relImageX + relImageY;
												let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
												let calculatedHeight = perimteter - calculatedWidth;

												const minWidth = startImageX1 - frameController.offsetLeft;
												const minHeight = startImageY1 - frameController.offsetTop;
												if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
													calculatedWidth = minHeight * this.geometry.ratio;
													calculatedHeight = minHeight;
												}
												if (calculatedWidth < minWidth && minHeight <= minWidth / this.geometry.ratio) {
													calculatedWidth = minWidth;
													calculatedHeight = minWidth / this.geometry.ratio;
												}

												imageController.style.left = startImageX0 + (startImageWidth - calculatedWidth) + 'px';
												imageController.style.top = startImageY0 + (startImageHeight - calculatedHeight) + 'px';
												imageController.style.width = calculatedWidth + 'px';
												imageController.style.height = calculatedHeight + 'px';
												break;
											}
									}
								};

								const clear = () => {
									window.removeEventListener('mousemove', resize);
									window.removeEventListener('mouseup', clear);
								};

								window.addEventListener('mousemove', resize);
								window.addEventListener('mouseup', clear);
							}
						}
					});
				}))
				.concat([
					this._createElement('span', {
						options: {
							className: 'cmr-image-move-wrapper',
							onmousedown: mouseDownEvent => {
								const startRelativeBaseX = mouseDownEvent.clientX - this.geometry.containerX0;
								const startRelativeBaseY = mouseDownEvent.clientY - this.geometry.containerY0;
								const [x, y] = this._baseToRotateBase(startRelativeBaseX, startRelativeBaseY);
								const startRelativeImageX = x - imageController.offsetLeft;
								const startRelativeImageY = y - imageController.offsetTop;

								const move = imageMoveEvent => {
									const relativeBaseX = imageMoveEvent.clientX - this.geometry.containerX0;
									const relativeBaseY = imageMoveEvent.clientY - this.geometry.containerY0;
									const [x, y] = this._baseToRotateBase(relativeBaseX, relativeBaseY);

									const calculatedX = x - startRelativeImageX;
									const calculatedY = y - startRelativeImageY;

									const adjustedX = Math.min(Math.max(calculatedX, frameController.offsetLeft + frameController.clientWidth - imageController.clientWidth), frameController.offsetLeft);
									const adjustedY = Math.min(Math.max(calculatedY, frameController.offsetTop + frameController.clientHeight - imageController.clientHeight), frameController.offsetTop);

									imageController.style.left = adjustedX + 'px';
									imageController.style.top = adjustedY + 'px';
								};

								const clear = () => {
									window.removeEventListener('mousemove', move);
									window.removeEventListener('mouseup',  clear);
								};

								window.addEventListener('mousemove',  move);
								window.addEventListener('mouseup',  clear);
							}
						}
					})
				])
			});

			const frameController = this._createElement('div', {
				options: {
					style: `position: absolute; width: ${this.geometry.frameWidth}px; height: ${this.geometry.frameHeight}px;`,
					className: 'cmr-frame-controller',
				},
				init: element => {
					const [imageControllerX0, imageControllerY0] = this._worldToRel(0, 0, this.geometry.containerWidth, this.geometry.containerHeight, this.geometry.angleDegrees, this.geometry.frameContainerX0, this.geometry.frameContainerY0);
					element.style.left = imageControllerX0 + 'px';
					element.style.top = imageControllerY0 + 'px';
				},
				children: [
						'e', 'n', 'w', 's', 'ne', 'nw', 'sw', 'se'
					].map((function(positionName) {
						return this._createElement('span', {
							options: {
								className: `cmr-frame-controller-point cmr-point-${positionName}`,
								onmousedown: (function(event) {
									event.stopPropagation();
									const startFrameWidth = frameController.clientWidth;
									const startFrameHeight = frameController.clientHeight;
									const startFrameX0 = frameController.offsetLeft;
									const startFrameY0 = frameController.offsetTop;
									const resize = event => {
										const relX = event.clientX - this.geometry.containerX0;
										const relY = event.clientY - this.geometry.containerY0;
										const [
											frameControllerRelX,
											frameControllerRelY
										] = this._baseToRotateBase(relX, relY);
										for (const position of positionName) {
											switch (position) {
												case "e":
													{
														frameController.style.width = Math.min(frameControllerRelX - frameController.offsetLeft, (imageController.clientWidth - (frameController.offsetLeft - imageController.offsetLeft))) + 'px';
														break;
													}
												case "s":
													{
														frameController.style.height = Math.min(frameControllerRelY - frameController.offsetTop, (imageController.clientHeight - (frameController.offsetTop - imageController.offsetTop))) + 'px';
														break;
													}
												case "n":
													{
														const adjustedY = Math.max(imageController.offsetTop, frameControllerRelY);
														frameController.style.height = startFrameHeight - adjustedY + startFrameY0 + 'px';
														frameController.style.top = adjustedY + 'px';
														break;
													}
												case "w":
													{
														const adjustedX = Math.max(imageController.offsetLeft, frameControllerRelX);
														frameController.style.width = startFrameWidth - adjustedX + startFrameX0 + 'px';
														frameController.style.left = adjustedX + 'px';
														break;
													}
											}
										}
									};

									const clear = () => {
										window.removeEventListener('mouseup', clear);
										window.removeEventListener('mousemove', resize);
									};

									window.addEventListener('mousemove', resize);
									window.addEventListener('mouseup', clear);



								}).bind(this)
							}
						});
					}).bind(this))
					.concat(
						[
							'hor', 'vert'
						].map((function(positionType) {
							return this._createElement('span', {
								options: {
									className: `cmr-grid ${positionType}`
								}
							});
						}).bind(this))
					)
					.concat([
						this._createElement('img', {
							options: {
								className: 'cmr-center-symbol',
								src: "data:image/svg+xml,%3C%3Fxml%20version%3D'1.0'%20encoding%3D'utf-8'%3F%3E%3Csvg%20width%3D'800px'%20height%3D'800px'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20fill-rule%3D'evenodd'%20clip-rule%3D'evenodd'%20d%3D'M11%2017C11%2017.5523%2011.4477%2018%2012%2018C12.5523%2018%2013%2017.5523%2013%2017V13H17C17.5523%2013%2018%2012.5523%2018%2012C18%2011.4477%2017.5523%2011%2017%2011H13V7C13%206.44771%2012.5523%206%2012%206C11.4477%206%2011%206.44771%2011%207V11H7C6.44772%2011%206%2011.4477%206%2012C6%2012.5523%206.44772%2013%207%2013H11V17Z'%20opacity%3D'0.53'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E"
							}
						})
					])
			});

			const controller = this._createElement('div', {
				options: {
					style: `position: absolute; width: 100%; height: 100%; transform: rotate(${this.geometry.angleDegrees}deg);`,
					className: 'cmr-controller'
				},
				children: [
					frameController,
					imageController
				],
				parent: container
			});

			return this._controller = controller;

		}

		_createElement(tagName, {
			options = {},
			attributes = {},
			children = [],
			parent,
			init
		}) {
			const element = Object.assign(document.createElement(tagName), options);
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
				throw new Error('Instance was already disposed');
			const frameperWrapper = this._container.querySelector('.cmr-rotated-Container-wrapper');
			if (frameperWrapper !== null) {
				this.removeframe();
			}
			delete this._container._cmr;
			this._container = null;
			this._state.isDisposed = true;
		}

	}

	ImageProcessor.isImageProcessor = function(container) {
		return '_cmr' in container;
	};

	CMR.ImageProcessor = ImageProcessor;

})();