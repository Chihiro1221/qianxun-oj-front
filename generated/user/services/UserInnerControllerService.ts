/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserInnerControllerService {
    /**
     * @param idList
     * @returns User OK
     * @throws ApiError
     */
    public static listByIds(
        idList: Array<number>,
    ): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inner/get/ids',
            query: {
                'idList': idList,
            },
        });
    }
    /**
     * @param userId
     * @returns User OK
     * @throws ApiError
     */
    public static getById(
        userId: number,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inner/get/id',
            query: {
                'userId': userId,
            },
        });
    }
}
