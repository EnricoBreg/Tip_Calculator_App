let peopleNumber = 0.0, billImport = 0.0;
const presetTipButtons = document.querySelectorAll("button.preset-tip-button");

let tip = {
    percentage: 0.0,
    isSet: false,
    setTip: function (percentage) {
        this.percentage = percentage;
        this.isSet = true;
    },
    resetTip: function () {
        this.percentage = 0.0,
            this.isSet = false
    }
};

document.querySelector("#bill-amount").addEventListener("input", getBillImport);
document.querySelector("button#reset").addEventListener("click", getTipAndTotal);
document.querySelector("#custom-tip").addEventListener("input", getCustomTip);
document.querySelector("#people-number").addEventListener("input", getPeopleNumber);

presetTipButtons.forEach((button) => {
    button.addEventListener("click", getPresetTip);
});

function getBillImport(e) {
    if (e.target.value <= 0) {
        e.target.value = "";
        document.querySelector("section.bill-total-amount span.error").textContent = "Inser A Valid Number!";
        document.querySelector("#bill-amount").classList.add("error-outline");
    } else {
        billImport = Number(e.target.value);
    }

    setTimeout(() => {
        document.querySelector("section.bill-total-amount span.error").textContent = "";
        document.querySelector("#bill-amount").classList.remove("error-outline");
    }, 3000);
}

function getCustomTip(e) {
    if (e.target.value > 100) {
        e.target.value = 100;
    } else if (e.target.value < 0) {
        e.target.value = "";
        document.querySelector(".container .output .tip-per-person div span.total-tip-amount").textContent = `Tip Amount (5%)`;
    } else {
        tip.setTip(Number(e.target.value / 100));
    }
    document.querySelector(".container .output .tip-per-person div span.total-tip-amount").textContent = `Tip Amount (${e.target.value}%)`;
}

function getPeopleNumber(e) {
    if (e.target.value <= 0) {
        e.target.value = "";
        document.querySelector("section.people-number span.error").textContent = "Insert A Valid Number!";
        document.querySelector("#people-number").classList.add("error-outline");
    } else {
        peopleNumber = Number(e.target.value);
    }

    setTimeout(() => {
        document.querySelector("section.people-number span.error").textContent = "";
        document.querySelector("#people-number").classList.remove("error-outline");
    }, 3000);
}

function getPresetTip(e) {
    switch (e.target.textContent) {
        case "5%":
            tip.setTip(0.05);
            break;
        case "10%":
            tip.setTip(0.10);
            break;
        case "15%":
            tip.setTip(0.15);
            break;
        case "25%":
            tip.setTip(0.25);
            break;
        case "50%":
            tip.setTip(0.5);
            break;
        default:
            break;
    }
    document.querySelector(".container .output .tip-per-person div span.total-tip-amount").textContent = `Tip Amount (${e.target.textContent})`;
}

function getTipAndTotal() {
    let tipAmountPerPerson, total;

    if (tip.isSet === false) {
        document.querySelector("section.select-tip").classList.add("error-border");
        document.querySelector("section.select-tip span.error").textContent = "Select A Tip";
        setTimeout(() => {
            document.querySelector("section.select-tip").classList.remove("error-border");
            document.querySelector("section.select-tip span.error").textContent = "";
        }, 3000);
    }

    tipAmountPerPerson = (billImport / peopleNumber) * tip.percentage;
    total = (billImport / peopleNumber) + tipAmountPerPerson;
    document.querySelector("#tip-per-person").textContent = `$ ${tipAmountPerPerson.toFixed(2)}`;
    document.querySelector("#total-per-person").textContent = `$ ${total.toFixed(2)}`;

    // reset all after 2 mins
    setTimeout(() => {
        tip.resetTip();
        document.querySelector("#tip-per-person").textContent = "$ 0.00";
        document.querySelector("#total-per-person").textContent = "$ 0.00";
        document.querySelector(".container .output .tip-per-person div span.total-tip-amount").textContent = "Tip Amount (0%)";
        document.querySelector("#bill-amount").value = "";
        document.querySelector("#custom-tip").value = "";
        document.querySelector("#people-number").value = "";
    }, 5000);

}