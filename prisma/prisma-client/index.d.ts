
/**
 * Client
**/

import * as runtime from './runtime';

export import DMMF = runtime.DMMF

/**
 * Prisma Errors
 */
export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
export import PrismaClientValidationError = runtime.PrismaClientValidationError

/**
 * Re-export of sql-template-tag
 */
export import sql = runtime.sqltag
export import empty = runtime.empty
export import join = runtime.join
export import raw = runtime.raw
export import Sql = runtime.Sql

/**
 * Decimal.js
 */
export import Decimal = runtime.Decimal

/**
 * Prisma Client JS version: 2.13.1
 * Query Engine version: fcbc4bb2d306c86c28014f596b1e8c7980af8bd4
 */
export type PrismaVersion = {
  client: string
}

export const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export type InputJsonObject = {[Key in string]?: JsonValue}
 
export interface InputJsonArray extends Array<JsonValue> {}
 
export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
 type SelectAndInclude = {
  select: any
  include: any
}
type HasSelect = {
  select: any
}
type HasInclude = {
  include: any
}
type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;



/**
 * Used by group by
 */
export type GetScalarType<T, O> = O extends object ? {
  [P in keyof T]: P extends keyof O
    ? O[P]
    : never
} : never

/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>

/**
 * Like `Pick`, but with an array
 */
type PickArray<T, K extends Array<keyof T>> = Pick<T, TupleToUnion<K>>





/**
 * Model prs
 */

export type prs = {
  id: string
  authorName: string
  authorEmail: string
  base_branch: string
  compare_branch: string
  status: number
  name: string
  description: string
  createdAt: Date | null
  mergedAt: Date | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Prs
 * const prs = await prisma.prs.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Prs
   * const prs = await prisma.prs.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']

      /**
   * `prisma.prs`: Exposes CRUD operations for the **prs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prs
    * const prs = await prisma.prs.findMany()
    * ```
    */
  get prs(): Prisma.prsDelegate;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 2.13.1
   * Query Engine version: fcbc4bb2d306c86c28014f596b1e8c7980af8bd4
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
   type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;



  /**
   * Used by group by
   */
  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Pick<T, TupleToUnion<K>>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    prs: 'prs'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }


  /**
   * Model prs
   */


  export type AggregatePrs = {
    count: number | null
    avg: PrsAvgAggregateOutputType | null
    sum: PrsSumAggregateOutputType | null
    min: PrsMinAggregateOutputType | null
    max: PrsMaxAggregateOutputType | null
  }

  export type PrsAvgAggregateOutputType = {
    status: number
  }

  export type PrsSumAggregateOutputType = {
    status: number
  }

  export type PrsMinAggregateOutputType = {
    id: string | null
    authorName: string | null
    authorEmail: string | null
    base_branch: string | null
    compare_branch: string | null
    status: number
    name: string | null
    description: string | null
    createdAt: Date | null
    mergedAt: Date | null
  }

  export type PrsMaxAggregateOutputType = {
    id: string | null
    authorName: string | null
    authorEmail: string | null
    base_branch: string | null
    compare_branch: string | null
    status: number
    name: string | null
    description: string | null
    createdAt: Date | null
    mergedAt: Date | null
  }

  export type PrsCountAggregateOutputType = {
    id: number | null
    authorName: number | null
    authorEmail: number | null
    base_branch: number | null
    compare_branch: number | null
    status: number
    name: number | null
    description: number | null
    createdAt: number | null
    mergedAt: number | null
    _all: number
  }


  export type PrsAvgAggregateInputType = {
    status?: true
  }

  export type PrsSumAggregateInputType = {
    status?: true
  }

  export type PrsMinAggregateInputType = {
    id?: true
    authorName?: true
    authorEmail?: true
    base_branch?: true
    compare_branch?: true
    status?: true
    name?: true
    description?: true
    createdAt?: true
    mergedAt?: true
  }

  export type PrsMaxAggregateInputType = {
    id?: true
    authorName?: true
    authorEmail?: true
    base_branch?: true
    compare_branch?: true
    status?: true
    name?: true
    description?: true
    createdAt?: true
    mergedAt?: true
  }

  export type PrsCountAggregateInputType = {
    id?: true
    authorName?: true
    authorEmail?: true
    base_branch?: true
    compare_branch?: true
    status?: true
    name?: true
    description?: true
    createdAt?: true
    mergedAt?: true
    _all?: true
  }

  export type AggregatePrsArgs = {
    where?: prsWhereInput
    orderBy?: Enumerable<prsOrderByInput>
    cursor?: prsWhereUniqueInput
    take?: number
    skip?: number
    count?: true
    avg?: PrsAvgAggregateInputType
    sum?: PrsSumAggregateInputType
    min?: PrsMinAggregateInputType
    max?: PrsMaxAggregateInputType
  }

  export type GetPrsAggregateType<T extends AggregatePrsArgs> = {
    [P in keyof T]: P extends 'count' ? number : GetPrsAggregateScalarType<T[P]>
  }

  export type GetPrsAggregateScalarType<T extends any> = {
    [P in keyof T]: P extends keyof PrsAvgAggregateOutputType ? PrsAvgAggregateOutputType[P] : never
  }

    



  export type prsSelect = {
    id?: boolean
    authorName?: boolean
    authorEmail?: boolean
    base_branch?: boolean
    compare_branch?: boolean
    status?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    mergedAt?: boolean
  }

  export type prsGetPayload<
    S extends boolean | null | undefined | prsArgs,
    U = keyof S
      > = S extends true
        ? prs
    : S extends undefined
    ? never
    : S extends prsArgs | FindManyprsArgs
    ?'include' extends U
    ? prs 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof prs ?prs [P]
  : 
     never
  } 
    : prs
  : prs


  export interface prsDelegate {
    /**
     * Find zero or one Prs that matches the filter.
     * @param {FindUniqueprsArgs} args - Arguments to find a Prs
     * @example
     * // Get one Prs
     * const prs = await prisma.prs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FindUniqueprsArgs>(
      args: Subset<T, FindUniqueprsArgs>
    ): CheckSelect<T, Prisma__prsClient<prs | null>, Prisma__prsClient<prsGetPayload<T> | null>>
    /**
     * Find the first Prs that matches the filter.
     * @param {FindFirstprsArgs} args - Arguments to find a Prs
     * @example
     * // Get one Prs
     * const prs = await prisma.prs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FindFirstprsArgs>(
      args?: Subset<T, FindFirstprsArgs>
    ): CheckSelect<T, Prisma__prsClient<prs | null>, Prisma__prsClient<prsGetPayload<T> | null>>
    /**
     * Find zero or more Prs that matches the filter.
     * @param {FindManyprsArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prs
     * const prs = await prisma.prs.findMany()
     * 
     * // Get first 10 Prs
     * const prs = await prisma.prs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prsWithIdOnly = await prisma.prs.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FindManyprsArgs>(
      args?: Subset<T, FindManyprsArgs>
    ): CheckSelect<T, Promise<Array<prs>>, Promise<Array<prsGetPayload<T>>>>
    /**
     * Create a Prs.
     * @param {prsCreateArgs} args - Arguments to create a Prs.
     * @example
     * // Create one Prs
     * const Prs = await prisma.prs.create({
     *   data: {
     *     // ... data to create a Prs
     *   }
     * })
     * 
    **/
    create<T extends prsCreateArgs>(
      args: Subset<T, prsCreateArgs>
    ): CheckSelect<T, Prisma__prsClient<prs>, Prisma__prsClient<prsGetPayload<T>>>
    /**
     * Delete a Prs.
     * @param {prsDeleteArgs} args - Arguments to delete one Prs.
     * @example
     * // Delete one Prs
     * const Prs = await prisma.prs.delete({
     *   where: {
     *     // ... filter to delete one Prs
     *   }
     * })
     * 
    **/
    delete<T extends prsDeleteArgs>(
      args: Subset<T, prsDeleteArgs>
    ): CheckSelect<T, Prisma__prsClient<prs>, Prisma__prsClient<prsGetPayload<T>>>
    /**
     * Update one Prs.
     * @param {prsUpdateArgs} args - Arguments to update one Prs.
     * @example
     * // Update one Prs
     * const prs = await prisma.prs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends prsUpdateArgs>(
      args: Subset<T, prsUpdateArgs>
    ): CheckSelect<T, Prisma__prsClient<prs>, Prisma__prsClient<prsGetPayload<T>>>
    /**
     * Delete zero or more Prs.
     * @param {prsDeleteManyArgs} args - Arguments to filter Prs to delete.
     * @example
     * // Delete a few Prs
     * const { count } = await prisma.prs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends prsDeleteManyArgs>(
      args?: Subset<T, prsDeleteManyArgs>
    ): Promise<BatchPayload>
    /**
     * Update zero or more Prs.
     * @param {prsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prs
     * const prs = await prisma.prs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends prsUpdateManyArgs>(
      args: Subset<T, prsUpdateManyArgs>
    ): Promise<BatchPayload>
    /**
     * Create or update one Prs.
     * @param {prsUpsertArgs} args - Arguments to update or create a Prs.
     * @example
     * // Update or create a Prs
     * const prs = await prisma.prs.upsert({
     *   create: {
     *     // ... data to create a Prs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prs we want to update
     *   }
     * })
    **/
    upsert<T extends prsUpsertArgs>(
      args: Subset<T, prsUpsertArgs>
    ): CheckSelect<T, Prisma__prsClient<prs>, Prisma__prsClient<prsGetPayload<T>>>
    /**
     * Find zero or one Prs that matches the filter.
     * @param {FindUniqueprsArgs} args - Arguments to find a Prs
     * @deprecated This will be deprecated please use prisma.prs.findUnique
     * @example
     * // Get one Prs
     * const prs = await prisma.prs.findOne({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findOne<T extends FindUniqueprsArgs>(
      args: Subset<T, FindUniqueprsArgs>
    ): CheckSelect<T, Prisma__prsClient<prs | null>, Prisma__prsClient<prsGetPayload<T> | null>>
    /**
     * Count
     */
    count(args?: Omit<FindManyprsArgs, 'select' | 'include'>): Promise<number>

  

    /**
     * Aggregate
     */
    aggregate<T extends AggregatePrsArgs>(args: Subset<T, AggregatePrsArgs>): Promise<GetPrsAggregateType<T>>
  }

  /**
   * The delegate class that acts as a "Promise-like" for prs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__prsClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * prs findUnique
   */
  export type FindUniqueprsArgs = {
    /**
     * Select specific fields to fetch from the prs
    **/
    select?: prsSelect | null
    /**
     * Filter, which prs to fetch.
    **/
    where: prsWhereUniqueInput
  }


  /**
   * prs findFirst
   */
  export type FindFirstprsArgs = {
    /**
     * Select specific fields to fetch from the prs
    **/
    select?: prsSelect | null
    /**
     * Filter, which prs to fetch.
    **/
    where?: prsWhereInput
    orderBy?: Enumerable<prsOrderByInput>
    cursor?: prsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PrsScalarFieldEnum>
  }


  /**
   * prs findMany
   */
  export type FindManyprsArgs = {
    /**
     * Select specific fields to fetch from the prs
    **/
    select?: prsSelect | null
    /**
     * Filter, which prs to fetch.
    **/
    where?: prsWhereInput
    /**
     * Determine the order of the prs to fetch.
    **/
    orderBy?: Enumerable<prsOrderByInput>
    /**
     * Sets the position for listing prs.
    **/
    cursor?: prsWhereUniqueInput
    /**
     * The number of prs to fetch. If negative number, it will take prs before the `cursor`.
    **/
    take?: number
    /**
     * Skip the first `n` prs.
    **/
    skip?: number
    distinct?: Enumerable<PrsScalarFieldEnum>
  }


  /**
   * prs create
   */
  export type prsCreateArgs = {
    /**
     * Select specific fields to fetch from the prs
    **/
    select?: prsSelect | null
    /**
     * The data needed to create a prs.
    **/
    data: prsCreateInput
  }


  /**
   * prs update
   */
  export type prsUpdateArgs = {
    /**
     * Select specific fields to fetch from the prs
    **/
    select?: prsSelect | null
    /**
     * The data needed to update a prs.
    **/
    data: prsUpdateInput
    /**
     * Choose, which prs to update.
    **/
    where: prsWhereUniqueInput
  }


  /**
   * prs updateMany
   */
  export type prsUpdateManyArgs = {
    data: prsUpdateManyMutationInput
    where?: prsWhereInput
  }


  /**
   * prs upsert
   */
  export type prsUpsertArgs = {
    /**
     * Select specific fields to fetch from the prs
    **/
    select?: prsSelect | null
    /**
     * The filter to search for the prs to update in case it exists.
    **/
    where: prsWhereUniqueInput
    /**
     * In case the prs found by the `where` argument doesn't exist, create a new prs with this data.
    **/
    create: prsCreateInput
    /**
     * In case the prs was found with the provided `where` argument, update it with this data.
    **/
    update: prsUpdateInput
  }


  /**
   * prs delete
   */
  export type prsDeleteArgs = {
    /**
     * Select specific fields to fetch from the prs
    **/
    select?: prsSelect | null
    /**
     * Filter which prs to delete.
    **/
    where: prsWhereUniqueInput
  }


  /**
   * prs deleteMany
   */
  export type prsDeleteManyArgs = {
    where?: prsWhereInput
  }


  /**
   * prs without action
   */
  export type prsArgs = {
    /**
     * Select specific fields to fetch from the prs
    **/
    select?: prsSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const PrsScalarFieldEnum: {
    id: 'id',
    authorName: 'authorName',
    authorEmail: 'authorEmail',
    base_branch: 'base_branch',
    compare_branch: 'compare_branch',
    status: 'status',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    mergedAt: 'mergedAt'
  };

  export type PrsScalarFieldEnum = (typeof PrsScalarFieldEnum)[keyof typeof PrsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Deep Input Types
   */


  export type prsWhereInput = {
    AND?: Enumerable<prsWhereInput>
    OR?: Enumerable<prsWhereInput>
    NOT?: Enumerable<prsWhereInput>
    id?: StringFilter | string
    authorName?: StringFilter | string
    authorEmail?: StringFilter | string
    base_branch?: StringFilter | string
    compare_branch?: StringFilter | string
    status?: IntFilter | number
    name?: StringFilter | string
    description?: StringFilter | string
    createdAt?: DateTimeNullableFilter | Date | string | null
    mergedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type prsOrderByInput = {
    id?: SortOrder
    authorName?: SortOrder
    authorEmail?: SortOrder
    base_branch?: SortOrder
    compare_branch?: SortOrder
    status?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    mergedAt?: SortOrder
  }

  export type prsWhereUniqueInput = {
    id?: string
  }

  export type prsCreateInput = {
    id: string
    authorName: string
    authorEmail: string
    base_branch: string
    compare_branch: string
    status: number
    name: string
    description: string
    createdAt?: Date | string | null
    mergedAt?: Date | string | null
  }

  export type prsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorEmail?: StringFieldUpdateOperationsInput | string
    base_branch?: StringFieldUpdateOperationsInput | string
    compare_branch?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mergedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type prsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorEmail?: StringFieldUpdateOperationsInput | string
    base_branch?: StringFieldUpdateOperationsInput | string
    compare_branch?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mergedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}

/*
* Exports for compatibility introduced in 2.12.0
* Please import from the Prisma namespace instead
*/

/**
 * @deprecated Renamed to `Prisma.PrsScalarFieldEnum`
 */
export type PrsScalarFieldEnum = Prisma.PrsScalarFieldEnum

/**
 * @deprecated Renamed to `Prisma.SortOrder`
 */
export type SortOrder = Prisma.SortOrder

/**
 * @deprecated Renamed to `Prisma.ModelName`
 */
export type ModelName = Prisma.ModelName

/**
 * @deprecated Renamed to `Prisma.AggregatePrs`
 */
export type AggregatePrs = Prisma.AggregatePrs

/**
 * @deprecated Renamed to `Prisma.PrsAvgAggregateOutputType`
 */
export type PrsAvgAggregateOutputType = Prisma.PrsAvgAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.PrsSumAggregateOutputType`
 */
export type PrsSumAggregateOutputType = Prisma.PrsSumAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.PrsMinAggregateOutputType`
 */
export type PrsMinAggregateOutputType = Prisma.PrsMinAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.PrsMaxAggregateOutputType`
 */
export type PrsMaxAggregateOutputType = Prisma.PrsMaxAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.PrsCountAggregateOutputType`
 */
export type PrsCountAggregateOutputType = Prisma.PrsCountAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.AggregatePrsArgs`
 */
export type AggregatePrsArgs = Prisma.AggregatePrsArgs

/**
 * @deprecated Renamed to `Prisma.PrsAvgAggregateInputType`
 */
export type PrsAvgAggregateInputType = Prisma.PrsAvgAggregateInputType

/**
 * @deprecated Renamed to `Prisma.PrsSumAggregateInputType`
 */
export type PrsSumAggregateInputType = Prisma.PrsSumAggregateInputType

/**
 * @deprecated Renamed to `Prisma.PrsMinAggregateInputType`
 */
export type PrsMinAggregateInputType = Prisma.PrsMinAggregateInputType

/**
 * @deprecated Renamed to `Prisma.PrsMaxAggregateInputType`
 */
export type PrsMaxAggregateInputType = Prisma.PrsMaxAggregateInputType

/**
 * @deprecated Renamed to `Prisma.PrsCountAggregateInputType`
 */
export type PrsCountAggregateInputType = Prisma.PrsCountAggregateInputType

/**
 * @deprecated Renamed to `Prisma.prsSelect`
 */
export type prsSelect = Prisma.prsSelect

/**
 * @deprecated Renamed to `Prisma.FindUniqueprsArgs`
 */
export type FindUniqueprsArgs = Prisma.FindUniqueprsArgs

/**
 * @deprecated Renamed to `Prisma.FindFirstprsArgs`
 */
export type FindFirstprsArgs = Prisma.FindFirstprsArgs

/**
 * @deprecated Renamed to `Prisma.FindManyprsArgs`
 */
export type FindManyprsArgs = Prisma.FindManyprsArgs

/**
 * @deprecated Renamed to `Prisma.prsCreateArgs`
 */
export type prsCreateArgs = Prisma.prsCreateArgs

/**
 * @deprecated Renamed to `Prisma.prsUpdateArgs`
 */
export type prsUpdateArgs = Prisma.prsUpdateArgs

/**
 * @deprecated Renamed to `Prisma.prsUpdateManyArgs`
 */
export type prsUpdateManyArgs = Prisma.prsUpdateManyArgs

/**
 * @deprecated Renamed to `Prisma.prsUpsertArgs`
 */
export type prsUpsertArgs = Prisma.prsUpsertArgs

/**
 * @deprecated Renamed to `Prisma.prsDeleteArgs`
 */
export type prsDeleteArgs = Prisma.prsDeleteArgs

/**
 * @deprecated Renamed to `Prisma.prsDeleteManyArgs`
 */
export type prsDeleteManyArgs = Prisma.prsDeleteManyArgs

/**
 * @deprecated Renamed to `Prisma.prsWhereInput`
 */
export type prsWhereInput = Prisma.prsWhereInput

/**
 * @deprecated Renamed to `Prisma.prsOrderByInput`
 */
export type prsOrderByInput = Prisma.prsOrderByInput

/**
 * @deprecated Renamed to `Prisma.prsWhereUniqueInput`
 */
export type prsWhereUniqueInput = Prisma.prsWhereUniqueInput

/**
 * @deprecated Renamed to `Prisma.prsCreateInput`
 */
export type prsCreateInput = Prisma.prsCreateInput

/**
 * @deprecated Renamed to `Prisma.prsUpdateInput`
 */
export type prsUpdateInput = Prisma.prsUpdateInput

/**
 * @deprecated Renamed to `Prisma.prsUpdateManyMutationInput`
 */
export type prsUpdateManyMutationInput = Prisma.prsUpdateManyMutationInput

/**
 * @deprecated Renamed to `Prisma.StringFilter`
 */
export type StringFilter = Prisma.StringFilter

/**
 * @deprecated Renamed to `Prisma.IntFilter`
 */
export type IntFilter = Prisma.IntFilter

/**
 * @deprecated Renamed to `Prisma.DateTimeNullableFilter`
 */
export type DateTimeNullableFilter = Prisma.DateTimeNullableFilter

/**
 * @deprecated Renamed to `Prisma.StringFieldUpdateOperationsInput`
 */
export type StringFieldUpdateOperationsInput = Prisma.StringFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.IntFieldUpdateOperationsInput`
 */
export type IntFieldUpdateOperationsInput = Prisma.IntFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.NullableDateTimeFieldUpdateOperationsInput`
 */
export type NullableDateTimeFieldUpdateOperationsInput = Prisma.NullableDateTimeFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.NestedStringFilter`
 */
export type NestedStringFilter = Prisma.NestedStringFilter

/**
 * @deprecated Renamed to `Prisma.NestedIntFilter`
 */
export type NestedIntFilter = Prisma.NestedIntFilter

/**
 * @deprecated Renamed to `Prisma.NestedDateTimeNullableFilter`
 */
export type NestedDateTimeNullableFilter = Prisma.NestedDateTimeNullableFilter