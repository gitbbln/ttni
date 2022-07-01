import type { TItems, TColors, TLogs, TObj } from './ttni';
export declare class TTNI {
    private colorWarning;
    private colorLevel;
    alias: string;
    bCaller: boolean;
    bColorIgnore: boolean;
    bLogsIgnore: boolean;
    bShowTimer: boolean;
    bShowError: boolean;
    bTest: boolean;
    bTrace: boolean;
    bHtml: boolean;
    bConsole: boolean;
    colorPlugin: string;
    colorReset: string;
    codColor: string;
    colorError: string;
    comma: string;
    close: string;
    dsp2: TObj;
    fileName: string;
    fn: string;
    getError: TItems;
    logs: TLogs | undefined;
    maxColorsLevel: number;
    nsp: number;
    plugin: object;
    ps: string;
    sError: string;
    s: string;
    private te;
    ts: Date;
    fillColors(v: TColors): void;
    fillAttrs(v: TColors): void;
    constructor();
    fg: TColors;
    bg: TColors;
    atr: TColors;
    ESC: string;
    m: string;
    reset: number;
    ifBright(b: boolean, color: number): number;
    log(...args: any[]): void;
    log_raw(...args: any[]): void;
    msg(fn: string, arr: string[], colors: string | undefined): string;
    removeVowels(input: string): string;
    getFunctionName(e: Error, ...args: any[]): TItems;
    dsp(): string;
    nu(a: number, getError: TItems, p: any): void;
    ni(args: any): void;
    ne(args: any): void;
    shSuffix(): void;
}
