export declare class Pipeline {
    middlewares: Task[];
    constructor();
    pipe(fn: Task): this;
    run(params: any): Promise<any>;
}
export interface Task {
    (data: any, next?: (result?: any) => void, stop?: (reason?: any) => void): void;
}
