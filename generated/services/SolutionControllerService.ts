/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../../generated/models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../../generated/models/BaseResponse_long_';
import type { BaseResponse_Page_SolutionVO_ } from '../../generated/models/BaseResponse_Page_SolutionVO_';
import type { BaseResponse_SolutionVO_ } from '../../generated/models/BaseResponse_SolutionVO_';
import type { DeleteRequest } from '../../generated/models/DeleteRequest';
import type { SolutionAddRequest } from '../../generated/models/SolutionAddRequest';
import type { SolutionQueryRequest } from '../../generated/models/SolutionQueryRequest';
import type { CancelablePromise } from '../../generated/core/CancelablePromise';
import { OpenAPI } from '../../generated/core/OpenAPI';
import { request as __request } from '../../generated/core/request';
export class SolutionControllerService {
    /**
     * addSolution
     * @param solutionAddRequest solutionAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addSolutionUsingPost(
        solutionAddRequest: SolutionAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/solution/add',
            body: solutionAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteSolution
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteSolutionUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/solution/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * addFavorite
     * @param solutionQueryRequest solutionQueryRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addFavoriteUsingPost(
        solutionQueryRequest: SolutionQueryRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/solution/favorite',
            body: solutionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * isFavorite
     * @param solutionId solutionId
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static isFavoriteUsingGet(
        solutionId: number,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/solution/favorite_count/my/{solutionId}',
            path: {
                'solutionId': solutionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getSolutionVOById
     * @param id id
     * @returns BaseResponse_SolutionVO_ OK
     * @throws ApiError
     */
    public static getSolutionVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_SolutionVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/solution/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * like
     * @param solutionQueryRequest solutionQueryRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static likeUsingPost(
        solutionQueryRequest: SolutionQueryRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/solution/like',
            body: solutionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listSolutionVOByPage
     * @param solutionQueryRequest solutionQueryRequest
     * @returns BaseResponse_Page_SolutionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listSolutionVoByPageUsingPost(
        solutionQueryRequest: SolutionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_SolutionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/solution/list/page/vo',
            body: solutionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMySolutionVOByPage
     * @param solutionQueryRequest solutionQueryRequest
     * @returns BaseResponse_Page_SolutionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMySolutionVoByPageUsingPost(
        solutionQueryRequest: SolutionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_SolutionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/solution/my/list/page/vo',
            body: solutionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * unFavorite
     * @param solutionQueryRequest solutionQueryRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static unFavoriteUsingPost(
        solutionQueryRequest: SolutionQueryRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/solution/unFavorite',
            body: solutionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * unlike
     * @param solutionQueryRequest solutionQueryRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static unlikeUsingPost(
        solutionQueryRequest: SolutionQueryRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/solution/unlike',
            body: solutionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * isLiked
     * @param solutionId solutionId
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static isLikedUsingGet(
        solutionId: number,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/solution/upvote_count/my/{solutionId}',
            path: {
                'solutionId': solutionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateViewCount
     * @param solutionQueryRequest solutionQueryRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateViewCountUsingPost(
        solutionQueryRequest: SolutionQueryRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/solution/view_count/add',
            body: solutionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
