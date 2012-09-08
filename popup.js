function getHip() {
  var i = new Ipsum(3, false);
  // Update the textarea.
  var text = document.getElementById('hipsteripsum');
  text.value = i.get();
  text.focus();
  text.select();
}

window.onload = function() {
  var refresh = document.getElementById('refresh');
  refresh.onclick = getHip;
  getHip();
};

