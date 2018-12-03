import { RECEIVE_QUESTIONS } from "../actions/questions";

/**
 * Questions Reducer
 * @param state
 * @param action
 * @return {{length: number, toString(): string, toLocaleString(): string, pop(): (string | undefined), push(...items: string[]): number, concat: {(...items: ConcatArray<string>): string[]; (...items: ConcatArray<string> | string[]): string[]}, join(separator?: string): string, reverse(): string[], shift(): (string | undefined), slice(start?: number, end?: number): string[], sort(compareFn?: (a: string, b: string) => number): this, splice: {(start: number, deleteCount?: number): string[]; (start: number, deleteCount: number, ...items: string[]): string[]}, unshift(...items: string[]): number, indexOf(searchElement: string, fromIndex?: number): number, lastIndexOf(searchElement: string, fromIndex?: number): number, every(callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg?: any): boolean, some(callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg?: any): boolean, forEach(callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any): void, map<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any): U[], filter: {<S extends string>(callbackfn: (value: string, index: number, array: string[]) => value is S, thisArg?: any): S[]; (callbackfn: (value: string, index: number, array: string[]) => any, thisArg?: any): string[]}, reduce: {(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string; (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string; <U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: string[]) => U, initialValue: U): U}, reduceRight: {(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string; (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string; <U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: string[]) => U, initialValue: U): U}, [p: number]: string, flatMap<U, This=undefined>(callback: (this:This, value: string, index: number, array: string[]) => (U[] | U), thisArg?: This): U[], flat: {<U>(this:U[][][][][][][][], depth: number): U[]; <U>(this:U[][][][][][][], depth: number): U[]; <U>(this:U[][][][][][], depth: number): U[]; <U>(this:U[][][][][], depth: number): U[]; <U>(this:U[][][][], depth: number): U[]; <U>(this:U[][][], depth: number): U[]; <U>(this:U[][], depth?: number): U[]; <U>(this:U[], depth: number): U[]; <U>(depth?: number): any[]}, [Symbol.iterator](): IterableIterator<string>, entries(): IterableIterator<[number , string]>, keys(): IterableIterator<number>, values(): IterableIterator<string>, find: {<S extends string>(predicate: (this:void, value: string, index: number, obj: string[]) => value is S, thisArg?: any): (S | undefined); (predicate: (value: string, index: number, obj: string[]) => boolean, thisArg?: any): (string | undefined)}, findIndex(predicate: (value: string, index: number, obj: string[]) => boolean, thisArg?: any): number, fill(value: string, start?: number, end?: number): this, copyWithin(target: number, start: number, end?: number): this, includes(searchElement: string, fromIndex?: number): boolean, [Symbol.unscopables](): {copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean}}}
 */
const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        //spread the current state
        ...state,
        //merge the actions questions with the current state
        ...action.questions
      };
    default:
      return state;
  }
};

export default questions;
