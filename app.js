const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_7UStkUqQNBmahSoy8K635tE3Sjr5fK1UVPmVloZ2&base_currency=USD"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
       
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    console.log('currency code ',currCode);
    console.log('country code ',countryCode);

    // using querySelector not with All because we want a single element not a NodeList
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};

btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1)
    {
        amtval = 1;
        amount.value = 1;
    }
    console.log('The amount is',amtval);
    console.log(fromCurr.value, toCurr.value);

    const URL = `${BASE_URL}&base_currency=${fromCurr.value}`;
    console.log(URL);
    let response = await fetch(URL);
    let data = await response.json();

    console.log('the data = ',data["data"][fromCurr.value]["value"]);

    console.log('the data is ',data);
    
    let rate = data["data"][toCurr.value]["value"];
    console.log('The rate is ',toCurr.value,rate);
    console.log('The response is', response);

    let finalamount = amtval * rate;
    console.log('the final amount is', finalamount);
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
})
