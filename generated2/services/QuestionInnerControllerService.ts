/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatRequest } from '../models/ChatRequest';
import type { Question } from '../models/Question';
import type { QuestionSubmit } from '../models/QuestionSubmit';
import type { QuestionSubmitRequest } from '../models/QuestionSubmitRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionInnerControllerService {
    /**
     * @param requestBody
     * @returns boolean OK
     * @throws ApiError
     */
    public static updateQuestionSubmitById(
        requestBody: QuestionSubmit,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/inner/question_submit/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateQuestionAcceptedNum(
        requestBody: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/inner/question_submit/question/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static doQuestionSubmit(
        requestBody: QuestionSubmitRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/inner/question_submit/do',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static stream(
        requestBody: ChatRequest,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/inner/chat/stream',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param questionId
     * @returns QuestionSubmit OK
     * @throws ApiError
     */
    public static getQuestionSubmitById(
        questionId: number,
    ): CancelablePromise<QuestionSubmit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inner/question_submit/get/id',
            query: {
                'questionId': questionId,
            },
        });
    }
    /**
     * @param questionId
     * @returns Question OK
     * @throws ApiError
     */
    public static getQuestionById(
        questionId: number,
    ): CancelablePromise<Question> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inner/get/id',
            query: {
                'questionId': questionId,
            },
        });
    }
}
