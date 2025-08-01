"use-strict";

const emptyContainer = document.getElementsByClassName("empty-appliance");
const applianceList = document.getElementsByClassName("appliance-list");
const addNewAppliance = document.querySelector(".add-new-appliance");
const calForm = document.querySelector(".cal-form");

const applianceName = document.getElementById("name");
const appliancePower = document.getElementById("power");
const applianceHours = document.getElementById("hours");

const clearForm = () => {
  applianceName.value = appliancePower.value = applianceHours.value = "";
  // console.log('form cleared');
};

const setErrormessage = (emptyFields) => {
  clearCalFormErrorMessage();

  emptyFields.forEach((field) => {
    const inputElem = document.getElementById(field.id);
    const nextElem = inputElem.nextElementSibling;

    if (! (nextElem && nextElem.classList.contains("error-message"))) {
      inputElem.insertAdjacentHTML(
        "afterend",
        `
      <small class="error-message">Please enter a valid ${field.id}</small>
      `
      );
    }
  });
};

const clearCalFormErrorMessage = () => {
  const inputs = calForm.querySelectorAll(".form-group");

  inputs.forEach((input) => {
    const lastChild = input.lastElementChild;
    if ( lastChild && lastChild.classList.contains("error-message")) {
      lastChild.remove();
    }
  });
};

calForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = applianceName.value.trim();
  const power = parseFloat(appliancePower.value);
  const hours = parseFloat(applianceHours.value);

  const inputFields = [
    { id: "name", value: name },
    { id: "power", value: power },
    { id: "hours", value: hours },
  ];

  const emptyFields = inputFields.filter(
    (field) => field.value === "" || Number.isNaN(field.value)
  );

  // console.log(emptyFields);
  if (emptyFields.length) {
    setErrormessage(emptyFields);
    return;
  }
  clearCalFormErrorMessage();

  // console.log("Name:", name);
  // console.log("Power:", power);
  // console.log("Hours:", hours);

  clearForm();
});
