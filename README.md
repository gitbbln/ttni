# ttni 1.0.5

get function name  from stacktrace

## NPM

```sh
npm install ttni
```
### JavaScript for node

```js 
import { TTNI } from 'ttni'
```
### JavaScript for web (with  "live-server") 

```js 
import { TTNI } from './node_modules/ttni/dist/index.js'
```

```js  
import { TTNI } from 'ttni'
let ttni = new TTNI();
let ni = ttni.ni.bind(ttni);
let ne = ttni.ne.bind(ttni);


ttni.logs = { test0: true, test1: !true }
Object.assign(ttni, { bHtml: false, bShowTimer: true, bCaller: false, bTrace: true, logs: undefined, maxColorsLevel: 4 })

class Test2Class {
  test3() {
    ni()
    new Test1Class().test2();
    ne()
  }
  test4() {
    ni()
    this.test3();
    ne()
  }
  test5() {
    ni()
    this.test4();
    ne()
  }
}
class Test1Class {
  test1() {
    ni()
    ne()
  }
  test2() {
    ni()
    this.test1();
    ne()
  }

  //ttni.bLogsIgnore = !false;
}

function test3() {
  ni()
  new Test1Class().test2();
  ne()
}

function test4() {
  ni()
  test3();
  ne()
}

function test5() {
  ni()
  test4();
  ne()
}
const test1 = () => {
  ni()
  ne()
}
const test2 = () => {
  ni()
  test1();
  ne()
}

const p1 = new Test1Class();
//const p = new Test2Class();

function testExit(...nu) {
  ni(nu)
  ttni.shAt();

  //process.exit()

  ne()

}
testExit(['exit no', true]);
ttni.shTimer();
ttni.shStack();
```
# console.log:
```js
  ->testExit(exit no,true)
items at: {
  fn: 'testExit ',
  caller: 'ModuleJob.run ',
  file: 'file:///J:/group-ttni/sample-ttni/index.js'
}
  <-testExit()
:76 ms
stack= Error
    at TTNI.ne (J:\group-ttni\sample-ttni\node_modules\ttni\dist\index.js:295:46)
    at testExit (file:///J:/group-ttni/sample-ttni/index.js:77:3)
    at file:///J:/group-ttni/sample-ttni/index.js:80:1
    at ModuleJob.run (node:internal/modules/esm/module_job:185:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:281:24)
    at async loadESM (node:internal/process/esm_loader:88:5)
    at async handleMainPromise (node:internal/modules/run_main:65:12)

  ```
