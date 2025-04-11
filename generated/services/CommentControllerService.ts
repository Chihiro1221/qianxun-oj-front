/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {BaseResponse_boolean_} from '../../generated/models/BaseResponse_boolean_';
import type {BaseResponse_long_} from '../../generated/models/BaseResponse_long_';
import type {BaseResponse_Page_CommentVO_} from '../../generated/models/BaseResponse_Page_CommentVO_';
import type {CommentAddRequest} from '../../generated/models/CommentAddRequest';
import type {CommentQueryRequest} from '../../generated/models/CommentQueryRequest';
import type {DeleteRequest} from '../../generated/models/DeleteRequest';
import type {CancelablePromise} from '../../generated/core/CancelablePromise';
import {OpenAPI} from '../../generated/core/OpenAPI';
import {request as __request} from '../../generated/core/request';

export class CommentControllerService {
    /**
     * addComment
     * @param commentAddRequest commentAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addCommentUsingPost(
        commentAddRequest: CommentAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/comment/add',
            body: commentAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteComment
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteCommentUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/comment/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listCommentVOByPage
     * @param commentQueryRequest commentQueryRequest
     * @returns BaseResponse_Page_CommentVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCommentVoByPageUsingPost(
        commentQueryRequest: CommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CommentVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/comment/list/page/vo',
            body: commentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
