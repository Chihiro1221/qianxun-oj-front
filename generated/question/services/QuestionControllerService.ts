/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponseBoolean } from '../models/BaseResponseBoolean';
import type { BaseResponseLong } from '../models/BaseResponseLong';
import type { BaseResponsePageQuestion } from '../models/BaseResponsePageQuestion';
import type { BaseResponsePageQuestionSubmitVO } from '../models/BaseResponsePageQuestionSubmitVO';
import type { BaseResponsePageQuestionVO } from '../models/BaseResponsePageQuestionVO';
import type { BaseResponseQuestion } from '../models/BaseResponseQuestion';
import type { BaseResponseQuestionSubmitVO } from '../models/BaseResponseQuestionSubmitVO';
import type { BaseResponseQuestionVO } from '../models/BaseResponseQuestionVO';
import type { ChatRequest } from '../models/ChatRequest';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { QuestionAddRequest } from '../models/QuestionAddRequest';
import type { QuestionEditRequest } from '../models/QuestionEditRequest';
import type { QuestionQueryRequest } from '../models/QuestionQueryRequest';
import type { QuestionSubmitQueryRequest } from '../models/QuestionSubmitQueryRequest';
import type { QuestionUpdateRequest } from '../models/QuestionUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionControllerService {
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static updateQuestion(
        requestBody: QuestionUpdateRequest,
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
     * @returns BaseResponsePageQuestionSubmitVO OK
     * @throws ApiError
     */
    public static listQuestionSubmitByPage(
        requestBody: QuestionSubmitQueryRequest,
    ): CancelablePromise<BaseResponsePageQuestionSubmitVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question_submit/list/page',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponsePageQuestionVO OK
     * @throws ApiError
     */
    public static listMyQuestionVoByPage(
        requestBody: QuestionQueryRequest,
    ): CancelablePromise<BaseResponsePageQuestionVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/list/page/vo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponsePageQuestion OK
     * @throws ApiError
     */
    public static listQuestionByPage(
        requestBody: QuestionQueryRequest,
    ): CancelablePromise<BaseResponsePageQuestion> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/list/page',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponsePageQuestionVO OK
     * @throws ApiError
     */
    public static listQuestionVoByPage(
        requestBody: QuestionQueryRequest,
    ): CancelablePromise<BaseResponsePageQuestionVO> {
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
    public static editQuestion(
        requestBody: QuestionEditRequest,
    ): CancelablePromise<BaseResponseBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseBoolean OK
     * @throws ApiError
     */
    public static deleteQuestion(
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
     * @returns string OK
     * @throws ApiError
     */
    public static stream1(
        requestBody: ChatRequest,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/chat/stream',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns BaseResponseLong OK
     * @throws ApiError
     */
    public static addQuestion(
        requestBody: QuestionAddRequest,
    ): CancelablePromise<BaseResponseLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns BaseResponseQuestion OK
     * @throws ApiError
     */
    public static getQuestionById1(
        id: number,
    ): CancelablePromise<BaseResponseQuestion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @param submitId
     * @returns BaseResponseQuestionSubmitVO OK
     * @throws ApiError
     */
    public static getQuestionSubmitVoById(
        submitId: number,
    ): CancelablePromise<BaseResponseQuestionSubmitVO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get/{submit_id}',
            path: {
                'submit_id': submitId,
            },
        });
    }
    /**
     * @param id
     * @returns BaseResponseQuestionVO OK
     * @throws ApiError
     */
    public static getQuestionVoById(
        id: number,
    ): CancelablePromise<BaseResponseQuestionVO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get/vo',
            query: {
                'id': id,
            },
        });
    }
}
