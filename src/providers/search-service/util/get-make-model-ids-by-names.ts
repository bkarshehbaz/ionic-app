import { IModel, NumericMap, ISearchObject, IMake } from "../../../lib/vvs-bridge";
import { SearchService } from "../search-service";

import { Logger } from "../../../providers/vvs-controller/util/logger";
import { lowerCase, isEmpty, find } from "lodash";
import { RollbarService } from "../../../services/rollbar";
import { to } from "../../../util/to";
const logger = Logger.get("get-make-model-ids-by-names");

export async function _get_MakeModelIDs_by_Names(
	me: SearchService,
	makeName: string,
	modelName: string
) {
	const makeResults = me.makeIndex.search(lowerCase(makeName), { expand: true });
	logger.info("makeResults >> ",makeResults);

	let makeID: number;
	let modelID: number;

	let make: IMake;
	let model: IModel;

	let models: NumericMap<IModel>;

	if (!isEmpty(makeResults)) {
		makeID = makeResults[0].ref;

		[models] = await to<IModel[]>(me.lss.getModelsByMakeID(makeID as any));

		if (!isEmpty(models)) {
			logger.info(models);
			to(me.initModelIndex(models));

			const modelResults: ISearchObject[] = me.modelIndex.search(modelName, { expand: true });

			if (!isEmpty(modelResults)) {
				modelID = modelResults[0].ref as any;

				model = find(models, x => x.modelID == modelID);
			}
		}

		make = me.lss.global_makes[makeID];

	}

	if (!model) {

		if (!modelName) {
			me.lss.vvsApp.presentSingleAlert(
				"No make or model found: " +
				JSON.stringify({
					makeName, modelName, make, model, makeID, modelID
				}, null, 3)
			);
			return Promise.reject("No make and not model");
		}

		[ models ] = await to(me.lss.getModels());

		if (models) {
			me.initModelIndex(models);
			const modelResults: ISearchObject[] = me.modelIndex.search(modelName, { expand: true });
			if (!isEmpty(modelResults)) {
				modelID = modelResults[0].ref;

				model = models[modelID];
			}
		}

	}

	return {
		make, model
	};

	// if (Array.isArray(makeResults) && makeResults.length > 0) {
	// 	// const makeID = makeResults[0].ref;
	// 	// return me.lss
	// 	// 	.getModelsByMakeID(makeID)
	// 	// 	.then(($modelsByMakeID: NumericMap<IModel>) => {
	// 	// 		logger.info($modelsByMakeID);
	// 	// 		me.initModelIndex($modelsByMakeID);
	// 	// 	})
	// 	// 	.then(() => {
	// 	// 		const modelResults: NumericMap<IModel> = me.modelIndex.search(
	// 	// 			modelName,
	// 	// 			{ expand: true }
	// 	// 		);
	// 	// 		if (Array.isArray(modelResults) && modelResults.length > 0) {
	// 	// 			const modelID = modelResults[0].ref;
	// 	// 			// logger.debug("modelResults >> ",modelResults);
	// 	// 			// cb(makeID, modelID);

	// 	// 			return { makeID: Number(makeID), modelID: Number(modelID) };
	// 	// 		} else {
	// 	// 			return { makeID: Number(makeID) };
	// 	// 		}
	// 	// 	})
	// 	// 	.catch(logger.e);
	// } else {
	// 	if (!modelName) {
	// 		return Promise.reject("Not model");
	// 	}
	// 	logger.w("There is no make. About to check for the model");
	// 	return me.lss
	// 		.getModels()
	// 		.then(models => me.initModelIndex(models))
	// 		.then(() => {
	// 			// tslint:disable-next-line:no-debugger
	// 			// logger.debug();
	// 			const modelResults = me.modelIndex.search(modelName, {
	// 				expand: true
	// 			}) as NumericMap<IModel>;
	// 			if (Array.isArray(modelResults) && modelResults.length > 0) {
	// 				const modelID = modelResults[0].ref;
	// 				// logger.debug("modelResults >> ",modelResults);
	// 				// cb(9999999999, modelID);
	// 				return { makeID: 9999999999, modelID };
	// 			} else {
	// 				// TODO
	// 				// FIXME
	// 				return undefined;
	// 			}
	// 		})
	// 		.catch(logger.e);
	// }
	// //    });
}
