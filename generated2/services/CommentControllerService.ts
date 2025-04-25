/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponseBoolean } from '../models/BaseResponseBoolean';
import type { BaseResponseLong } from '../models/BaseResponseLong';
import type { BaseResponsePageCommentVO } from '../models/BaseResponsePageCommentVO';
import type { CommentAddRequest } from '../models/CommentAddRequest';
import type { CommentQueryRequest } from '../models/CommentQueryRequest';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CommentControllerService {
    /**
     * @param requestBody
     * @returns BaseResponsePageCommentVO OK
     * @throws ApiError
     */
    public static listCommentVoByPage(
        requestBody: CommentQueryRequest,
    ): CancelablePromise<BaseResponsePageCommentVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/comment/list/page/vo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static deleteComment(
        requestBody: DeleteRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/comment/delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseLong OK
     * @throws ApiError
     */
    public static addComment(
        requestBody: CommentAddRequest,
    ): CancelablePromise<BaseResponseLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/comment/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
