import request from '../utils/request';

export async function singleCollection(id) {
  return request('/mock/singleCollection', {
    method: 'GET',
    ...(id || {}),
  });
}

export async function getCollectionEntries(id, category) {
  return request(`/mock/getCollectionEntries/${category}`, {
    method: 'GET',
    ...(id || {}),
  });
}
