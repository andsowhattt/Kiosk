class DistrictSelector {
	constructor(citySelectId, districtSelectId) {
		this.citySelectId = citySelectId;
		this.districtSelectId = districtSelectId;
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
			"Odesa": ["Odesa","Berezivskyi", "Bilhorod-Dnistrovskyi", "Bolgradskyi", "Izmailskyi", "Podilskyi","Rozdilnianskyi"],
			"Poltava": ["Poltava", "Kremenchutskyi", "Lubensky", "Myrhorodskyi"],
			"Rivne": ["Rivne", "Varasky", "Dubensky", "Sarnensky"],
			"Sumy": ["Sumy", "Konotopsky", "Shostkinsky", "Okhtyrsky", "Romensky"],
			"Ternopil": ["Ternopil", "Kremenetsky", "Chortkivskyi"],
			"Uzhhorod": ["Uzhhorod","Berehivskyi", "Mukachivskyi", "Rakhivskyi", "Tyachivskyi", "Khustskyi"],
			"Kharkiv": ["Kharkiv", "Bogoduhivskyi", "Izyumskyi", "Krasnogradskyi", "Kupianskyi", "Lozovsky", "Chuguyivskyi"],
			"Kherson": ["Kherson", "Beryslavskyi", "Henicheski", "Kakhovsky", "Skadovsky"],
			"Khmelnytskyi": ["Khmelnytskyi", "Kamianets-Podilskyi", "Shepetivskyi"],
			"Cherkasy": ["Cherkasy", "Zvenigorodsky", "Zolotonisky", "Umansky"],
			"Chernivtsi": ["Chernivtsi", "Vyzhnytskyi", "Dnistrovskyi"],
			"Chernihiv": ["Chernihiv", "Koryukivskyi", "Nizhynskyi", "Novgorod-Siverskyi", "Prylutskyi"],
		};

		this.citySelect = document.getElementById(this.citySelectId);
		this.districtSelect = document.getElementById(this.districtSelectId);

		this.citySelect.addEventListener('change', this.updateDistricts.bind(this));
		this.updateCityOptions();
	}

	updateCityOptions() {
		for (const city in this.districtsByCity) {
			const option = document.createElement('option');
			option.value = city;
			option.text = city;
			this.citySelect.add(option);
		}
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

		const districts = this.districtsByCity[selectedCity];

		districts.forEach((district) => {
			const option = document.createElement('option');
			option.text = district;
			this.districtSelect.add(option);
		});
	}
}

export default DistrictSelector;
