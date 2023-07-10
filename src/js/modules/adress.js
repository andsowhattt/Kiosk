export class DistrictSelector {
	constructor(citySelectId, districtSelectId, districtsByCity) {
		this.citySelect = document.getElementById(citySelectId);
		this.districtSelect = document.getElementById(districtSelectId);
		this.districtsByCity = districtsByCity;

		this.initialize();
	}

	initialize() {
		this.citySelect.addEventListener("change", () => {
			this.updateDistricts();
		});
	}

	updateDistricts() {
		const selectedCity = this.citySelect.value;
		const districts = this.districtsByCity[selectedCity] || [];

		this.districtSelect.innerHTML = "";

		if (districts.length > 0) {
			this.districtSelect.disabled = false;
			const defaultOption = document.createElement("option");
			defaultOption.text = "Choose...";
			this.districtSelect.add(defaultOption);

			for (let i = 0; i < districts.length; i++) {
				const option = document.createElement("option");
				option.text = districts[i];
				this.districtSelect.add(option);
			}
		} else {
			this.districtSelect.disabled = true;
			const defaultOption = document.createElement("option");
			defaultOption.text = "N/A";
			this.districtSelect.add(defaultOption);
		}
	}
}

export const districtsByCity = {
	"Kyiv": ["Darnytskyi", "Desnianskyi", "Dniprovskyi", "Holosiivskyi", "Obolon", "Pecherskyi", "Podilskyi", "Shevchenkivskyi", "Solomianskyi", "Sviatoshynskyi"],
	"Vinnytsia": ["Central", "Zamostyansky", "Soborny", "Yermakivskyi", "Kholmskyi", "Novobylychi"],
	"Dnipro": ["Amur-Nizhnyodniprovsky", "Babushkinsky", "Zhovtnevy", "Industrialny", "Zhovtnevy", "Krasnoselytskyi", "Leninskyi", "Samarskyi", "Soborny", "Ternivskyi"],
	"Donetsk": ["Builders", "Voroshilovskyi", "Kyivskyi", "Kirovskyi", "Leninskyi", "Petrovskyi", "Proletarskyi", "Kyivskyi", "Shakhtarskyi"],
	"Zaporizhia": ["Voznesenivskyi", "Shevchenkivskyi", "Zavodskyi", "Komunarskyi", "Leninskyi", "Ordzhonikidzevskyi", "Khortytskyi"],
	"Ivano-Frankivsk": ["Halytskyi", "Zaliznychnyi", "Nadrichnyi", "Stryskyi"],
	"Kropyvnytskyi": ["Blyzniukivskyi", "Central", "October", "Ship", "Peremohy", "Ternivskyi"],
	"Luhansk": ["Artemivsky", "Zhovtnevy", "Zhovtnevy", "Kamyanobridsky", "Leninsky", "Robitnychy", "Central"],
	"Lutsk": ["Castle", "Lutskyi", "Rovantsivskyi", "Eastern", "Central"],
	"Lviv": ["Frankivsk", "Halytskyi", "Lychakivskyi", "Zaliznychnyi", "Sikhivskyi", "Shevchenkivskyi"],
	"Mykolaiv": ["Central", "Ingulsky", "Zavodsky", "Zaliznychny", "Leninsky", "Ternovsky"],
	"Odesa": ["Primorskyi", "Malynivskyi", "Kyivskyi", "Suvorovskyi", "Shevchenkivskyi"],
	"Poltava": ["Kyivskyi", "Kotovskyi", "Skhidnyi", "Shevchenkivskyi"],
	"Rivne": ["Zavodsky", "Cascade", "Koretskyi", "Korolevskyi", "Skhidnyi", "Chernivetskyi"],
	"Sumi": ["Airport", "Voznesenskyi", "Kovpakivskyi", "Kovpakivskyi", "Central"],
	"Ternopil": ["Berezhany", "Veliki Birky", "Halych", "Zalishchyki", "Zbarazh", "Zboriv", "Kremenets", "Lanivtsi", "Monastyriska", "Podvolochysk", "Terebovlya", "Ternopil", "Chortkiv", "Shumsk"],
	"Uzhhorod": ["Zakarpatskyi", "Kyivskyi", "Leninskyi", "Perechinskyi", "Svalyavskyi", "Tyachivskyi", "Uzhgorodskyi", "Khustskyi", "Chopskyi"],
	"Kharkiv": ["Zhovtnevy", "Zaliznychny", "Industrial", "Kyiv", "Comintern", "Moscow", "Nemyshlyan", "Olexiiv", "Osnovyan", "Slobid"],
	"Kherson": ["Beryslavskyi", "Bilozerskyi", "Velikooleksandrivskyi", "Vysokopilskyi", "Genicheskyi", "Holopristanskyi", "Ivanivskyi", "Kalanchatskyi", "Kakhovskyi", "Nizhnyosyrogozskyi", "Novovorontsovskyi", " Skadovsky", "Tavriysky"],
	"Khmelnytskyi": ["Volochyskyi", "Horodotskyi", "Dunayevetskyi", "Izyaslavskyi", "Kamyanets-Podilskyi", "Krasilivskyi", "Netishynskyi", "Polonskyi", "Slavutskyi", "Starokostyantynivskyi", " Starosyniavskyi", "Teofipolskyi"],
	"Cherkasy": ["Vatutynskyi", "Horodishchenskyi", "Zhashkivskyi", "Zvenigorodskyi", "Zolotoniskyi", "Kamyanskyi", "Kanivskyi", "Katerynopilskyi", "Lysyanskyi", "Mankivskyi", "Monastyrischenskyi", "Smilyanskyi", "Talnivskyi", "Umanskyi"],
	"Chernivtsi": ["Hlybtskyi", "Zastavnivskyi", "Kelmenetskyi", "Kitsmanskyi", "Novoselytskyi", "Putilskyi", "Sokiryanskyi", "Storozhynetskyi", "Khotynskyi"],
	"Chernihiv": ["Bakhmatskyi", "Bobrovytskyi", "Borznyanskyi", "Varvinskyi", "Verkhnyodniprovskyi", "Horodnyanskyi", "Ichnyanskyi", "Kozeletskyi", "Koropskyi", "Minskyi", "Nizhynskyi", " Novgorod-Siversky", "Nosivskyi", "Prylutskyi", "Ripkinskyi", "Semenivskyi", "Snovskyi", "Sosnytskyi", "Talalayivskyi"],
};