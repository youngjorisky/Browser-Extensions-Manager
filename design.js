const toggleButton = document.getElementById("toggle-btn");
const imageChange = document.getElementById("toggle-icon");

//Toggle Night Theme
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("night-theme");

  const isNight = document.body.classList.contains("night-theme");
  imageChange.src = isNight
    ? "./assets/images/icon-sun.svg"
    : "./assets/images/icon-moon.svg";
  imageChange.alt = isNight ? "Sun icon" : "Moon icon";
});

//Filter Buttons
const allBtn = document.getElementById("all-button");
const activeBtn = document.getElementById("active-button");
const inactiveBtn = document.getElementById("inactive-button");
const mainContainer = document.getElementById("main-container");

let currentFilter = "all"; // default filter

// 🧱 Load Extensions from JSON
async function loadExtensions() {
  try {
    const response = await fetch("./extensions.json");
    const data = await response.json();

    data.forEach((ext) => {
      const child = document.createElement("div");
      child.classList.add("children");

      child.innerHTML = `
        <div class="description">
          <img src="${ext.logo}" alt="${ext.name}">
          <div class="inline">
            <h3>${ext.name}</h3>
            <p>${ext.description}</p>
          </div>
        </div>
        <div class="buttons">
          <button class="remove">Remove</button>
          <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
          </label>
        </div>
      `;

      mainContainer.appendChild(child);
    });

    setupRemoveButtons();
    setupCheckboxListeners();
    updateView();
  } catch (error) {
    console.error("Error loading extensions:", error);
  }
}

//Update View Function (always selects fresh children)
function updateView() {
  const children = document.querySelectorAll(".main-container .children"); // dynamic list

  children.forEach((child) => {
    const checkbox = child.querySelector('input[type="checkbox"]');
    const isChecked = checkbox.checked;

    if (currentFilter === "all") {
      child.style.display = "flex";
    } else if (currentFilter === "active") {
      child.style.display = isChecked ? "flex" : "none";
    } else if (currentFilter === "inactive") {
      child.style.display = isChecked ? "none" : "flex";
    }
  });
}

//Handle Filter Button Clicks
allBtn.addEventListener("click", () => {
  currentFilter = "all";
  setActiveButton(allBtn);
  updateView();
});

activeBtn.addEventListener("click", () => {
  currentFilter = "active";
  setActiveButton(activeBtn);
  updateView();
});

inactiveBtn.addEventListener("click", () => {
  currentFilter = "inactive";
  setActiveButton(inactiveBtn);
  updateView();
});

//Active Button State
function setActiveButton(selected) {
  [allBtn, activeBtn, inactiveBtn].forEach((btn) =>
    btn.classList.remove("active")
  );
  selected.classList.add("active");
}

//Attach Remove Button Events (Permanent Remove)
function setupRemoveButtons() {
  document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".children");
      if (parent) {
        parent.remove(); // Permanently delete from DOM
        updateView(); // Refresh visible items
      }
    });
  });
}

//Track Checkbox Changes (Dynamic Update)
function setupCheckboxListeners() {
  document
    .querySelectorAll(".main-container .children input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", updateView);
    });
}

//Initialize
loadExtensions();
