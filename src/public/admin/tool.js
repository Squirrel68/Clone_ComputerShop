function addItem(name) {
  let input = document.createElement("input");
  input.name = name;
  input.id = index;
  input.type = "text";
  input.style =
    "display:inline-block; width:80%; border: 1px solid RGB(47, 165, 255); height:32px;border-radius:3px 0 0 3px; margin:3px 0 3px 3px";
  document.getElementById(name).appendChild(input);
  let i = document.createElement("i");
  i.style = "color:#fff";
  i.id = index * 10;
  i.classList.add("glyphicon", "glyphicon-remove");
  let del = document.createElement("span");
  del.classList.add("btn", "btn-danger", "item-featured");
  del.id = index + "a";
  del.style =
    "display:inline-block; border-radius: 0 3px 3px 0; height: 33px; margin-top:-2px";
  del.appendChild(i);
  document.getElementById(name).appendChild(del);
  index++;
  var items = document.getElementsByClassName("item-featured");
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", handleClick);
  }
}
function handleClick(event) {
  const id = event.target.id;
  document.getElementById(id / 10).remove();
  document.getElementById(id / 10 + "a").remove();
}
//Upload Images
function uploadImages(upload) {
  const arr = document.getElementsByTagName("img");
  while (arr.length > 0) {
    arr[0].remove();
  }
  let files = upload.files;
  for (let x = 0; x < files.length; x++) {
    let file = files[x];
    let reader = new FileReader();

    reader.onload = function (e) {
      let img = document.createElement("img");
      img.src = e.target.result;
      // img.classList.add("oldimages");
      img.style.height = "100px";
      img.style.width = "auto";
      document.getElementById("imagePreview").appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}
