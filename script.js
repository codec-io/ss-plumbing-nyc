const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

const subtitle = document.querySelector(".wizard-subtitle");
const resultText = document.querySelector(".wizard-result-text");

let selectedProblem = "";
let selectedDetail = "";

// STEP 1 → STEP 2
document.querySelectorAll("#step-1 .wizard-option").forEach(btn => {
    btn.addEventListener("click", () => {
        selectedProblem = btn.dataset.problem;

        subtitle.textContent = "How serious does it seem?";
        step1.classList.remove("active");
        step2.classList.add("active");
    });
});

// STEP 2 → STEP 3
document.querySelectorAll("#step-2 .followup").forEach(btn => {
    btn.addEventListener("click", () => {
        selectedDetail = btn.dataset.detail;
        showResult();
    });
});

// BUILD RESULT TEXT
function showResult() {
    let service = "";
    let price = "";

    if (selectedProblem === "drain") {
        service = "Drain Clearing / Hydro Jetting";
        price = selectedDetail === "small" ? "$120–$180"
              : selectedDetail === "medium" ? "$200–$350"
              : "$400–$750";
    }

    if (selectedProblem === "leak") {
        service = "Leak Detection & Pipe Repair";
        price = selectedDetail === "small" ? "$150–$250"
              : selectedDetail === "medium" ? "$300–$600"
              : "$700–$1200";
    }

    if (selectedProblem === "heater") {
        service = "Boiler / Heating System Diagnostic";
        price = selectedDetail === "small" ? "$180–$250"
              : selectedDetail === "medium" ? "$400–$900"
              : "$1200–$3500";
    }

    if (selectedProblem === "install") {
        service = "Installation Service";
        price = selectedDetail === "small" ? "$120–$200"
              : selectedDetail === "medium" ? "$300–$650"
              : "$700–$2000";
    }

    resultText.innerHTML = `
        <strong>Recommended:</strong> ${service}<br>
        <strong>Estimated Price:</strong> ${price}<br><br>
        A technician can help you today — click below to call.
    `;

    step2.classList.remove("active");
    step3.classList.add("active");
}

// Restart Wizard
document.querySelector(".wizard-restart").addEventListener("click", () => {
    step3.classList.remove("active");
    step1.classList.add("active");
});