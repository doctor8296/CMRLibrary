const base = document.getElementById("example");
const image = new window.CMR.Interface(base);
console.log(image);

function setCrop() {
    image.setCrop(15, 40);
}

function removeCrop() {
    image.removeCrop();
}
