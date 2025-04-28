import { attempt, isError, isObject, isEmpty } from 'lodash';

export const parseJSON = <T>(str: string, _default: any = undefined): T => {

    if (isEmpty(str)) {
        return _default;
    }

    const data = !isObject(str) ? attempt(JSON.parse.bind(null, str)) : str;

	if (isError(data) || !data) {
		return _default;
	}

	return data as T;
    // return (isError(data) ? _default : data) as T;
};
