// console.log(document.querySelectorAll('input'));

function globalValueListener() {
	document.addEventListener('input', e => textValidator(e.target));
}

globalValueListener();
function textValidator(target) {
	// Switch to determine target and apply regex
	// each case creates RegExp, and tests it against the value. If true, validity is set to true.
	switch (target.id) {
		case 'phoneId':
			const phoneReg = /^\+?[\d\s-]{2,15}$/g;
			target.setCustomValidity(phoneReg.test(target.value) ? "" : "0");
			console.log(target.value + " & " + target.checkValidity());
			break;

		case 'nameId':
			const nameReg = /^[a-zA-Zöäå]+(([',. -][a-zA-Zöäå])?[a-zA-Zöäå]*)*$/g;
			target.setCustomValidity(nameReg.test(target.value) ? "" : "0");
			break;

		case 'emailId1':
			const emailReg = /^([\w.])+@[a-z]+\.[a-z]{1,5}$/g;
			target.setCustomValidity(emailReg.test(target.value) ? "" : "0");
			break;

		case 'emailId2':
			if (document.getElementById('emailId1').checkValidity()) {
				target.setCustomValidity(emailId1.value == target.value ? "" : "0");
			} else {
				target.setCustomValidity('');
			}
			break;

		case 'addressId':
			const addressReg = /^[\w'.,\söäå-]+$/g;
			target.setCustomValidity(addressReg.test(target.value) ? "" : "0");
			break;

		case 'cityId':
			const cityReg = /^[a-zA-Z'.,\s-]+$/g;
			target.setCustomValidity(cityReg.test(target.value) ? "" : "0");
			break;

		case 'stateId':
			const stateReg = /^[a-zA-Z'.,\s-]+$/g;
			target.setCustomValidity(stateReg.test(target.value) || target.value === "" ? "" : "0");
			break;

		case 'countryId':
			const countryReg = /^[a-zA-Z'.,\s-]+$/g;
			target.setCustomValidity(countryReg.test(target.value) ? "" : "0");
			break;

		case 'zipId':
			const zipReg = /^\d{5}$/g;
			target.setCustomValidity(zipReg.test(target.value) ? "" : "0");
			break;

		case 'portfolioId':
			const portfolioReg = /^((https?:\/\/)?(www\.)?)?\w+\.\w+(\.w+)?([\.\/]?([\w\?=:"'-]+)?)+/g;
			target.setCustomValidity(portfolioReg.test(target.value) ? "" : "0");
	}
}

// Triggered by submit button
submitButton();
function submitButton() {
	document.getElementById('submitId').addEventListener('click', function () {

		let listOfAlerts = '';
		let firstItemBool = '';

		document.querySelectorAll('input[type=text]').forEach(function (item) {
			// Runs text validator on all text inputs.
			textValidator(item);
			// console.log(item.checkValidity() + " " + item.id);

			// Checks validity of each input. If invalid, placeholder of the input will be added to the listOfAlerts string.
			if (!item.checkValidity()) {
				listOfAlerts += `\n- ${item.placeholder}`;

				// Assigns the first item that returns as invalid to a variable. This is used for auto focusing after submit.
				if (!firstItemBool) {
					firstItemBool = item;
				}
			}
		});


		// console.log(document.querySelectorAll('form'));
		document.querySelectorAll('.buttonForm').forEach(function (theForm, x) {
			// console.log(theForm);
			let atLeastOneChecked = false;

			// checks if at least one button is checked. Boolean is stored in atLeastOneChecked
			theForm.querySelectorAll('input').forEach(function (button) {
				if (button.checked && !atLeastOneChecked) {
					atLeastOneChecked = true;
				}
				console.log(button.checkValidity() + " x");
			});

			// If no buttons are checked, adds alert to listOfAlerts.
			console.log("at leaste one checked? = " + atLeastOneChecked);
			if (!atLeastOneChecked) {
				theForm.querySelectorAll('input').forEach(function (button) {
					console.log('turning button into false');
					button.setCustomValidity('');
				});
				listOfAlerts += `\n- ${theForm.parentElement.querySelector('p').innerText}\n (select at least 1)`;
			}

			theForm.querySelectorAll('input').forEach(function (button, i) {
				console.log("Form" + x + " btn " + i + " " + button.checkValidity());
			});

		});



		// focus on first invalid focus if there is any
		firstItemBool && document.getElementById(firstItemBool.id).focus();
		// Alerts if there is any invalid input. Alert includes placeholder of all invalid inputs
		if (listOfAlerts) {
			alert(`The following fields are not valid:${listOfAlerts}`);
		} else {
			document.getElementById('theForm').submit();
		}
	});
}


// for testing purposes. Sets values for inputs.
// (function testInputValueAdder() {
// 	document.getElementById('nameId').value = "Ben";
// 	document.getElementById('phoneId').value = "123456789";
// 	document.getElementById('emailId1').value = "a@b.c";
// 	document.getElementById('emailId2').value = "a@b.c";
// 	document.getElementById('addressId').value = "123 charlie street";
// 	document.getElementById('cityId').value = "Hel";
// 	document.getElementById('stateId').value = "";
// 	document.getElementById('countryId').value = "Fin";
// 	document.getElementById('zipId').value = "12345";
// 	document.getElementById('portfolioId').value = "a.c";
// })();
