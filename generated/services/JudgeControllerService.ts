import { request as __request } from './../core/request';
import { OpenAPI } from './../core/OpenAPI';
import { CancelablePromise } from './../core/CancelablePromise';
/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionSubmit } from '../models/QuestionSubmit';
import type { QuestionSubmitRequest } from '../models/QuestionSubmitRequest';
import type { SubmitResultVO } from '../models/SubmitResultVO';
// import type { CancelablePromise } from '../../judege/core/CancelablePromise';
// import { OpenAPI } from '../../judege/core/OpenAPI';
// import { request as __request } from '../../judege/core/request';
export class JudgeControllerService {
  /**
   * debug
   * @param questionSubmitRequest questionSubmitRequest
   * @returns SubmitResultVO OK
   * @returns any Created
   * @throws ApiError
   */
  public static debugUsingPost(questionSubmitRequest: QuestionSubmitRequest): CancelablePromise<SubmitResultVO | any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/judge/debug',
      body: questionSubmitRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * doJudge
   * @param questionSubmitId questionSubmitId
   * @returns QuestionSubmit OK
   * @returns any Created
   * @throws ApiError
   */
  public static doJudgeUsingPost(questionSubmitId: number): CancelablePromise<QuestionSubmit | any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/judge/do',
      query: {
        questionSubmitId: questionSubmitId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
