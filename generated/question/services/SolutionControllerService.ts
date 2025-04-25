/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponseBoolean } from '../models/BaseResponseBoolean';
import type { BaseResponseLong } from '../models/BaseResponseLong';
import type { BaseResponsePageSolutionVO } from '../models/BaseResponsePageSolutionVO';
import type { BaseResponseSolutionVO } from '../models/BaseResponseSolutionVO';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { SolutionAddRequest } from '../models/SolutionAddRequest';
import type { SolutionQueryRequest } from '../models/SolutionQueryRequest';
import type { SolutionUpdateRequest } from '../models/SolutionUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SolutionControllerService {
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static updateViewCount(
        requestBody: SolutionQueryRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/solution/view_count/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static updateSolution(
        requestBody: SolutionUpdateRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/solution/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static unlike(
        requestBody: SolutionQueryRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/solution/unlike',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static unFavorite(
        requestBody: SolutionQueryRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/solution/unFavorite',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponsePageSolutionVO OK
     * @throws ApiError
     */
    public static listMySolutionVoByPage(
        requestBody: SolutionQueryRequest,
    ): CancelablePromise<BaseResponsePageSolutionVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/solution/my/list/page/vo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponsePageSolutionVO OK
     * @throws ApiError
     */
    public static listSolutionVoByPage(
        requestBody: SolutionQueryRequest,
    ): CancelablePromise<BaseResponsePageSolutionVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/solution/list/page/vo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static like(
        requestBody: SolutionQueryRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/solution/like',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static addFavorite(
        requestBody: SolutionQueryRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/solution/favorite',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static deleteSolution(
        requestBody: DeleteRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/solution/delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseLong OK
     * @throws ApiError
     */
    public static addSolution(
        requestBody: SolutionAddRequest,
    ): CancelablePromise<BaseResponseLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/solution/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param solutionId
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static isLiked(
        solutionId: number,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/solution/upvote_count/my/{solutionId}',
            path: {
                'solutionId': solutionId,
            },
        });
    }
    /**
     * @param id
     * @returns BaseResponseSolutionVO OK
     * @throws ApiError
     */
    public static getSolutionVoById(
        id: number,
    ): CancelablePromise<BaseResponseSolutionVO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/solution/get/vo',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param solutionId
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static isFavorite(
        solutionId: number,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/solution/favorite_count/my/{solutionId}',
            path: {
                'solutionId': solutionId,
            },
        });
    }
}
