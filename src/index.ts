/*
 ** "-"" NotBright ,"_" Background
 */
/*let TTNI = {};
const myWorker
if (Worker) myWorker = new Worker("worker.js");
else const {
  Worker
} = require('worker_threads')

if (window.Worker) {


  this.myWorker = myWorker;

};
*/
//type MA<T, TMultiArray extends T[][]>=<T, TMultiArray extends T[][]>;

import type { TItems, TLevels, TColors, TLogs, TObj } from './ttni';
export class TTNI {

  private colorWarning: TLevels = {
    error: "R Y",
    1: "B Y",
    2: "G R",
    watch: "Y G",
    4: "M W",
    5: "C Y",
    6: "W R",


  }
  private colorLevel: TLevels = {
    1: "B Y",
    //2:"G R",
    2: this.colorWarning.watch,
    3: this.colorWarning.error,
    4: "M W",
    5: "C Y",
    6: "W R",
    7: "R G",


  }
  alias: string;

  bCaller: boolean = false;
  bColorIgnore: boolean = false;
  bLogsIgnore: boolean = true;
  bShowTimer: boolean;
  bShowError: boolean;
  bTest: boolean = false;
  bTrace: boolean;
  bHtml: boolean = true;
  bConsole: boolean = true;


  colorPlugin: string = '*colorPlugin*'
  colorReset: string = "";
  codColor: string = 'undefined';
  colorError: string;
  comma = ";";
  close: string;

  dsp2: TObj = {};

  fileName: string = '*FILENAME*';
  fn: string;

  getError: TItems;

  logs: TLogs | undefined;

  maxColorsLevel: number = 7;

  nsp: number = 0;

  plugin: object;
  ps: string;

  sError: string;
  s: string = "";

  private te: Date;
  ts: Date;

  fillColors(v: TColors) {
    for (let key in v) {
      let s = key[0].toUpperCase();
      v[s] = v[key];
      v[key.toUpperCase()] = v[key];
    }
    //console.log(v);

  }
  fillAttrs(v: TColors) {
    for (let key in v) {
      let s0 = key[0].toUpperCase();
      let s1 = key[1].toUpperCase();
      v[s0 + s1] = v[key];
      v[key.toUpperCase()] = v[key];
    }
    //console.log(v);

  }
  constructor() {
    this.close = this.ESC + this.reset + this.m;
    this.fillColors(this.fg);
    this.fillColors(this.bg);
    this.fillAttrs(this.atr);
  }


  // minus 60 no bright color for fg and bg
  fg: TColors = {

    Red: 91,
    Green: 92,
    Yellow: 93,
    Blue: 94,
    Magenta: 95,
    Cyan: 96,
    White: 97,
  };
  bg: TColors = {

    Red: 101,
    Green: 102,
    Yellow: 103,
    Blue: 104,
    Magenta: 105,
    Cyan: 106,
    White: 107
  };
  atr: TColors = {
    bold: 1,
    underline: 4,
    blinked: 5,
    inverse: 7,
    hidden: 8
  }

  ESC: string = '\u001b[';
  m: string = 'm';
  reset: number = 0;

  ifBright(b: boolean, color: number): number {
    if (b) color -= 60;
    return color;
  }
  log(...args: any[]) {
    console.log(...args);
  };
  log_raw(...args: any[]) {
    console.log(args);
  };
  msg(fn: string, arr: string[], colors: string | undefined): string {
    let bgNotBright: boolean;
    let fgNotBright: boolean;
    let sbg: string | number;
    let fg: string;
    let bg: string | undefined;
    let s: string = "";
    let token_arr: string[];
    let colors_arr: string[];
    let attrs_arr: string[];
    let pair_arr: string[];
    let pairBright_arr: string[];
    if (colors != undefined) {
      colors_arr = colors.split(" ");
      //console.log(colors_arr)
    }

    if (fn != undefined) s = this.ESC + this.fg.R + this.m + fn;
    if (arr)
      arr.forEach((item, index, arr) => {
        let k: string = colors_arr[index];
        if (k != undefined) {
          token_arr = k.split('/');
          if (token_arr.length > 1) attrs_arr = token_arr[1].split(";");
          else attrs_arr = [];
          pair_arr = token_arr[0].split("_");
          fg = pair_arr[pair_arr.length - 1].toUpperCase();
          (pair_arr.length > 1) ? bg = pair_arr[0]: bg = undefined;
          //console.log(pair_arr);
          if (bg != undefined) {
            bg = bg.toUpperCase();
            pairBright_arr = bg.split("-");
            bg = pairBright_arr[pairBright_arr.length - 1]
            bgNotBright = (pairBright_arr.length > 1);

            //console.log('pairBright_arr=', bg, bgNotBright);
          }
          pairBright_arr = fg.split("-");
          fg = pairBright_arr[pairBright_arr.length - 1]
          fgNotBright = (pairBright_arr.length > 1);

          //console.log('pairBright_arr=', fg, fgNotBright);
          (bg == undefined) ? sbg = "": sbg = ";" + this.ifBright(bgNotBright, this.bg[bg]);
          s += this.ESC + this.ifBright(fgNotBright, this.fg[fg]) + sbg;
          attrs_arr.forEach((atr, index, arr) => {
            //console.log(`'${atr}'`,this.atr[atr])
            s += this.comma + this.atr[atr];

          })
          s += this.m;
          s += item;
          s += this.close;

        }
      });

    return s;
  }


  removeVowels(input: string) {
    let a0 = input[0]
    let ai = input.substr(1, input.length - 1);
    ai = ai.replace(/[aeiou]/gi, "");
    ai = a0 + ai;
    return ai;
  }

  getFunctionName(e: Error, ...args: any[]): TItems {
    //console.log('args',args);

    let items: TItems;
    let stackTrace = e.stack as string;

    let regexp = /at (.*?)\(/g
    //console.log('stackTrace=',stackTrace);
    let result;
    let fn_arr: string[] = [];
    while ((result = regexp.exec(stackTrace)) !== null) {
      //console.log('===', result[1])
      fn_arr.push(result[1]);
    }


    ; // [object RegExp String Iterator], не массив, а перебираемый объект


    fn_arr = fn_arr.reverse();
    //console.log('reverse', fn_arr)
    fn_arr.pop()
    items = {
      fn: fn_arr.pop() as string,
      caller: fn_arr.pop() as string,
    }

    //console.log('===', items)
    return items

  }

  dsp(): string {
    let sp: string;
    if (this.bHtml) sp = '&nbsp';
    else sp = ' ';
    sp = sp.repeat(2 * this.nsp);
    //console.log('nsp=', nsp, 'sp.length=', sp);
    return sp;
  }

  nu(a: number, getError: TItems, p: any) {

    const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;
    let level: number;
    let fn: string = "";
    let sfn: string = "";
    let arr_fn: string[];
    if (getError != undefined) {

      arr_fn = (getError.fn.trim().split('.'));
      fn = arr_fn[arr_fn.length - 1];
      if (this.bCaller) sfn = (getError.caller).trim() + "::";
      else sfn = "";
      sfn += arr_fn.join('.');
    }
    let s: string = "(";
    let ak: string = "";
    let a6: string = "->";
    let a4: string = "<-";
    let dx: string;
    let e_fileName: object;
    let sError: string;
    let s_fileName: string;
    if (this.maxColorsLevel > 7) this.maxColorsLevel = 7;
    else if (this.maxColorsLevel < 1) this.maxColorsLevel = 1;
    if (this.fileName != undefined) {
      //console.log('this.fileName=', this.fileName)
      let name: string[] = this.fileName.split('_');
      if (name.length > 1) this.fileName = this.removeVowels(name[0]) + '_' + name[1];

      e_fileName = this.dsp2[this.fileName];

      //      console.log('e_fileName=', e_fileName)
      if (e_fileName == undefined) {
        this.dsp2[this.fileName] = {}
        e_fileName = this.dsp2[this.fileName];

        if (e_fileName == undefined) {
          s_fileName = "";
        }
      }
    }
    if (a > 0) ak = a6;
    else if (a < 0) ak = a4;
    //console.log('ak=',ak,'this.fn=',this.fn);

    if (this.bShowTimer) this.te = new Date();
    //console.log('p=',p)
    if (p == undefined) {
      p = [];
      p[0] = ""
    };
    for (let i = 0; i < p.length; i++) {
      s += p[i]
      if (i < p.length - 1) s += ',';
    }
    s += ')'
    //if (s != "#") {
    if (a > 0) this.nsp++;

    sError = this.dsp() + ak + sfn;
    //console.log('fn=',`'${fn}'`);
    level = (this.nsp % this.maxColorsLevel) + 1;
    //console.log('level=',`${level}`,this.colorLevel[level]);
    if (this.bTrace && (this.logs == undefined || (isEmpty(this.logs) || this.logs.ALL || this.logs[fn] && !this.logs.ALL))) this.log(this.msg("", [sError, s], this.colorLevel[level]), );
    //myWorker.postMessage(sError + s);


    if (!this.bLogsIgnore) {
      if (this.logs != undefined) {
        //if (this.bTrace)  console.log('_logs.fileName=', _logs.fileName);
        if (this.logs[this.fn] != undefined) {
          //console.log('>>>>>>>>this.logs[' + this.fn + ']=', this.logs[this.fn].TTNI);
          if (this.logs[this.fn]) {

            if (this.bTrace) console.log(this.colorPlugin + this.fileName + " ::1:TTNI[" + this.fn + "]:: " + sError + s + this.colorReset);
          }
        } else {
          if (this.bTrace) console.log(this.colorPlugin + this.fileName + "  TTNI:: " + sError + s + this.colorReset);
        }
      }
    } else {
      if (!this.bLogsIgnore) {
        //console.log('_plugin.fileName=', "'" + _plugin.fileName + "'");
        if (this.fileName == undefined) {
          this.fileName = "";
        }
        if (this.bTrace) console.log(this.colorPlugin, this.fileName, " ::3:TTNI:: this.bLogsIgnore[" + this.bLogsIgnore + "] " + sError + s + this.colorReset);
      } else {}
    }
    if (a < 0) {
      this.nsp--;
      if (this.nsp < 0) this.nsp = 0;

    }


  }
  ni(args: any) {
    if (this.bShowTimer) this.ts = new Date();
    if (args) {
      if (this)
        if (args[0] == this.fn) {
          //console.log(this.sh.R('test TTNI:: this.fn='), this.fn, 'this.bTrace=', this.bTrace)
        }
    }
    this.getError = this.getFunctionName(new Error());

    //if (this.fileName == 'props_trv') console.log('dsp2=', dsp2.props_trv.main);

    this.nu(1, this.getError, args);
  };

  ne(args: any) {

    this.getError = this.getFunctionName(new Error())
    this.nu(-1, this.getError, args);
    if (this.bShowTimer) this.te = new Date();
  };


  shSuffix() {
    //this.getError = this.getFunctionName(new Error())
    console.log('getError', this.getError);
  }
  shTimer ()  {
      if (this.bShowTimer) {
        console.log(":" + (this.te.getTime() - this.ts.getTime()) + " ms");
      }
  }
}