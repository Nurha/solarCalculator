"use strict"
// calculate anual home usage.
function addMonths(elem) {
  var annualUseKw = 0;
  var dailyUseKw = 0;
  var i = 0;
  var x = 0;

  var months = document.getElementById(elem).getElementsByTagName('input');
  // console.log(months);

  for (i=0; i<months.length; i++) {
    x = Number(months[i].value);
    annualUseKw += x // annualUseKw = annualUseKw + x
  };
    //console.log(annualUseKw); // sum of all the months
  dailyUseKw = annualUseKw/365;
  return dailyUseKw; // dailyUseKw usage
};

// calculate number of sun hours
function sunHours() {
  var hrs;
  var theZone = document.forms.solarForm.zone.selectedIndex;
  theZone += 1;
  switch(theZone) {
    case 1:
      hrs = 6;
      break;
    case 2:
      hrs = 5.5;
      break;
    case 3:
      hrs = 5;
      break;
    case 4:
      hrs = 4.5;
      break;
    case 5:
      hrs = 4.2;
      break;
    case 6:
      hrs = 3.5;
      break;
    default:
      hrs = 0;
  };
  return hrs;
};

function calculatePanel() {
  var userChoice = document.forms.solarForm.panel.selectedIndex;
  var panelOptions = document.forms.solarForm.panel.options;
  var power = panelOptions[userChoice].value;
  var name = panelOptions[userChoice].text;
  var x = [power, name];
  return x;
}


function calculateSolar() {
  var dailyUseKw  = addMonths('mpc');
  // console.log(dailyUseKw);
  var sunHoursPerDay = sunHours();
  // console.log(sunHoursPerDay);
  var minimumKwNeeds = dailyUseKw/sunHoursPerDay;
  // console.log(minimumKwNeeds);
  var realKwNeeds = minimumKwNeeds * 1.25; // icrease of 25% to account for bad weather
  // console.log(realKwNeeds);
 // To compare the home usage which is in kilowatts to the panels, which are rated in watts you multiply by 1000;
  var realWattNeeds = realKwNeeds * 1000;
  // console.log(realWattNeeds);

  var panelInfo = calculatePanel();
  var panelOutput = panelInfo[0];
  var panelname = panelInfo[1];
  //console.log(panelOutput);
  //console.log(panelname);

  var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
  console.log(panelsNeeded);

  var feedback = '';
  feedback += '<p>Based on your average daily use of '+ Math.round(dailyUseKw) +' kWh, you will need to purchase '+ panelsNeeded +' '+ panelname +' solar panel to offsset 100% of your electricity bill.</p>';
  feedback += '<h2>Additional Details</h2>';
  feedback += '<p>Your average daily electricity consumption : '+ Math.round(dailyUseKw) +' Kwh per day.</p>';
  feedback += '<p>Your average sunshine hours per day: '+ sunHoursPerDay+' hours</p>';
  feedback += '<p>Realistic watts needed per hour: '+Math.round(realWattNeeds)+' watts/hour</p>';
  feedback += '<p>The '+ panelname +' panel you selected generates about '+ panelOutput +' watts per hour</p>';
  document.getElementById('feedback').innerHTML = feedback;

};
