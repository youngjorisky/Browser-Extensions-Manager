function selectionActive(selected) {
  document.querySelectorAll('.selections button').forEach(btn => {
    btn.classList.remove('active');
  });
  selected.classList.add('active');
}

const toggleButton = document.getElementById("toggle-btn");
const imageChange = document.getElementById("toggle-icon");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("night-theme");
  
  const isNight = document.body.classList.contains("night-theme");
  imageChange.src = isNight 
    ? "./assets/images/icon-sun.svg" 
    : "./assets/images/icon-moon.svg";
  imageChange.alt = isNight ? "Sun icon" : "Moon icon";
});
