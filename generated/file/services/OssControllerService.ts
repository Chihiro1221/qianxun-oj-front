/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {BaseResponseString} from '../models/BaseResponseString';
import type {CancelablePromise} from '../core/CancelablePromise';
import {OpenAPI} from '../core/OpenAPI';
import {request as __request} from '../core/request';

export class OssControllerService {
    /**
     * @param requestBody
     * @returns BaseResponseString OK
     * @throws ApiError
     */
    public static uploadFile(
        requestBody?: FormData
    ): CancelablePromise<BaseResponseString> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oss/upload',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: requestBody,
            // formData: requestBody
            // mediaType: 'application/json',
        });
    }
}
