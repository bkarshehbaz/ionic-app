import * as importChance from "chance";
import { sample, values } from "lodash";

const chance = new importChance.Chance();


class CarPhotosProvider {

}

// tslint:disable-next-line:max-line-length
export const colorsFromDTwenty = {"AME":"Amethyst/Purple","DGR":"Dark Green","PLE":"Purple","BGE":"Beige","GLD":"Gold","PNK":"Pink","BLK":"Black","GRN":"Green","RED":"Red","BLU":"Blue","GRY":"Gray","SIL":"Silver/Aluminum","BRO":"Brown","LAV":"Lavender","TAN":"Tan","BRZ":"Bronze","LBL":"Light Blue","TEA":"Teal","CAM":"Camouflage","LGR":"Light Green","TPE":"Taupe/Brown","COM":"Chrome/Stainless Steel","MAR":"Maroon/Burgundy","TRQ":"Turquoise","CRP":"Copper","MUL":"Multi-colored","WHI":"White","CRM":"Cream","MVE":"Mauve","YEL":"Yellow","DBL":"Dark Blue","ONG":"Orange"};

// NOTE further improvements, we can go ahead and read 2016 Card Design Standard (3).pdf
export let realLicenseCodes:any = {
                              DAC:					"customerFirstName",
                              DAD:					"customerMiddleName",
                              DAB:					"customerLastName",
                              DCS:          "customerFamilyName",
                              DAQ:					"licenseNumber",
                              DBB:					"dob",
                              DBC:					"gender",
                              DAY:					"eyeColor",
                              DAZ:					"hairColor",
                              DAV:					"height",
                              DAL:					"streetAddress",
                              DAN:					"city",
                              State:				"state",
                              DAP:					"zipcode"
                             };
export let licenseCodes:any = {DAC:"DAC",DAD:"DAD",DAB:"DAB",DCS:"DCS",DAQ:"DAQ",DBB:"DBB",DBC:"DBC",DAY:"DAY",DAZ:"DAZ",DAV:"DAV",DAL:"DAL",DAN:"DAN",DAP:"DAP"};

export let availableCars = [
  {
	make:"Chevrolet",
	model:"",
	color:"red",
	filename:["IMG-20170722-WA0011.jpg"]
},
{
	make:"Ford",
	model:"Transit",
	color:"white",
	filename:["IMG-20170722-WA0017.jpg",
			"IMG-20170722-WA0018.jpg",
 			"IMG-20170722-WA0019.jpg"]
},
{
	make:"Ford",
	model:"Explorer",
	color:"red",
	filename:["IMG-20170722-WA0007.jpg","IMG-20170722-WA0008.jpg"]
},
{
	make:"Ford",
	model:"Escape",
	color:"grey",
	filename:["IMG-20170722-WA0028.jpg"]
},
{
	make:"Ford",
	model:"Explorer",
	color:"grey",
	filename:["IMG-20170722-WA0006.jpg"]
},
{
	make:"Hyundai",
	model:"Santa Fe",
	color:"grey",
	filename:["IMG-20170722-WA0029.jpg","IMG-20170722-WA0030.jpg"]
},
{
	make:"Hyundai",
	model:"Elantra",
	color:"white",
	filename:["IMG-20170722-WA0001.jpg"]
},
{
	make:"KIA",
	model:"Rio",
	color:"white",
	filename:["IMG-20170722-WA0020.jpg"]
},
{
	make:"KIA",
	model:"Sportage",
	color:"white",
	filename:["IMG-20170722-WA0021.jpg","IMG-20170722-WA0022.jpg"]
},
{
	make:"Subaru",
	model:"WRX",
	color:"white",
	filename:["IMG-20170722-WA0000.jpg"]
},
{
	make:"Toyota",
	model:"Corolla",
	color:"black",
	filename:["IMG-20170722-WA0002.jpg"]
},
{
	make:"Honda",
	model:"Accord",
	color:"black",
	filename:["IMG-20170722-WA0023.jpg","IMG-20170722-WA0024.jpg","IMG-20170722-WA0025.jpg"]
},
{
	make:"Volkswagen",
	model:"Golf",
	color:"grey",
	filename:["IMG-20170722-WA0023.jpg","IMG-20170722-WA0024.jpg","IMG-20170722-WA0025.jpg"]
}
];
export let userToLogin = {
  "userID": 1000000014,
  "areaManagerID": 1000000000,
  "accountTypeID": 1000000000,
  "currentPropertyID": null,
  "username": "smooth",
  "password": "$2a$10$nac4KfxyLUhX7K.whjovmeV8e4EYXbsooVlD/.qbDIwVhLFpoTogy",
  "userFirstName": "Stephen",
  "userLastName": "Tuffour",
  "userEmail": "smooth1@gmail.com",
  "userPhone": "7045996235",
  "isActive": 1,
  "payPrivilege": 0,
  "manual": 1,
  "createDate": null,
  "modDate": null,
  // tslint:disable-next-line:max-line-length
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEwMDAwMDAwMTQsImFyZWFNYW5hZ2VySUQiOjEwMDAwMDAwMDAsImFjY291bnRUeXBlSUQiOjEwMDAwMDAwMDAsImN1cnJlbnRQcm9wZXJ0eUlEIjpudWxsLCJ1c2VybmFtZSI6InNtb290aCIsInBhc3N3b3JkIjoiJDJhJDEwJG5hYzRLZnh5TFVoWDdLLndoam92bWVWOGU0RVlYYnNvb1ZsRC8ucWJESXdWaExGcG9Ub2d5IiwidXNlckZpcnN0TmFtZSI6IlN0ZXBoZW4iLCJ1c2VyTGFzdE5hbWUiOiJUdWZmb3VyIiwidXNlckVtYWlsIjoic21vb3RoMUBnbWFpbC5jb20iLCJ1c2VyUGhvbmUiOiI3MDQ1OTk2MjM1IiwiaXNBY3RpdmUiOjEsInBheVByaXZpbGVnZSI6MSwibWFudWFsIjoxLCJjcmVhdGVEYXRlIjpudWxsLCJtb2REYXRlIjpudWxsLCJpYXQiOjE0OTk4OTM0MjgsImV4cCI6MTQ5OTk3OTgyOH0.vj9cH-phUlvBiOF2jrtnA3Qs7B12oy-NhQxlgGjfaDU",
  "CurrentProperty": {
    "userID": 1000000014,
    "propertyID": 1000000000,
    "areaManagerID": 1000000000,
    "cityID": 1000000000,
    "streetAddress": "222 S. Caldwell st.",
    "propertyName": "Hyatt Place",
    "schemaName": "ValetDB",
    "timeZone": "US/Eastern",
    "isActive": 1,
    "createDate": null,
    "modDate": null
  }
};
