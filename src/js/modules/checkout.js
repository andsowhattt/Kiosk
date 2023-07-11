class DistrictSelector {
	constructor(citySelectId, districtSelectId, deliverySelectId) {
		this.citySelectId = citySelectId;
		this.districtSelectId = districtSelectId;
		this.deliverySelectId = deliverySelectId;
		this.districtsByCity = {
			"Kyiv": ["Kyiv", "Bilotserkivskyi", "Boryspilskyi", "Brovarskyi,", "Vyshhorodskyi", "Obukhivskyi", "Fastivskyi", "Buchanskyi"],
			"Vinnytsia": ["Vinnytsia", "Haysynskyi", "Zhmerynskyi", "Mogilev-Podilskyi", "Tulchynskyi", "Khmilnytskyi"],
			"Dnipro": ["Dnipro", "Kamiansky", "Kryvyi Rih", "Nikopol", "Novomoskovskiy", "Pavlograd", "Synelnykivskyi"],
			"Donetsk": ["Donetsk", "Bakhmut", "Volnovasky", "Kramatorsk", "Mariupol", "Pokrovsky", "Horliv", "Kalmius"],
			"Zaporizhia": ["Zaporizhia", "Voznesenivskyi", "Dniprovskyi", "Zavodskyi", "Komunarskyi", "Oleksandrivskyi", "Khortytskyi", "Shevchenkivskyi"],
			"Ivano-Frankivsk": ["Ivano-Frankivsk", "Verkhovynskyi", "Kalusskyi", "Kolomiyskyi", "Kosivskyi", "Nadvirnyanskyi"],
			"Kropyvnytskyi": ["Kropyvnytskyi", "Golovanivskyi", "Novoukrainskyi", "Oleksandriyskyi"],
			"Luhansk": ["Luhansk", "Alchevskyi", "Dovzhanskyi", "Rovenkivskyi", "Svativskyi", "Severodonetskyi", "Starobilsky", "Shchastinsky"],
			"Lutsk": ["Lutsk", "Volodymyr-Volynskyi", "Kovel", "Novovolynsk"],
			"Lviv": ["Lviv", "Drohobytskyi", "Zolochivskyi", "Sambirskyi", "Stryiskyi", "Chervonohradskyi", "Yavorivskyi"],
			"Mykolaiv": ["Mykolaiv", "Bashtan", "Voznesensky", "Pervomaysky"],
			"Odesa": ["Odesa", "Berezivskyi", "Bilhorod-Dnistrovskyi", "Bolgradskyi", "Izmailskyi", "Podilskyi", "Rozdilnianskyi"],
			"Poltava": ["Poltava", "Kremenchutskyi", "Lubensky", "Myrhorodskyi"],
			"Rivne": ["Rivne", "Varasky", "Dubensky", "Sarnensky"],
			"Sumy": ["Sumy", "Konotopsky", "Shostkinsky", "Okhtyrsky", "Romensky"],
			"Ternopil": ["Ternopil", "Kremenetsky", "Chortkivskyi"],
			"Uzhhorod": ["Uzhhorod", "Berehivskyi", "Mukachivskyi", "Rakhivskyi", "Tyachivskyi", "Khustskyi"],
			"Kharkiv": ["Kharkiv", "Bogoduhivskyi", "Izyumskyi", "Krasnogradskyi", "Kupianskyi", "Lozovsky", "Chuguyivskyi"],
			"Kherson": ["Kherson", "Beryslavskyi", "Henicheski", "Kakhovsky", "Skadovsky"],
			"Khmelnytskyi": ["Khmelnytskyi", "Kamianets-Podilskyi", "Shepetivskyi"],
			"Cherkasy": ["Cherkasy", "Zvenigorodsky", "Zolotonisky", "Umansky"],
			"Chernivtsi": ["Chernivtsi", "Vyzhnytskyi", "Dnistrovskyi"],
			"Chernihiv": ["Chernihiv", "Koryukivskyi", "Nizhynskyi", "Novgorod-Siverskyi", "Prylutskyi"],
		};

		this.citySelect = document.getElementById(this.citySelectId);
		this.districtSelect = document.getElementById(this.districtSelectId);
		this.deliverySelect = document.getElementById(this.deliverySelectId);
		this.ccExpirationInput = document.getElementById('cc-expiration');

		this.citySelect.addEventListener('change', this.updateDistricts.bind(this));
		this.deliverySelect.addEventListener('change', this.updateDeliveryDetails.bind(this));
		this.updateCityOptions();

		this.citySelect.addEventListener('change', this.checkCustomOption.bind(this));
		this.districtSelect.addEventListener('change', this.checkCustomOption.bind(this));

		this.ccExpirationInput.addEventListener('input', this.addSlash.bind(this));
	}

	updateCityOptions() {
		for (const city in this.districtsByCity) {
			const option = document.createElement('option');
			option.value = city;
			option.text = city;
			this.citySelect.add(option);
		}

		const otherOption = document.createElement('option');
		otherOption.value = 'Other';
		otherOption.text = 'Other';
		this.citySelect.add(otherOption);
	}


	updateDistricts() {
		const selectedCity = this.citySelect.value;
	
		this.districtSelect.innerHTML = '';
	
		if (selectedCity === '') {
			const defaultOption = document.createElement('option');
			defaultOption.value = '';
			defaultOption.text = 'Choose a city first';
			this.districtSelect.add(defaultOption);
			return;
		}
	
		let districts = this.districtsByCity[selectedCity];
	
		if (selectedCity === 'Other') {
			districts = ['Other']; // Додати варіант "Other" до поля District
		}
	
		districts.forEach((district) => {
			const option = document.createElement('option');
			option.text = district;
			this.districtSelect.add(option);
		});
	}
	

	checkCustomOption() {
		if (
			this.citySelect.value === 'Other' ||
			this.districtSelect.value === 'Other'
		) {
			this.showCustomInputs();
		} else {
			this.hideCustomInputs();
		}
	}

	showCustomInputs() {
		const customCityInput = document.createElement('input');
		customCityInput.type = 'text';
		customCityInput.id = 'customCityInput';
		customCityInput.classList.add('form-control');
		customCityInput.placeholder = 'Enter your city';
		customCityInput.required = true;
		customCityInput.pattern = '[A-Za-z]+';

		const customDistrictInput = document.createElement('input');
		customDistrictInput.type = 'text';
		customDistrictInput.id = 'customDistrictInput';
		customDistrictInput.classList.add('form-control');
		customDistrictInput.placeholder = 'Enter your district';
		customDistrictInput.required = true;
		customDistrictInput.pattern = '[A-Za-z]+';

		this.citySelect.insertAdjacentElement('afterend', customCityInput);
		this.districtSelect.insertAdjacentElement('afterend', customDistrictInput);
	}

	hideCustomInputs() {
		const customCityInput = document.getElementById('customCityInput');
		const customDistrictInput = document.getElementById('customDistrictInput');

		if (customCityInput && customDistrictInput) {
			customCityInput.remove();
			customDistrictInput.remove();
		}
	}

	updateDeliveryDetails() {
		const delivery = this.deliverySelect.value;
		const deliveryDetailsContainer = document.getElementById('deliveryDetails');
		deliveryDetailsContainer.innerHTML = '';

		if (delivery === 'Nova Poshta' || delivery === 'Ukr Poshta') {
			const cityInput = document.createElement('input');
			cityInput.type = 'text';
			cityInput.id = 'cityInput';
			cityInput.classList.add('form-control');
			cityInput.placeholder = 'Enter your city';
			cityInput.required = true;
			cityInput.pattern = '[A-Za-z]+';

			const postOfficeInput = document.createElement('input');
			postOfficeInput.type = 'text';
			postOfficeInput.id = 'postOfficeInput';
			postOfficeInput.classList.add('form-control');
			postOfficeInput.placeholder = 'Enter post office number';
			postOfficeInput.required = true;
			postOfficeInput.pattern = '[0-9]+';

			deliveryDetailsContainer.appendChild(cityInput);
			deliveryDetailsContainer.appendChild(postOfficeInput);
		} else if (delivery === 'Courier Delivery') {
			const addressInput = document.createElement('input');
			addressInput.type = 'text';
			addressInput.id = 'addressInput';
			addressInput.classList.add('form-control');
			addressInput.placeholder = 'Enter your address';
			addressInput.required = true;
			addressInput.pattern = '[A-Za-z]+';

			const datePicker = document.createElement('input');
			datePicker.type = 'date';
			datePicker.id = 'datePicker';
			datePicker.classList.add('form-control');
			datePicker.required = true;

			const today = new Date().toISOString().split('T')[0];
			datePicker.min = today;

			const timePickerContainer = document.createElement('div');
			timePickerContainer.classList.add('time-picker-container');

			const timePicker = document.createElement('input');
			timePicker.type = 'time';
			timePicker.id = 'timePicker';
			timePicker.classList.add('form-control');
			timePicker.required = true;
			timePicker.min = '08:00';
			timePicker.max = '20:00';

			const workingHoursMessage = document.createElement('p');
			workingHoursMessage.textContent = 'Working hours: 08:00 - 20:00';

			timePickerContainer.appendChild(timePicker);
			timePickerContainer.appendChild(workingHoursMessage);

			deliveryDetailsContainer.appendChild(addressInput);
			deliveryDetailsContainer.appendChild(datePicker);
			deliveryDetailsContainer.appendChild(timePickerContainer);
		}
	}

	addSlash(event) {
		const input = event.target;
		const trimmedValue = input.value.replace(/\s/g, '');
		const newValue = trimmedValue.replace(/(\d{2})(\d{0,2})$/, '$1/$2');
	 
		input.value = newValue.slice(0, 5); // Обмежуємо довжину рядка до 5 символів (наприклад, 11/22)
	 }
	 
	
	 
	 

}


export default DistrictSelector;
