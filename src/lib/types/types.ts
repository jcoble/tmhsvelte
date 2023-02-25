// {
//     "drugGroup": {
//         "name": null,
//         "conceptGroup": [
//             {
//                 "tty": "BPCK"
//             },
//             {
//                 "tty": "SBD",
//                 "conceptProperties": [
//                     {
//                         "rxcui": "854875",
//                         "name": "zolpidem tartrate 10 MG Oral Tablet [Ambien]",
//                         "synonym": "Ambien 10 MG Oral Tablet",
//                         "tty": "SBD",
//                         "language": "ENG",
//                         "suppress": "N",
//                         "umlscui": ""
//                     },
//                     {
//                         "rxcui": "854878",
//                         "name": "zolpidem tartrate 5 MG Oral Tablet [Ambien]",
//                         "synonym": "Ambien 5 MG Oral Tablet",
//                         "tty": "SBD",
//                         "language": "ENG",
//                         "suppress": "N",
//                         "umlscui": ""
//                     },
//                     {
//                         "rxcui": "854882",
//                         "name": "zolpidem tartrate 12.5 MG Extended Release Oral Tablet [Ambien]",
//                         "synonym": "Ambien CR 12.5 MG Extended Release Oral Tablet",
//                         "tty": "SBD",
//                         "language": "ENG",
//                         "suppress": "N",
//                         "umlscui": ""
//                     },
//                     {
//                         "rxcui": "854896",
//                         "name": "zolpidem tartrate 6.25 MG Extended Release Oral Tablet [Ambien]",
//                         "synonym": "Ambien CR 6.25 MG Extended Release Oral Tablet",
//                         "tty": "SBD",
//                         "language": "ENG",
//                         "suppress": "N",
//                         "umlscui": ""
//                     }
//                 ]
//             }
//         ]
//     }
// }
export type RXNavResponse = {
	drugGroup: DrugGroup;
};

export type DrugGroup = {
	name?: any;
	conceptGroup: ConceptGroup[];
};

export type ConceptGroup = {
	tty: string;
	conceptProperties?: ConceptProperty[];
};

export type ConceptProperty = {
	rxcui: string;
	name: string;
	synonym: string;
	tty: string;
	language: string;
	suppress: string;
	umlscui: string;
};

export type Medication = {
	value: string;
	rxCui: string;
	name: string;
	synonym: string;
	tTY: string;
	language: string;
	suppress: string;
	umlsCui: string;
};
