/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponseBoolean } from '../models/BaseResponseBoolean';
import type { BaseResponseLoginUserVO } from '../models/BaseResponseLoginUserVO';
import type { BaseResponseLong } from '../models/BaseResponseLong';
import type { BaseResponsePageUser } from '../models/BaseResponsePageUser';
import type { BaseResponsePageUserVO } from '../models/BaseResponsePageUserVO';
import type { BaseResponseUser } from '../models/BaseResponseUser';
import type { BaseResponseUserVO } from '../models/BaseResponseUserVO';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { UserAddRequest } from '../models/UserAddRequest';
import type { UserLoginRequest } from '../models/UserLoginRequest';
import type { UserQueryRequest } from '../models/UserQueryRequest';
import type { UserRegisterRequest } from '../models/UserRegisterRequest';
import type { UserUpdateMyRequest } from '../models/UserUpdateMyRequest';
import type { UserUpdateRequest } from '../models/UserUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserControllerService {
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static updateUser(
        requestBody: UserUpdateRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static updateMyUser(
        requestBody: UserUpdateMyRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/update/my',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseLong OK
     * @throws ApiError
     */
    public static userRegister(
        requestBody: UserRegisterRequest,
    ): CancelablePromise<BaseResponseLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static userLogout(): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/logout',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseLoginUserVO OK
     * @throws ApiError
     */
    public static userLogin(
        requestBody: UserLoginRequest,
    ): CancelablePromise<BaseResponseLoginUserVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponsePageUser OK
     * @throws ApiError
     */
    public static listUserByPage(
        requestBody: UserQueryRequest,
    ): CancelablePromise<BaseResponsePageUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/list/page',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponsePageUserVO OK
     * @throws ApiError
     */
    public static listUserVoByPage(
        requestBody: UserQueryRequest,
    ): CancelablePromise<BaseResponsePageUserVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/list/page/vo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static deleteUser(
        requestBody: DeleteRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseLong OK
     * @throws ApiError
     */
    public static addUser(
        requestBody: UserAddRequest,
    ): CancelablePromise<BaseResponseLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param arg0
     * @returns BaseResponseUser OK
     * @throws ApiError
     */
    public static getUserById(
        arg0: number,
    ): CancelablePromise<BaseResponseUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get',
            query: {
                'arg0': arg0,
            },
        });
    }
    /**
     * @param arg0
     * @returns BaseResponseUserVO OK
     * @throws ApiError
     */
    public static getUserVoById(
        arg0: number,
    ): CancelablePromise<BaseResponseUserVO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get/vo',
            query: {
                'arg0': arg0,
            },
        });
    }
    /**
     * @returns BaseResponseLoginUserVO OK
     * @throws ApiError
     */
    public static getLoginUser(): CancelablePromise<BaseResponseLoginUserVO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get/login',
        });
    }
}
