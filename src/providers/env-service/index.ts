// import { LocalStorageService } from "../local-storage-service/local-storage-service";
import { isEmpty } from "lodash";
import { IEnv } from "../local-storage-service/local-storage-service";
// import { VVSApp } from "../vvs-controller/vvs-controller";

export class EnvService {

	static _env: IEnv;

	static get() {
		// if (EnvService._env) {
		// 	return Promise.resolve(EnvService._env);
		// }


		// return vvsApp.lss._getString("Environment").then( x => x || "prod" );
		return !isEmpty(EnvService._env) ? EnvService._env : "prod";
	}

	// static set(vvsApp: VVSApp, env: IEnv) {
	// 	EnvService._env = env;
	// 	return vvsApp.lss._setString("Environment", env, false);
	// }

}
