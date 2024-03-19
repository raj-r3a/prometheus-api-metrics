import { Request, RequestHandler, Response } from 'express';
import { Context, Middleware } from 'koa';
import { z } from 'zod';

export default function middleware(options?: ApiMetricsOpts): RequestHandler;
export function koaMiddleware(options?: ApiMetricsOpts): Middleware;
export function expressMiddleware(options?: ApiMetricsOpts): RequestHandler;
export class HttpMetricsCollectorClass {
  constructor(options?: CollectorOpts);
  static init(options?: CollectorOpts): void;
  static collect(res: Response | any): void;
}

export function HttpMetricsCollector(
  metricsPrefix: string,
  extraLabels?: z.AnyZodObject,
): HttpMetricsCollectorClass;

export interface ApiMetricsOpts {
  metricsPath?: string;
  defaultMetricsInterval?: number;
  durationBuckets?: number[];
  requestSizeBuckets?: number[];
  responseSizeBuckets?: number[];
  useUniqueHistogramName?: boolean;
  metricsPrefix?: string;
  excludeRoutes?: string[];
  includeQueryParams?: boolean;
  additionalLabels?: string[];
  extractAdditionalLabelValuesFn?:
    | ((req: Request, res: Response) => Record<string, unknown>)
    | ((ctx: Context) => Record<string, unknown>);
}

export interface CollectorOpts {
  durationBuckets?: number[];
  countClientErrors?: boolean;
  useUniqueHistogramName?: boolean;
  prefix?: string;
}
