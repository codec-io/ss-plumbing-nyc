/********************************************
 *   SS PIPE REPAIRS — SERVICE WIZARD JS
 *   CLEAN NEW VERSION (ALL FEATURES INCLUDED)
 ********************************************/

// --- Step Elements ---
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

let selectedProblem = "";
let selectedDetail = "";

// ============================================================
// STEP 1 → STEP 2
// ============================================================
document.querySelectorAll("#step-1 .wizard-option").forEach(btn => {
    btn.addEventListener("click", () => {
        selectedProblem = btn.dataset.problem;

        // Update subtitle based on selection
        const prettyName = btn.textContent.trim();
        document.querySelector(".wizard-subtitle").textContent =
            `How serious is your ${prettyName} issue?`;

        step1.classList.remove("active");
        step2.classList.add("active");
    });
});


// ============================================================
// STEP 2 → STEP 3
// ============================================================
document.querySelectorAll("#step-2 .followup").forEach(btn => {
    btn.addEventListener("click", () => {
        selectedDetail = btn.dataset.detail;

        // Generate dynamic text
        document.querySelector(".wizard-result-text").textContent =
            generateResultText(selectedProblem, selectedDetail);

        // Calculate pricing
        const prices = calculateCosts(selectedProblem, selectedDetail);

        // Populate pricing
        document.querySelector(".cost-labor").textContent = `$${prices.labor}`;
        document.querySelector(".cost-materials").textContent = `$${prices.materials}`;
        document.querySelector(".cost-fee").textContent = `$${prices.fee}`;
        document.querySelector(".cost-total").textContent = `$${prices.total}`;

        // Go to step 3
        step2.classList.remove("active");
        step3.classList.add("active");
    });
});


// ============================================================
// RESET WIZARD
// ============================================================
document.querySelector(".wizard-restart").addEventListener("click", () => {
    step3.classList.remove("active");
    step1.classList.add("active");
});


// ============================================================
// TEXT OUTPUT (per problem + severity)
// ============================================================
function generateResultText(problem, severity) {

    const problemLabels = {
        drain: "a drain or clog issue",
        leak: "a leaking or damaged pipe",
        heater: "a heating or boiler issue",
        install: "an installation request",
        cleaning: "a drain cleaning service",
        camera: "a camera inspection"
    };

    const severityLabels = {
        small: "a minor issue",
        medium: "a moderate issue",
        major: "a major or advanced repair"
    };

    return `You selected ${problemLabels[problem]}. Based on your selection, this appears to be ${severityLabels[severity]}. Below is your estimated cost breakdown based on typical NYC service rates.`;
}


// ============================================================
// FULL NYC PRICING ENGINE
// All ranges are realistic & adjustable
// ============================================================
function calculateCosts(problem, severity) {
    
    const pricing = {
        drain: {
            small:  { labor: [75,125], materials: [0,25], fee: 50 },
            medium: { labor: [150,225], materials: [20,50], fee: 75 },
            major:  { labor: [250,350], materials: [50,120], fee: 100 }
        },
        leak: {
            small:  { labor: [125,175], materials: [20,40], fee: 50 },
            medium: { labor: [200,350], materials: [40,120], fee: 75 },
            major:  { labor: [350,550], materials: [100,200], fee: 100 }
        },
        heater: {
            small:  { labor: [150,225], materials: [20,40], fee: 75 },
            medium: { labor: [250,400], materials: [40,120], fee: 100 },
            major:  { labor: [400,650], materials: [120,250], fee: 125 }
        },
        install: {
            small:  { labor: [125,175], materials: [25,75], fee: 50 },
            medium: { labor: [200,350], materials: [50,150], fee: 75 },
            major:  { labor: [300,500], materials: [100,250], fee: 100 }
        },
        cleaning: {
            small:  { labor: [75,125], materials: [0,0], fee: 50 },
            medium: { labor: [125,200], materials: [0,0], fee: 75 },
            major:  { labor: [200,300], materials: [0,40], fee: 75 }
        },
        camera: {
            small:  { labor: [75,100], materials: [0,0], fee: 50 },
            medium: { labor: [100,175], materials: [0,0], fee: 75 },
            major:  { labor: [175,250], materials: [0,0], fee: 100 }
        }
    };

    const data = pricing[problem][severity];
    const labor = randomRange(data.labor);
    const materials = randomRange(data.materials);
    const fee = data.fee;
    const total = labor + materials + fee;

    return { labor, materials, fee, total };
}


// ============================================================
// RANDOM HELPER FOR PRICE RANGES
// ============================================================
function randomRange([min, max]) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




