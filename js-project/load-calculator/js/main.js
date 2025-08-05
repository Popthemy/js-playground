"use-strict";

const emptyContainer = document.querySelector(".empty-appliance");
const applianceContainer = document.querySelector(".appliance-list");
const extraContainer = document.querySelector(".extra-action");

const form1 = document.querySelector(".form-1");
const form2 = document.querySelector(".form-2");

const systemLoad = document.querySelector(".sys-load");
const systemLEnergy = document.querySelector(".sys-energy");
const systemBattery = document.querySelector(".sys-battery");
const systemPanels = document.querySelector(".sys-panels");

const applianceName = document.getElementById("name");
const appliancePower = document.getElementById("power");
const applianceHours = document.getElementById("hours");

const messageVoltageTime = document.getElementById("msg-voltageTime");
const messagePanelWatt = document.getElementById("msg-panelwatt");

const batteryBackupTime = document.getElementById("backupDay");
const systemVoltage = document.getElementById("sys-voltage");
const backupContainer = document.querySelector(".backup");
const overlayBackup = document.querySelector(".overlay");

const btnReset = document.querySelector(".btn-reset");
const btnDownload = document.querySelector(".btn-download");

const clearForm = () => {
  applianceName.value = appliancePower.value = applianceHours.value = "";
  // console.log('form cleared');
};

const setErrormessage = (fields, emptyFields = []) => {
  clearCalFormErrorMessage(fields);

  emptyFields.forEach((field) => {
    console.log(field);
    const inputElem = document.getElementById(field.id);
    const nextElem = inputElem.nextElementSibling;

    if (!(nextElem && nextElem.classList.contains("error-message"))) {
      inputElem.insertAdjacentHTML(
        "afterend",
        `
      <small class="error-message">Please enter a valid ${field.id}</small>
      `
      );
    }
  });
};

const clearCalFormErrorMessage = (inputs) => {
  inputs.forEach((input) => {
    const lastChild = input.lastElementChild;
    if (lastChild && lastChild.classList.contains("error-message")) {
      lastChild.remove();
    }
  });
};

const addNewAppliance = function (appliance) {
  html = `
      <div class="card" data-id=${appliance.id}>
            <div class="appliance-info">
              <div class="appliance-name">${appliance.name}</div>
              <div class="appliance-energy">${appliance.power}W × ${appliance.hours}h = ${appliance.energy}Wh/day</div>
            </div>
            <div class="appliance-power">${appliance.power}W
              <button class="btn btn-secondary">Remove</button>
            </div>
    </div>
    `;

  applianceContainer.insertAdjacentHTML("beforeend", html);
  return;
};

let applianceEntry = 0;
let applianceList = [];

const loadAppliances = function (e) {
  e.preventDefault();

  const name = applianceName.value.trim();
  const power = parseFloat(appliancePower.value);
  const hours = parseFloat(applianceHours.value);
  const fields = form1.querySelectorAll(".form-group");

  const inputFields = [
    { id: "name", value: name },
    { id: "power", value: power },
    { id: "hours", value: hours },
  ];

  const emptyFields = inputFields.filter(
    (field) =>
      field.value === "" || Number.isNaN(field.value) || field.value <= 0
  );

  if (emptyFields.length) {
    setErrormessage(fields, emptyFields);
    return;
  }

  clearCalFormErrorMessage(fields);
  clearForm();
  // activate set backup time modal

  if (applianceList.length < 1) {
    emptyContainer.classList.add("hidden");
    extraContainer.classList.remove("hidden");
    backupContainer.classList.remove("hidden");
    overlayBackup.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const appliance = {
    id: ++applianceEntry,
    name: name,
    power: power,
    hours: hours,
    get energy() {
      return this.power * this.hours;
    },
  };
  applianceList.push(appliance);
  addNewAppliance(appliance);
  updateSystemCalculation();

  // console.log("Name:", name);
  // console.log("Power:", power);
  // console.log("Hours:", hours);
  // console.log("Appliance list:", applianceList);
};
form1.addEventListener("submit", loadAppliances);

// set backup time
let backupDay = 0;
let voltage = parseInt(systemVoltage.value);

form2.addEventListener("submit", function (e) {
  e.preventDefault();
  backupDay = parseFloat(batteryBackupTime.value);
  voltage = parseInt(systemVoltage.value);

  const fieldForm = backupContainer.querySelector(".form-group");

  if (Number.isNaN(backupDay)) {
    setErrormessage([fieldForm], [{ id: "backupTime", value: backupDay }]);
    return;
  }

  batteryBackupTime.value = "";
  clearCalFormErrorMessage([fieldForm]);
  backupContainer.classList.add("hidden");
  updateSystemCalculation();
});

const removeCard = function (card) {
  const applianceIndex = applianceList.findIndex(
    (app) => app.id === Number(card.dataset.id)
  );
  if (applianceIndex > -1) applianceList.splice(applianceIndex, 1);
  card.remove();

  if (!applianceList.length) {
    backupDay = 0;
    messagePanelWatt.textContent = "";
    messageVoltageTime.textContent = "";
  }
  updateSystemCalculation();
};

applianceContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.matches(".btn-secondary")) return;

  const card = e.target.closest(".card");
  if (!card) return;
  removeCard(card);
  return;
});

const updateSystemCalculation = () => {
  const totals = applianceList.reduce(
    (cur, appliance) => {
      cur.totalDailyEnergy += appliance.energy;
      cur.totalLoad += appliance.power;
      return cur;
    },
    { totalLoad: 0, totalDailyEnergy: 0 }
  );

  systemLoad.textContent = totals.totalLoad;
  systemLEnergy.textContent = totals.totalDailyEnergy;

  // Battery calculations (assuming 24V system,  with 80% DOD)
  systemBattery.textContent = Math.ceil(
    (totals.totalDailyEnergy * backupDay) / (0.8 * voltage)
  );
  systemPanels.textContent = Math.ceil(
    (totals.totalDailyEnergy * backupDay) / (0.8 * 6)
  );

  if (backupDay) {
    if (voltage) {
      messageVoltageTime.textContent = `with ${voltage}V for ${backupDay} ${
        backupDay > 1 ? "days" : "day"
      } with 80% DOD`;
    }
    messagePanelWatt.textContent = `for ${backupDay} ${
      backupDay > 1 ? "days" : "day"
    } with 80% efficiency and estimated 6hrs sunlight for`;
  }
  return;
};

btnReset.addEventListener("click", function (e) {
  e.preventDefault();
  const cards = applianceContainer.querySelectorAll(".card");
  cards.forEach((card) => removeCard(card));
});

btnDownload.addEventListener("click", async function () {
  const content = document.querySelector(".cal-container");
  const date = new Date();

  const file = `load_calculator_${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
  // console.log(filename);
  try {
    const opt = {
      margin: 0.5,
      filename: file,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };
    await html2pdf().set(opt).from(content).save();
    console.log("converting to pdf finished");
  } catch (err) {
    console.error(err.message);
  }
});
