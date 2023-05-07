/* eslint-disable import/no-anonymous-default-export */
import { DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";
import api, { getAuthorizationHeader } from "../../services/index";

const myDataProvider = (apiUrl: string): DataProvider => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const filter = params.filter;
    filter.q ? (filter.q = filter.q.toLowerCase()) : null;

    const url = `${apiUrl}/${resource}?page=${JSON.stringify(
      page
    )}&perPage=${JSON.stringify(
      perPage
    )}&field=${field}&order=${order.toLowerCase()}&keyword=${
      filter.q ? filter.q : ""
    }`;

    return api.get(url).then((response) => {
      return {
        data: response.data.data,
        total: response.data.meta.total,
      };
    });
  },

  getOne: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return api.get(url).then((response) => {
      return {
        data: response.data,
      };
    });
  },

  getMany: (resource, params) => {
    return Promise.all(
      params.ids.map((id) => api.get(`${apiUrl}/${resource}/${id}`))
    ).then((responses) => {
      return {
        data: responses.map((response) => response.data),
      };
    });
  },

  getManyReference: (resource, params) => {
    return Promise.resolve({
      data: [],
      total: 0,
    });
  },

  update: (resource, params) =>
    api
      .patch(`${apiUrl}/${resource}/${params.id}`, params.data)
      .then((response) => {
        return {
          data: response.data,
          status: response.status,
        };
      }),

  // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        api.patch(`${apiUrl}/${resource}/${id}`, params.data)
      )
    ).then((responses) => {
      return {
        data: responses.map((response) => response.data),
        status: responses.map((response) => response.status),
      };
    }),

  create: (resource, params) =>
    api.post(`${apiUrl}/${resource}`, params.data).then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    }),
  delete: (resource, params) =>
    api.delete(`${apiUrl}/${resource}/${params.id}`).then((response) => {
      return {
        data: response.data,
        status: response.status,
      };
    }),

  // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) => api.delete(`${apiUrl}/${resource}/${id}`))
    ).then((responses) => ({
      data: responses.map((response) => response.data),
      status: responses.map((response) => response.status),
    })),
});

export default myDataProvider;
