/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QuestionSubmitRequest = {
    sid?: string;
    userId?: number;
    question_id?: number;
    source_code?: string;
    language_id?: number;
    language?: string;
    stdin?: string;
    expected_output?: string;
    cpu_time_limit?: number;
    memory_limit?: number;
    stack_limit?: number;
    activity?: string;
};

