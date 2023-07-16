# CMRLibrary
Native library for cropping, resizing, and repositioning HTML images in JavaScript using only CSS
Нативная JavaScript библиотека для кадрирования, изменения размеров и позиционирования HTML изображений посредством CSS стилей.

## Подключение
Пример стандартного подключения:
```html
<head>
<!-- Подключение библиотеки -->
<link href="CMRLibrary.css" rel="stylesheet">
<script src="CMRLibrary.js"></script>
<!-- Конец подключения библиотеки -->
</head>
```
Библиотеку можно подключить и иным образом, главное, чтобы скрипт библиотеки был загружен до его непосредственного использования

## Структура библиотеки
Библиотека представляет собой объект, расположенный в глобальной области (в объекте окна), имеющий имя "CMR"
Объект CMR имеет следующую структуру:
```js
CMR Object {
  class ImageProcessor
}
```

## CMR.ImageProcessor() constructor
Объект ImageProcessor отвечает за основую реализацию функционала библиотеки

**Синтаксис**
```js
new ImageProcessor(frameElement)
```

**Аргументы**

`Element` - Элемент контейнера изображения

**Пример**
```js
const frame = document.getElementById("example");
const imageProcessor = new window.CMR.ImageProcessor(frame);
```
Элемент frame должен иметь следующую структуру:
```html
<div id="example" class="cmr-frame" style="width: 221.476px; height: 242.59px; left: 459.25px; top: 93.485px; transform: rotate(30deg);">
    <img class="cmr-image" src="image.png" style="width: 428px; height: 321px; left: -113px; top: -57px;">
</div>
```

Посмотреть пример можно по ссылке:
https://doctor8296.github.io/CMRLibrary/


## CMR.ImageProcessor.prototype.getFrame()
Метод-геттер, для определения элемента фрейма, над конторым осуществляет контроль объект

**Синтаксис**
```js
getFrame()
```

**Возвращаемое значение**
`Element` - элемент основы

**Пример использования**
```js
const frame = document.getElementById("example");
const imageController = new window.CMR.ImageProcessor(frame);

console.log(frame === imageProcessor.getFrame()); // expected output: true
```

## CMR.ImageProcessor.prototype.setController()
Метод для инициализации кадрирования (добавление элементов управления)

**Синтаксис**
```js
setController()
```

**Возвращаемое значение**
`Element` - элемент покрытия, который добавляется в элемент основы, посредством которого происходит управление

**Исключения**
> Error Crop is already exist - элемент покрытия уже существует

**Пример использования**
```js
const frame = document.getElementById("example");
const imageController = new window.CMR.ImageProcessor(frame);
imageController.setController();
```

## CMR.ImageProcessor.prototype.removeController()
Метод для удаления элемента покрытия (завершение редактирования)

**Синтаксис**
```js
removeController()
```

**Возвращаемое значение**
`undefined`

**Пример использования**
```js
const frame = document.getElementById("example");
const imageController = new window.CMR.ImageProcessor(frame);
imageController.setFrame();
// some edits
imageController.removeCrop();
```

## get CMR.ImageProcessor.prototype.geometry
Свойства отображающее текущее состояние изображения
```js
{
    // FRAME

    // container relative position
    frameWidth: Number,
    frameHeight: Number,
    frameX0: Number,
    frameY0: Number,
    frameX1: Number,
    frameY1: Number,
    frameCenterX: Number,
    frameCenterY: Number,
    frameContainerX0: Number,
    frameContainerY0: Number,
    frameContainerX1: Number,
    frameContainerY1: Number,
    frameCenterContainerX: Number,
    frameCenterContainerY: Number,

    // IMAGE
    imageWidth: Number,
    imageHeight: Number,

    // frame relative position
    imageFrameX0: Number,
    imageFrameY0: Number,
    imageFrameX1: Number,
    imageFrameY1: Number,
    imageCenterFrameX: Number,
    imageCenterFrameY: Number,

    // container unrotated relative position
    imageUnrotatedContainerX0: Number,
    imageUnrotatedContainerY0: Number,
    imageUnrotatedContainerX1: Number,
    imageUnrotatedContainerY1: Number,
    imageCenterUnrotatedContainerX: Number,
    imageCenterUnrotatedContainerY: Number,

    // container relative position
    imageContainerX0: Number,
    imageContainerY0: Number,
    imageContainerX1: Number,
    imageContainerY1: Number,
    imageCenterContainerX: Number,
    imageCenterContainerY: Number,

    // CONTAINER
    containerWidth: Number,
    containerHeight: Number,

    // document absolute container position
    containerX0: Number,
    containerY0: Number,
    containerX1: Number,
    containerY1: Number,
    containerCenterX: Number,
    containerCenterY: Number,

    // ADDITIONAL VALUES
    angle: Number,
    angleDegrees: Number,
    angleRadians: Number,
    ratio: Number
}
```
П.С. Данные не актуальны в момент редактирования.
До завершения редактирования в объекте будут храниться данные, какими они были до редактирования.