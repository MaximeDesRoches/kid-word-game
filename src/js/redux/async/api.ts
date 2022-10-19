
import ns from '../../NameSpace';
import toFormData from '../../utils/toFormData';

/**
 * This is a generic API implementation, that needs to be modified to reflect the actual backend API that will need to be implemented in the specific project you're working on.
 * */

// make sure that API path is available in the namespace
const baseApi = ns.api;
console.assert(Boolean(baseApi), 'Base API path not set in namespace. Please check Redux API setup.');


const API_ENDPOINTS = {
	foo: 'foo',
};

type GenericApiCallResponse<T> = {
	message: string,
	success: boolean,
	data: T,
};

const defaultHeaders = {};

function apiCall<T>(endpoint:string, method: string = 'get', data: object = null, headers: object = null):Promise<GenericApiCallResponse<T>> {
	// console.log('load', endpoint);
	let body = null;
	let qstr = '';
	if (data) {
		switch (method.toLowerCase()) {
			case 'get':
				qstr = '?' + Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
				break;
			case 'post':
			case 'put':
				body = toFormData(data);
				break;
			default:
		}
	}

	return fetch(`${baseApi}/${endpoint}${qstr}`, {
		method,
		body,
		headers: { ...defaultHeaders, ...headers },
	}).then(response => response.json()).then((json:GenericApiCallResponse<T>) => json);
}

const createApi = <TList, TSingle>(endpoint) => {
	return {
		getList: () => apiCall<TList[]>(endpoint),
		getSingle: (id: number) => apiCall<TSingle>(`${endpoint}/${id}`),
	};
};

export const FooApi = createApi<IFooListItem, IFooItem>(API_ENDPOINTS.foo);

