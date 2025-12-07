const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

let selectedProblem = "";
let selectedDetail = "";

// STEP 1 → STEP 2
document.querySelectorAll("#step-1 .wizard-option").forEach(button => {
  button.addEventListener("click", () => {
    selectedProblem = button.dataset.problem;
    document.querySelector("#step-2 .wizard-subtitle").textContent =
      "How serious is the issue?";
    step1.classList.remove("active");
    step2.classList.add("active");
  });
});

// STEP 2 → STEP 3
document.querySelectorAll("#step-2 .followup").forEach(button => {
  button.addEventListener("click", () => {
    selectedDetail = button.dataset.detail;

    // --- TEXT OUTPUT ---
    const resultText = generateResultText(selectedProblem, selectedDetail);
    document.querySelector(".wizard-result-text").textContent = resultText;

    // --- COST OUTPUT ---
    const cost = calculateCosts(selectedProblem, selectedDetail);

    document.querySelector(".cost-labor").textContent = `$${cost.labor}`;
    document.querySelector(".cost-materials").textContent = `$${cost.materials}`;
    document.querySelector(".cost-fee").textContent = `$${cost.fee}`;
    document.querySelector(".cost-total").textContent = `$${cost.total}`;

    step2.classList.remove("active");
    step3.classList.add("active");
  });
});

// RESET
document.querySelector(".wizard-restart").addEventListener("click", () => {
  step3.classList.remove("active");
  step1.classList.add("active");
});

// -------------------------
// TEXT GENERATOR
// -------------------------
function generateResultText(problem, detail) {
  const issues = {
    drain: "drain or clog issue",
    leak: "pipe leak",
    heater: "heating or boiler problem",
    install: "installation request"
  };

  const severity = {
    small: "a minor repair",
    medium: "a moderate repair",
    major: "a major or advanced repair"
  };

  return `You selected a ${issues[problem]}. Based on what you told us, this looks like ${severity[detail]}. Below is your estimated cost breakdown.`;
}

// -------------------------
// COST CALCULATOR
// -------------------------
function calculateCosts(problem, detail) {

  // Base labor rates
  const laborRates = {
    small: 120,
    medium: 250,
    major: 450
  };

  // Materials
  const materialRates = {
    drain: { small: 20, medium: 40, major: 80 },
    leak: { small: 35, medium: 75, major: 150 },
    heater: { small: 50, medium: 120, major: 300 },
    install: { small: 40, medium: 100, major: 200 },
    cleaning: { small: 40, medium: 100, major: 200 },
    camera: { small: 40, medium: 100, major: 200 },
    
  };

  const labor = laborRates[detail];
  const materials = materialRates[problem][detail];
  const fee = 45; // flat estimate fee

  const total = labor + materials + fee;

  return { labor, materials, fee, total };
}




