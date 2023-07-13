// const frameController = this._createElement('div', {
// 	options: {
// 		style: frame.getAttribute('style'),
// 		className: 'cmr-frame-controller',
// 	},
// 	children: [
// 		'e', 'n', 'w', 's', 'ne', 'nw', 'sw', 'se'
// 	].map((function (positionName) {
// 		return this._createElement('span', {
// 			options: {
// 				className: `cmr-frame-controller-point cmr-point-${positionName}`,
// 				onmousedown: mouseDownEvent => {
// 					mouseDownEvent.stopPropagation();

// 					const startFrameWidth = this.geometry.frameWidth;
// 					const startFrameHeight = this.geometry.frameHeight;

// 					const startFrameX0 = this.geometry.frameX0;
// 					const startFrameY0 = this.geometry.frameY0;

// 					const startFrameContainerX0 = this.geometry.frameContainerX0;
// 					const startFrameContainerY0 = this.geometry.frameContainerY0;
// 					const startFrameContainerX1 = this.geometry.frameContainerX1;
// 					const startFrameContainerY1 = this.geometry.frameContainerY1;

// 					const mouseMoveResizeFunction = event => {
// 						const relX = event.clientX - this.geometry.containerX0;
// 						const relY = event.clientY - this.geometry.containerY0;

// 						const [frameRelX, frameRelY] = this._worldToRel(
// 							startFrameX0,
// 							startFrameY0,
// 							startFrameWidth,
// 							startFrameHeight,
// 							this.geometry.angle,
// 							relX,
// 							relY
// 						);

// 						switch (positionName) {
// 							case "e":
// 							{
// 								frame.style.width = frameController.style.width = Math.min(frameRelX, this.geometry.imageWidth + this.geometry.imageFrameX0) + 'px';
// 								const containerOffsetX = startFrameContainerX0 - this.geometry.frameContainerX0;
// 								const containerOffsetY = startFrameContainerY0 - this.geometry.frameContainerY0;

// 								console.log(startFrameContainerY0 - this.geometry.frameContainerY0, startFrameContainerY1 - this.geometry.frameContainerY1);

// 								frame.style.left = frameController.style.left = this.geometry.frameX0 + containerOffsetX + 'px';
// 								frame.style.top = frameController.style.top = this.geometry.frameY0 + containerOffsetY + 'px';
// 								break;
// 							}
// 							case "s": 
// 							{
// 								frame.style.height = frameController.style.height = Math.min(frameRelY, this.geometry.imageHeight + this.geometry.imageFrameY0) + 'px';
// 								const containerOffsetX = startFrameContainerX0 - this.geometry.frameContainerX0;
// 								const containerOffsetY = startFrameContainerY0 - this.geometry.frameContainerY0;
// 								frame.style.left = frameController.style.left = this.geometry.frameX0 + containerOffsetX + 'px';
// 								frame.style.top = frameController.style.top = this.geometry.frameY0 + containerOffsetY + 'px';
// 								break;
// 							}

// 							case "se": {
// 								frame.style.width = frameController.style.width = Math.min(frameRelX, this.geometry.imageWidth + this.geometry.imageFrameX0) + 'px';
// 								frame.style.height = frameController.style.height = Math.min(frameRelY, this.geometry.imageHeight + this.geometry.imageFrameY0) + 'px';
// 								const containerOffsetX = startFrameContainerX0 - this.geometry.frameContainerX0;
// 								const containerOffsetY = startFrameContainerY0 - this.geometry.frameContainerY0;
// 								frame.style.left = frameController.style.left = this.geometry.frameX0 + containerOffsetX + 'px';
// 								frame.style.top = frameController.style.top = this.geometry.frameY0 + containerOffsetY + 'px';
// 								break
// 							}
// 							case "n":
// 							{
// 								frame.style.height = frameController.style.height = startFrameHeight - frameRelY + 'px';
// 								frame.style.top = frameController.style.top = startFrameY0 + (startFrameHeight - (startFrameHeight - frameRelY)) + 'px';
// 								const containerOffsetX = startFrameContainerX1 - this.geometry.frameContainerX1;
// 								const containerOffsetY = startFrameContainerY1 - this.geometry.frameContainerY1;
// 								frame.style.left = frameController.style.left = this.geometry.frameX0 + containerOffsetX + 'px';
// 								frame.style.top = frameController.style.top = this.geometry.frameY0 + containerOffsetY + 'px';
// 								break;
// 							}
// 							case "w":
// 							{
// 								frame.style.width = frameController.style.width = startFrameWidth - frameRelX + 'px';
// 								frame.style.left = frameController.style.left = startFrameX0 + (startFrameWidth - (startFrameWidth - frameRelX)) + 'px';
// 								const containerOffsetX = startFrameContainerX1 - this.geometry.frameContainerX1;
// 								const containerOffsetY = startFrameContainerY1 - this.geometry.frameContainerY1;
// 								frame.style.left = frameController.style.left = this.geometry.frameX0 + containerOffsetX + 'px';
// 								frame.style.top = frameController.style.top = this.geometry.frameY0 + containerOffsetY + 'px';
// 								break;
// 							}

// 							case "nw": {
// 								frame.style.height = frameController.style.height = startFrameHeight - frameRelY + 'px';
// 								frame.style.top = frameController.style.top = startFrameY0 + (startFrameHeight - (startFrameHeight - frameRelY)) + 'px';
// 								frame.style.width = frameController.style.width = startFrameWidth - frameRelX + 'px';
// 								frame.style.left = frameController.style.left = startFrameX0 + (startFrameWidth - (startFrameWidth - frameRelX)) + 'px';
// 								const containerOffsetX = startFrameContainerX1 - this.geometry.frameContainerX1;
// 								const containerOffsetY = startFrameContainerY1 - this.geometry.frameContainerY1;
// 								frame.style.left = frameController.style.left = this.geometry.frameX0 + containerOffsetX + 'px';
// 								frame.style.top = frameController.style.top = this.geometry.frameY0 + containerOffsetY + 'px';
// 								break;
// 							}

// 							case "sw": {
// 								// w

// 								frame.style.width = frameController.style.width = startFrameWidth - frameRelX + 'px';
// 								frame.style.left = frameController.style.left = startFrameX0 + (startFrameWidth - (startFrameWidth - frameRelX)) + 'px';
// 								frame.style.height = frameController.style.height = frameRelY + 'px';

// 								const containerOffsetX = startFrameContainerX0 - this.geometry.frameContainerX0;
// 								const containerOffsetY = startFrameContainerY0 - this.geometry.frameContainerY0;

// 								frame.style.left = frameController.style.left = this.geometry.frameX0 + containerOffsetX + 'px';
// 								frame.style.top = frameController.style.top = this.geometry.frameY0 + containerOffsetY + 'px';


// 								break;
// 							}

// 						}
// 					};

// 					const clear = () => {
// 						window.removeEventListener('mouseup', clear);
// 						window.removeEventListener('mousemove', mouseMoveResizeFunction);
// 					};

// 					window.addEventListener('mousemove', mouseMoveResizeFunction);
// 					window.addEventListener('mouseup', clear);

// 				}
// 			}
// 		});
// 	}).bind(this))
// 	.concat(
// 		[
// 			'hor', 'vert'
// 		].map((function (positionType) {
// 			return this._createElement('span', {
// 				options: {
// 					className: `cmr-grid ${positionType}`
// 				}
// 			});
// 		}).bind(this))
// 	)
// 	.concat([
// 		this._createElement('img', {
// 			options: {
// 				className: 'cmr-center-symbol',
// 				src: "data:image/svg+xml,%3C%3Fxml%20version%3D'1.0'%20encoding%3D'utf-8'%3F%3E%3Csvg%20width%3D'800px'%20height%3D'800px'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20fill-rule%3D'evenodd'%20clip-rule%3D'evenodd'%20d%3D'M11%2017C11%2017.5523%2011.4477%2018%2012%2018C12.5523%2018%2013%2017.5523%2013%2017V13H17C17.5523%2013%2018%2012.5523%2018%2012C18%2011.4477%2017.5523%2011%2017%2011H13V7C13%206.44771%2012.5523%206%2012%206C11.4477%206%2011%206.44771%2011%207V11H7C6.44772%2011%206%2011.4477%206%2012C6%2012.5523%206.44772%2013%207%2013H11V17Z'%20opacity%3D'0.53'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E"
// 			}
// 		})
// 	])
// });

// const imageController = this._createElement('div', {
// 	options: {
// 		className: 'cmr-resize-image-wrapper',
// 		style: `width: ${this.geometry.imageWidth}px; height: ${this.geometry.imageHeight}px; left: ${this.geometry.imageContainerX0}px; top: ${this.geometry.imageContainerY0}px;); transform: rotate(${this.geometry.angleDegrees}deg);`,
// 	},
// 	children: 
// 	[
// 		'ne', 'nw', 'sw', 'se'
// 	].map(positionName => {
// 		return this._createElement('span', {
// 			options: {
// 				className: `cmr-resizer-point cmr-point-${positionName}`,
// 				onmousedown: mouseDownEvent => {
// 					const startImageWidth = this.geometry.imageWidth;
// 					const startImageHeight = this.geometry.imageHeight;
// 					const startImageX0 = imageController.offsetLeft;
// 					const startImageY0 = imageController.offsetTop;
// 					const startImageY1 = this.geometry.imageEndY;
// 					const startImageX1 = this.geometry.imageEndX;
// 					window.addEventListener('mousemove', this._state.resizePointMoveFunction = resizePointMoveEvent => {
// 						const relativeContainerX = resizePointMoveEvent.clientX - this.geometry.ContainerX;
// 						const relativeContainerY = resizePointMoveEvent.clientY - this.geometry.ContainerY;
// 						const [x, y] = this._ContainerToRotateContainer(relativeContainerX, relativeContainerY);

// 						switch(positionName) {
// 							case 'se': {
// 								const relImageX = x - imageController.offsetLeft;
// 								const relImageY = y - imageController.offsetTop;
// 								const perimteter = relImageX + relImageY;
// 								let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
// 								let calculatedHeight = perimteter - calculatedWidth;

// 								const minWidth = this.geometry.realframeEndX - imageController.offsetLeft;
// 								const minHeight = this.geometry.realframeEndY - imageController.offsetTop;
// 								if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
// 									calculatedWidth = (minHeight) * this.geometry.ratio;
// 									calculatedHeight = minHeight;
// 								}
// 								if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.ratio) {
// 									calculatedWidth = minWidth;
// 									calculatedHeight = (minWidth) / this.geometry.ratio;
// 								}

// 								resizeWrapper.style.width = image.style.width = calculatedWidth + 'px';
// 								resizeWrapper.style.height = image.style.height = calculatedHeight + 'px';
// 								break;
// 							}
// 							case 'ne': {
// 								const relImageX = x - imageController.offsetLeft;
// 								const relImageY = -y + imageController.offsetTop + this.geometry.imageHeight;
// 								const perimteter = relImageX + relImageY;
// 								let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
// 								let calculatedHeight = perimteter - calculatedWidth;

// 								const minWidth = this.geometry.realframeEndX - imageController.offsetLeft;
// 								const minHeight = startImageY1 - this.geometry.frameY;
// 								if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
// 									calculatedWidth = (minHeight) * this.geometry.ratio;
// 									calculatedHeight = minHeight;
// 								}
// 								if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.ratio) {
// 									calculatedWidth = minWidth;
// 									calculatedHeight = (minWidth) / this.geometry.ratio;
// 								}

// 								resizeWrapper.style.top = image.style.top = startImageY0 + (startImageHeight - calculatedHeight) + 'px';
// 								resizeWrapper.style.width = image.style.width = calculatedWidth + 'px';
// 								resizeWrapper.style.height = image.style.height = calculatedHeight + 'px';
// 								break;
// 							}
// 							case 'sw': {
// 								const relImageX = -x + imageController.offsetLeft + this.geometry.imageWidth;
// 								const relImageY = y - imageController.offsetTop;
// 								const perimteter = relImageX + relImageY;
// 								let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
// 								let calculatedHeight = perimteter - calculatedWidth;

// 								const minWidth = startImageX1 - this.geometry.frameX;
// 								const minHeight = this.geometry.realframeEndY - imageController.offsetTop;
// 								if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
// 									calculatedWidth = (minHeight) * this.geometry.ratio;
// 									calculatedHeight = minHeight;
// 								}
// 								if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.ratio) {
// 									calculatedWidth = minWidth;
// 									calculatedHeight = (minWidth) / this.geometry.ratio;
// 								}

// 								resizeWrapper.style.left = image.style.left = startImageX0 + (startImageWidth - calculatedWidth) + 'px';
// 								resizeWrapper.style.width = image.style.width = calculatedWidth + 'px';
// 								resizeWrapper.style.height = image.style.height = calculatedHeight + 'px';
// 								break;
// 							}
// 							case 'nw': {
// 								const relImageX = -x + imageController.offsetLeft + this.geometry.imageWidth;
// 								const relImageY = -y + imageController.offsetTop + this.geometry.imageHeight;
// 								const perimteter = relImageX + relImageY;
// 								let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
// 								let calculatedHeight = perimteter - calculatedWidth;

// 								const minWidth = startImageX1 - this.geometry.frameX;
// 								const minHeight = startImageY1 - this.geometry.frameY;
// 								if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
// 									calculatedWidth = (minHeight) * this.geometry.ratio;
// 									calculatedHeight = minHeight;
// 								}
// 								if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.ratio) {
// 									calculatedWidth = minWidth;
// 									calculatedHeight = (minWidth) / this.geometry.ratio;
// 								}

// 								resizeWrapper.style.left = image.style.left = startImageX0 + (startImageWidth - calculatedWidth) + 'px';
// 								resizeWrapper.style.top = image.style.top = startImageY0 + (startImageHeight - calculatedHeight) + 'px';
// 								resizeWrapper.style.width = image.style.width = calculatedWidth + 'px';
// 								resizeWrapper.style.height = image.style.height = calculatedHeight + 'px';
// 								break;
// 							}
// 						}
// 					});
// 					window.addEventListener('mouseup', this._state.cancelResizeMoveFunction = () => {
// 						window.removeEventListener('mousemove', this._state.resizePointMoveFunction);
// 						window.removeEventListener('mouseup', this._state.cancelResizeMoveFunction);
// 					});
// 				}
// 			}
// 		});
// 	})
// 	.concat([
// 		Object.assign(image.cloneNode(true), {
// 			style: '',
// 			className: 'cmr-image-copy',
// 			draggable: false
// 		})
// 	])
// 	.concat([
// 		this._createElement('span', {
// 			options: {
// 				className: 'cmr-frame-controller-wrapper',
// 				onmousedown: mouseDownEvent => {

// 					const startContainerX = mouseDownEvent.clientX - this.geometry.containerX0;
// 					const startContainerY = mouseDownEvent.clientY - this.geometry.containerY0;
// 					const startRelativeFrameX = startContainerX - this.geometry.frameX0;
// 					const startRelativeFrameY = startContainerY - this.geometry.frameY0;

// 					const mouseMoveCallback = mouseMoveEvent => {
// 						const relativeContainerX = mouseMoveEvent.clientX - this.geometry.containerX0;
// 						const relativeContainerY = mouseMoveEvent.clientY - this.geometry.containerY0;

// 						const calculatedX = relativeContainerX - startRelativeFrameX;
// 						const calculatedY = relativeContainerY - startRelativeFrameY;

// 						imageController.style.left = frame.style.left = calculatedX + 'px';
// 						imageController.style.top = frame.style.top = calculatedY + 'px';
// 					};

// 					const mouseUpCallback = () => {
// 						window.removeEventListener('mousemove', mouseMoveCallback);
// 						window.removeEventListener('mouseup', mouseUpCallback);
// 					};

// 					window.addEventListener('mousemove', mouseMoveCallback);
// 					window.addEventListener('mouseup', mouseUpCallback);
// 				}
// 			}
// 		})
// 	])
// });

// const controller = this._createElement('div', {
// 	options: {
// 		className: 'cmr-controller',
// 	},
// 	children: [
// 		frameController,
// 		imageController
// 	],
// 	parent: container
// });







// frame.classList.add('edit');

// const resizeWrapper = this._createElement('div', {
// 	options: {
// 		className: 'cmr-resize-image-wrapper',
// 		style: `width: ${this.geometry.imageWidth}px; height: ${this.geometry.imageHeight}px; left: ${imageController.offsetLeft}px; top: ${imageController.offsetTop}px;);`,
// 	},
// 	children: [
// 		'ne', 'nw', 'sw', 'se'
// 	].map(positionName => {
// 		return this._createElement('span', {
// 			options: {
// 				className: `cmr-resizer-point cmr-point-${positionName}`,
// 				onmousedown: mouseDownEvent => {
// 					const startImageWidth = this.geometry.imageWidth;
// 					const startImageHeight = this.geometry.imageHeight;
// 					const startImageX0 = imageController.offsetLeft;
// 					const startImageY0 = imageController.offsetTop;
// 					const startImageY1 = this.geometry.imageEndY;
// 					const startImageX1 = this.geometry.imageEndX;
// 					window.addEventListener('mousemove', this._state.resizePointMoveFunction = resizePointMoveEvent => {
// 						const relativeContainerX = resizePointMoveEvent.clientX - this.geometry.ContainerX;
// 						const relativeContainerY = resizePointMoveEvent.clientY - this.geometry.ContainerY;
// 						const [x, y] = this._ContainerToRotateContainer(relativeContainerX, relativeContainerY);

// 						switch(positionName) {
// 							case 'se': {
// 								const relImageX = x - imageController.offsetLeft;
// 								const relImageY = y - imageController.offsetTop;
// 								const perimteter = relImageX + relImageY;
// 								let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
// 								let calculatedHeight = perimteter - calculatedWidth;

// 								const minWidth = this.geometry.realframeEndX - imageController.offsetLeft;
// 								const minHeight = this.geometry.realframeEndY - imageController.offsetTop;
// 								if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
// 									calculatedWidth = (minHeight) * this.geometry.ratio;
// 									calculatedHeight = minHeight;
// 								}
// 								if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.ratio) {
// 									calculatedWidth = minWidth;
// 									calculatedHeight = (minWidth) / this.geometry.ratio;
// 								}

// 								resizeWrapper.style.width = image.style.width = calculatedWidth + 'px';
// 								resizeWrapper.style.height = image.style.height = calculatedHeight + 'px';
// 								break;
// 							}
// 							case 'ne': {
// 								const relImageX = x - imageController.offsetLeft;
// 								const relImageY = -y + imageController.offsetTop + this.geometry.imageHeight;
// 								const perimteter = relImageX + relImageY;
// 								let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
// 								let calculatedHeight = perimteter - calculatedWidth;

// 								const minWidth = this.geometry.realframeEndX - imageController.offsetLeft;
// 								const minHeight = startImageY1 - this.geometry.frameY;
// 								if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
// 									calculatedWidth = (minHeight) * this.geometry.ratio;
// 									calculatedHeight = minHeight;
// 								}
// 								if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.ratio) {
// 									calculatedWidth = minWidth;
// 									calculatedHeight = (minWidth) / this.geometry.ratio;
// 								}

// 								resizeWrapper.style.top = image.style.top = startImageY0 + (startImageHeight - calculatedHeight) + 'px';
// 								resizeWrapper.style.width = image.style.width = calculatedWidth + 'px';
// 								resizeWrapper.style.height = image.style.height = calculatedHeight + 'px';
// 								break;
// 							}
// 							case 'sw': {
// 								const relImageX = -x + imageController.offsetLeft + this.geometry.imageWidth;
// 								const relImageY = y - imageController.offsetTop;
// 								const perimteter = relImageX + relImageY;
// 								let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
// 								let calculatedHeight = perimteter - calculatedWidth;

// 								const minWidth = startImageX1 - this.geometry.frameX;
// 								const minHeight = this.geometry.realframeEndY - imageController.offsetTop;
// 								if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
// 									calculatedWidth = (minHeight) * this.geometry.ratio;
// 									calculatedHeight = minHeight;
// 								}
// 								if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.ratio) {
// 									calculatedWidth = minWidth;
// 									calculatedHeight = (minWidth) / this.geometry.ratio;
// 								}

// 								resizeWrapper.style.left = image.style.left = startImageX0 + (startImageWidth - calculatedWidth) + 'px';
// 								resizeWrapper.style.width = image.style.width = calculatedWidth + 'px';
// 								resizeWrapper.style.height = image.style.height = calculatedHeight + 'px';
// 								break;
// 							}
// 							case 'nw': {
// 								const relImageX = -x + imageController.offsetLeft + this.geometry.imageWidth;
// 								const relImageY = -y + imageController.offsetTop + this.geometry.imageHeight;
// 								const perimteter = relImageX + relImageY;
// 								let calculatedWidth = perimteter * this.geometry.ratio / (this.geometry.ratio + 1);
// 								let calculatedHeight = perimteter - calculatedWidth;

// 								const minWidth = startImageX1 - this.geometry.frameX;
// 								const minHeight = startImageY1 - this.geometry.frameY;
// 								if (calculatedHeight < minHeight && minWidth <= minHeight * this.geometry.ratio) {
// 									calculatedWidth = (minHeight) * this.geometry.ratio;
// 									calculatedHeight = minHeight;
// 								}
// 								if (calculatedWidth < minWidth && minHeight <= (minWidth) / this.geometry.ratio) {
// 									calculatedWidth = minWidth;
// 									calculatedHeight = (minWidth) / this.geometry.ratio;
// 								}

// 								resizeWrapper.style.left = image.style.left = startImageX0 + (startImageWidth - calculatedWidth) + 'px';
// 								resizeWrapper.style.top = image.style.top = startImageY0 + (startImageHeight - calculatedHeight) + 'px';
// 								resizeWrapper.style.width = image.style.width = calculatedWidth + 'px';
// 								resizeWrapper.style.height = image.style.height = calculatedHeight + 'px';
// 								break;
// 							}
// 						}
// 					});
// 					window.addEventListener('mouseup', this._state.cancelResizeMoveFunction = () => {
// 						window.removeEventListener('mousemove', this._state.resizePointMoveFunction);
// 						window.removeEventListener('mouseup', this._state.cancelResizeMoveFunction);
// 					});
// 				}
// 			}
// 		});
// 	})
// 	.concat([
// 		this._createElement('span', {
// 			options: {
// 				className: 'cmr-image-move-wrapper',
// 				onmousedown: mouseDownEvent => {
// 					const startRelativeContainerX = mouseDownEvent.clientX - this.geometry.ContainerX;
// 					const startRelativeContainerY = mouseDownEvent.clientY - this.geometry.ContainerY;
// 					const [x, y] = this._ContainerToRotateContainer(startRelativeContainerX, startRelativeContainerY);
// 					const startRelativeImageX = x - imageController.offsetLeft;
// 					const startRelativeImageY = y - imageController.offsetTop;

// 					window.addEventListener('mousemove', this._state.imageMoveFunction = imageMoveEvent => {
// 						const relativeContainerX = imageMoveEvent.clientX - this.geometry.ContainerX;
// 						const relativeContainerY = imageMoveEvent.clientY - this.geometry.ContainerY;
// 						const [x, y] = this._ContainerToRotateContainer(relativeContainerX, relativeContainerY);

// 						const calculatedX = x - startRelativeImageX;
// 						const calculatedY = y - startRelativeImageY;

// 						const adjustedX = Math.min(Math.max(calculatedX, this.geometry.realframeEndX - this.geometry.imageWidth), this.geometry.frameX);
// 						const adjustedY = Math.min(Math.max(calculatedY, this.geometry.realframeEndY - this.geometry.imageHeight), this.geometry.frameY);

// 						resizeWrapper.style.left = image.style.left = adjustedX + 'px';
// 						resizeWrapper.style.top = image.style.top = adjustedY + 'px';
// 					});
// 					window.addEventListener('mouseup', this._state.cancelImageMoveFunction = () => {
// 						window.removeEventListener('mousemove', this._state.imageMoveFunction);
// 						window.removeEventListener('mouseup', this._state.cancelImageMoveFunction);
// 					});
// 				}
// 			}
// 		})
// 	])
// });

// const frameElement = this._createElement('div', {
// 	options: {
// 		style: `width: ${this.geometry.frameWidth}px; height: ${this.geometry.frameHeight}px; left: ${this.geometry.frameX}px; top: ${this.geometry.frameY}px;`,
// 		className: 'cmr-frame'
// 	},
// 	children: [
// 		'e', 'n', 'w', 's', 'ne', 'nw', 'sw', 'se'
// 	].map((function (positionName) {
// 		return this._createElement('span', {
// 			options: {
// 				className: `cmr-frameper-point cmr-point-${positionName}`,
// 				onmousedown: (function (event) {
// 					event.stopPropagation();

// 					const startframeElementSize = [frameElement.clientWidth, frameElement.clientHeight];
// 					const startframeElementOffset = [frameElement.offsetLeft, frameElement.offsetTop];

// 					window.addEventListener('mouseup', this._state.mouseUpResizeFunction = (function () {
// 						window.removeEventListener('mouseup', this._state.mouseUpResizeFunction);
// 						window.removeEventListener('mousemove', this._state.mouseMoveResizeFunction);
// 					}).bind(this));

// 					window.addEventListener('mousemove', this._state.mouseMoveResizeFunction = (function (event) {
// 						const relX = event.clientX - this.geometry.ContainerX;
// 						const relY = event.clientY - this.geometry.ContainerY;

// 						const [frameRelX, frameRelY] = this._ContainerToRotateContainer(relX, relY);

// 						for (const position of positionName) {
// 							switch (position) {
// 								case "e":
// 									{
// 										frame.style.width = frameElement.style.width = Math.min(frameRelX - frameElement.offsetLeft,(this.geometry.imageWidth - (frameElement.offsetLeft - imageController.offsetLeft))) + 'px';
// 										break;
// 									}
// 								case "s":
// 									{
// 										frame.style.height = frameElement.style.height = Math.min(frameRelY - frameElement.offsetTop,(this.geometry.imageHeight - (frameElement.offsetTop - imageController.offsetTop))) + 'px';
// 										break;
// 									}
// 								case "n":
// 									{
// 										const adjustedY = Math.max(imageController.offsetTop, frameRelY);
// 										frame.style.height = frameElement.style.height = startframeElementSize[1] - adjustedY + startframeElementOffset[1] + 'px';
// 										frame.style.top = frameElement.style.top = adjustedY + 'px';
// 										break;
// 									}
// 								case "w":
// 									{
// 										const adjustedX = Math.max(imageController.offsetLeft, frameRelX);
// 										frame.style.width = frameElement.style.width = startframeElementSize[0] - adjustedX + startframeElementOffset[0] + 'px';
// 										frame.style.left = frameElement.style.left = adjustedX + 'px';
// 										break;
// 									}
// 							}
// 						}
// 					}).bind(this));

// 				}).bind(this)
// 			}
// 		});
// 	}).bind(this))
// 	.concat(
// 		[
// 			'hor', 'vert'
// 		].map((function (positionType) {
// 			return this._createElement('span', {
// 				options: {
// 					className: `cmr-frameper-frames ${positionType}`
// 				}
// 			});
// 		}).bind(this))
// 	)
// 	.concat([
// 		this._createElement('img', {
// 			options: {
// 				className: 'cmr-center-symbol',
// 				src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8' width='800px' height='800px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17Z' opacity='0.53' fill='%23ffffff'/%3E%3C/svg%3E"
// 			}
// 		})
// 	])
// });

// const rotatedContainerWrapper = this._createElement('div', {
// 	options: {
// 		style: ` transform: rotate(${this.geometry.angle}deg);`,
// 		className: 'cmr-rotated-Container-wrapper',
// 	},
// 	children: [
// 		frameElement,
// 		resizeWrapper
// 	],
// 	parent: this._container,
// });

// return rotatedContainerWrapper;