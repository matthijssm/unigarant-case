export type ErrorResponse = {
    status: "error";
    message: string;
};

export type SuccessResponse<T> = {
    status: "success";
    data: T;
};

export type CoverageAdviceResponse =
    | SuccessResponse<{
          advice: "changeCoverage" | "getTemporaryCoverage";
      }>
    | ErrorResponse;
