# ttni
get function name  from stacktrace! 
<br>
sample fn: 'testExit '
``` javascript
import { TTNI } from './ttni'
let ttni = new TTNI();
let ni = ttni.ni.bind(ttni);
let ne = ttni.ne.bind(ttni);


ttni.logs = { test0: true, test1: !true }
Object.assign(ttni, { bHtml: false, bCaller: false, bTrace: true, logs: undefined, maxColorsLevel: 4 })

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

function testExit(...nu: any) {
  ni(nu)
  ttni.shSuffix();

  //process.exit()

  ne()

}
testExit(['exit no', true]);
```
**console.log:**
</br>
```
->testExit(exit no,true);
getError { fn: 'testExit ', caller:<Object.anonymous> }
<-testExit()
```
               

