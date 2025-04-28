import { map } from "lodash";
import { ENV } from "../environments";

export const getGMapUrl = (location) => {
	return `https://www.mapquestapi.com/staticmap/v5/map?` + map({
	//	key: "0V43xuRCqtKYsdAvRjrIjTr5yZlF9cyr",
		key: "0V43xuRCqtKYsdAvRjrIjTr5yZlF9cyr",
		center: location,
		locations: location,
		zoom: 17,
		format: 'png',
		type: 'hyb',
		defaultMarker: 'marker-3B5998-sm',
		// pois: `posis=white_1,${},${}`,
		size: '480,190',
}, (v, k) => k + "=" + v).join("&");
};


// export const getGMapUrl = (location) => {
// 	return ENV.GOOGLE_MAP_STATIC_API_BASE_URL + "?" + map({
// 		center: location,
// 		zoom: 18,
// 		scale: false,
// 		size: '600x300',
// 		maptype: 'roadmap',
// 		format: 'png',
// 		visual_refresh: true,
// 		markers: `size:mid%7Ccolor:0xff0000%7Clabel:1%7C${location}`,
// 		key: ENV.GOOGLE_MAP_STATIC_API_KEY,
// 	}, (v, k) => k + "=" + v).join("&");
// };
