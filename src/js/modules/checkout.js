class CheckOutForm {
	constructor(citySelectId, districtSelectId, deliverySelectId) {
		this.citySelectId = citySelectId;
		this.districtSelectId = districtSelectId;
		this.deliverySelectId = deliverySelectId;
		this.districtsByCity = {
			"Kyiv": ["Kyiv", "Bilotserkivskyi", "Boryspilskyi", "Brovarskyi", "Vyshhorodskyi", "Obukhivskyi", "Fastivskyi", "Buchanskyi"],
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

		this.initializeDOMElements();
		this.setupEventListeners();
	}

	initializeDOMElements() {
		this.citySelect = document.getElementById(this.citySelectId);
		this.districtSelect = document.getElementById(this.districtSelectId);
		this.deliverySelect = document.getElementById(this.deliverySelectId);
		this.ccExpirationInput = document.querySelector('.verifiraction__input-expiration');
	}

	setupEventListeners() {
		if (this.citySelect && this.districtSelect && this.deliverySelect) {
			this.citySelect.addEventListener('change', this.updateDistricts.bind(this));
			this.deliverySelect.addEventListener('change', this.updateDeliveryDetails.bind(this));
			this.updateCityOptions();

			this.citySelect.addEventListener('change', this.checkCustomOption.bind(this));
			this.districtSelect.addEventListener('change', this.checkCustomOption.bind(this));

			this.ccExpirationInput.addEventListener('input', this.addSlash.bind(this));
		}
	}

	updateCityOptions() {
		for (const city in this.districtsByCity) {
			this.createOption(city, city);
		}
		this.createOption('Other', 'Other');
	}

	createOption(value, text) {
		const option = document.createElement('option');
		option.value = value;
		option.text = text;
		this.citySelect.add(option);
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
			districts = ['Other'];
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
		const customCityInput = '<input type="text" id="customCityInput" class="form-control" placeholder="Enter your city" required pattern="[A-Za-z]+">';
		const customDistrictInput = '<input type="text" id="customDistrictInput" class="form-control" placeholder="Enter your district" required pattern="[A-Za-z]+">';
		this.citySelect.insertAdjacentHTML('afterend', customCityInput);
		this.districtSelect.insertAdjacentHTML('afterend', customDistrictInput);
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
		const deliveryDetailsContainer = document.querySelector('.delivery-details--js');
		deliveryDetailsContainer.innerHTML = '';
	
		if (delivery === 'Nova Poshta' || delivery === 'Ukr Poshta') {
			const cityInput = '<input type="text" id="cityInput" class="form-control" placeholder="Enter your city" required pattern="[A-Za-z]+">';
			const postOfficeInput = '<input type="text" id="postOfficeInput" class="form-control" placeholder="Enter post office number" required pattern="[0-9]+">';
			deliveryDetailsContainer.innerHTML = cityInput + postOfficeInput;
		} else if (delivery === 'Courier Delivery') {
			const addressInput = '<input type="text" id="addressInput" class="form-control" placeholder="Enter your address" required pattern="[A-Za-z]+">';
			const datePicker = '<input type="date" id="datePicker" class="form-control" required min="' + new Date().toISOString().split('T')[0] + '">';
			const timePickerContainer = '<div class="time-picker-container">' +
				'<input type="time" id="timePicker" class="form-control" required min="08:00" max="20:00">' +
				'<p>Working hours: 08:00 - 20:00</p>' +
				'</div>';
			deliveryDetailsContainer.innerHTML = addressInput + datePicker + timePickerContainer;
		}
	}
	

	addSlash(event) {
		const input = event.target;
		const trimmedValue = input.value.replace(/\s/g, '');
		const newValue = trimmedValue.replace(/(\d{2})(\d{0,2})$/, '$1/$2');

		input.value = newValue.slice(0, 5);
	}
}

export default CheckOutForm;