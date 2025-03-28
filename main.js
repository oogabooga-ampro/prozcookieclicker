let cookieCount = 0;
let cookiesPerClick = 1; // Base cookies per click (from Upgrade 1 effect)
let upgrade1Count = 0; // Number of times Upgrade 1 is bought (+1 CPC each)
let upgrade2Multiplier = 1; // Multiplier effect from Upgrade 2 (starts at 1, doubles each time)
let upgradeCost = 10; // Starting cost for Upgrade 1
let upgrade2Cost = 100; // Starting cost for Upgrade 2
let totalClicks = 0;
let totalCookiesProduced = 0;
let totalBakedCookies = 0; // Each baked cookie gives a 10% buff

// DOM elements
const cookie = document.getElementById("cookie");
const cookieCountElement = document.getElementById("cookieCount");
const clickCountElement = document.getElementById("clickCount");
const totalProducedElement = document.getElementById("totalProduced");
const upgradeButton = document.getElementById("upgrade");
const upgrade2Button = document.getElementById("upgrade2");
const clickGainElement = document.getElementById("clickGain");
const prestigeButton = document.getElementById("prestige");
const bakedCookiesElement = document.getElementById("bakedCookies");
const prestigeInfoElement = document.getElementById("prestigeInfo");
const prestigePreviewElement = document.getElementById("prestigePreview"); // Added for preview text

// Update UI and button states
function updateUI() {
  cookieCountElement.textContent = cookieCount;
  clickCountElement.textContent = totalClicks;
  totalProducedElement.textContent = totalCookiesProduced;
  
  // Calculate effective cookies per click:
  // Effective CPC = (cookiesPerClick * upgrade2Multiplier) * (1 + 0.10 * totalBakedCookies)
  const effectiveCPC = Math.round(cookiesPerClick * upgrade2Multiplier * (1 + 0.10 * totalBakedCookies));
  clickGainElement.textContent = effectiveCPC;
  
  updateUpgradeButton();
  updateUpgrade2Button();
  
  // Update the prestige preview
  updatePrestigePreview();
}

// When clicking the cookie, add the effective cookies per click
cookie.addEventListener("click", () => {
  const effectiveCPC = Math.round(cookiesPerClick * upgrade2Multiplier * (1 + 0.10 * totalBakedCookies));
  cookieCount += effectiveCPC;
  totalCookiesProduced += effectiveCPC;
  totalClicks++;
  updateUI();
});

// Upgrade 1: Adds 1 to the base cookies per click
upgradeButton.addEventListener("click", () => {
  if (cookieCount >= upgradeCost) {
    cookieCount -= upgradeCost;
    upgrade1Count++;
    cookiesPerClick = 1 + upgrade1Count;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    updateUI();
  }
});

// Upgrade 2: Doubles the multiplier effect on cookies per click
upgrade2Button.addEventListener("click", () => {
  if (cookieCount >= upgrade2Cost) {
    cookieCount -= upgrade2Cost;
    upgrade2Multiplier *= 2;
    upgrade2Cost = Math.floor(upgrade2Cost * 3);
    updateUI();
  }
});

prestigeButton.addEventListener("click", () => {
  if (cookieCount >= 1000) {
    const newBakedCookies = Math.floor(Math.pow(cookieCount, 0.9) / 100); // Power 0.9 scaling
    totalBakedCookies += newBakedCookies;
    
    // Reset the cookies and upgrades
    cookieCount = 0;
    cookiesPerClick = 1;
    upgradeCost = 10;
    upgrade2Cost = 100;
    upgrade1Count = 0;
    upgrade2Multiplier = 1;
    
    updateUI();
    bakedCookiesElement.textContent = `Total Baked Cookies: ${totalBakedCookies}`;
    prestigeInfoElement.textContent = `Prestige resets the game and gives a 10% buff per baked cookie.`;
    
    alert(`Game Reset! You earned ${newBakedCookies} Baked Cookies.`);
  } else {
    alert("You need at least 1,000 cookies to prestige!");
  }
});

// Function to update the prestige preview text
function updatePrestigePreview() {
  if (cookieCount >= 1000) {
    const previewBakedCookies = Math.floor(Math.pow(cookieCount, 0.9) / 100);
    prestigePreviewElement.textContent = `You would earn: ${previewBakedCookies} Baked Cookies`;
  } else {
    prestigePreviewElement.textContent = "You need at least 1,000 cookies to prestige!";
  }
}

// Update Upgrade 1 button state
function updateUpgradeButton() {
  upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost})`;
  upgradeButton.disabled = cookieCount < upgradeCost;
}

// Update Upgrade 2 button state
function updateUpgrade2Button() {
  upgrade2Button.textContent = `Upgrade 2x Production (Cost: ${upgrade2Cost})`;
  upgrade2Button.disabled = cookieCount < upgrade2Cost;
}

// Initial UI update
updateUI();
updatePrestigePreview();