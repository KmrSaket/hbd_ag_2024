import './App.css';
import { useState } from 'react';
import Sketch from "react-p5";
import Matrix from './Matrix.js';
import Terminal from './Terminal.js';
import cryptoJs from 'crypto-js';
import DatePicker from 'react-datepicker';


let matrix = new Matrix();
let msg = 'U2FsdGVkX18T9RUiHmNgsYhZ8yD0VRrcLkRG2kB9fNp9Fft2Hjy4Qg2Hpe3QBbloPc/jc2Za0OQAcZhXxXfJmfEToaAFLckte1XS7eodsQPdVOfNMJOtABBMjdkC68JvNFp42hretistZwkrh8dcKh4kCrbZ83b74svZnnu9sUsojUQZJcoUqVCuP1HIbt/icKoNZlxrtj08u8iIXgxhZWqYwnd+3Yy4VHSxe3OjsEjZAZYU4ksIfKGhpG99b2oWBK2IwCDM2F6uzpL4U9zIrckQg3cqjVjnwKXuRPhaniKyBouBwyr2TbmcmRceXzSK6r3JT9/Axavznq/maMIbDkKjs0eJz2ctmAklZx16a0oec/NmWXDDZS3NjFw09/TeJFPxiui6I8FViy+x3G8ntH2N9fRFeU/kB2ImfsRmKL48MeaW8ghHECoh2MyjBooIo4vIcoq/6brzdbabu5sMFlqn/DlA8zGWEqoWxHS91uttWLxmjKnJGld1NIGcg6bs2wvZ32Und1nXKaxZnHGXBQMtxJSIVgMan0+0OIK3Pc+HY/WslRSWax1bhK1fY/n/XZZJf39KRO2Tb8gvCkXSij+cuPdKRTQBjB93THUkaCM/V/nwJH4NARNoG1uIHs77L1/FbOCIE4OqLM80QVl+L4nMbTWkgJGM0mYkJfm5Ejel/EHmXhlfo54xfRjpbWr6+JusguZ4TLZWnA2UXH9iKLctQqjfMtUHLTLOd/C5aiy2CzVFkNIpw90ws/5njDBukOhmQKcQ7hPhZ9rPlRtxm4lCxbxEnE011f3NnZrDczZnAc4e0Ao++1WtIoKmf/Ukyg/cfw06zT520g+pbtVn8iGrrjXFwhZA9rua7oUl2bhm4cNmkJReYlRRenFSJ4ptIBkK8G9zfLLY1PC986mUIGfZ2tslkx6JFrBLg5IWpq6EmaUQvqaWvp2DBtN50RAVpnyoU+1dRYjI/taRpV915QzqOYBxGcPm/ZGhkp/tvZNoMtdGu4jA3puh0B4ices4zr8275iTRvGbJmQuj66IiXHcg5QJDf9bfNcfYjTo+WL2W3uDR634XZc+uNGraWcd2b9WcixPC6/CIkicJisBEVlBnxfdEBvClfTyrxSE2oQOReoMdI147i/BICEEM97xbKUcv4EXy8OXZw1OZ8uZkayyAF5j4qluKERSrlnLQ1/Jn4Lt0BoMbtLAW3Jl7KGUtccH9hCsm4cVtsXxVHVuowyC+6mPlkXwcVN0L5X9ESZu5yCp7LtHY+oAQcb4NzcwRA9TDCUg+qB0ZTZl6EtQv1KuOEITkz99PntMn2rrJ6NndAJAKXYk1b4nfVKvna37';
let emsg = 'U2FsdGVkX18T9RUiHmNgsYhZ8yD0VRrcLkRG2kB9fNp9Fft2Hjy4Qg2Hpe3QBbloPc/jc2Za0OQAcZhXxXfJmfEToaAFLckte1XS7eodsQPdVOfNMJOtABBMjdkC68JvNFp42hretistZwkrh8dcKh4kCrbZ83b74svZnnu9sUsojUQZJcoUqVCuP1HIbt/icKoNZlxrtj08u8iIXgxhZWqYwnd+3Yy4VHSxe3OjsEjZAZYU4ksIfKGhpG99b2oWBK2IwCDM2F6uzpL4U9zIrckQg3cqjVjnwKXuRPhaniKyBouBwyr2TbmcmRceXzSK6r3JT9/Axavznq/maMIbDkKjs0eJz2ctmAklZx16a0oec/NmWXDDZS3NjFw09/TeJFPxiui6I8FViy+x3G8ntH2N9fRFeU/kB2ImfsRmKL48MeaW8ghHECoh2MyjBooIo4vIcoq/6brzdbabu5sMFlqn/DlA8zGWEqoWxHS91uttWLxmjKnJGld1NIGcg6bs2wvZ32Und1nXKaxZnHGXBQMtxJSIVgMan0+0OIK3Pc+HY/WslRSWax1bhK1fY/n/XZZJf39KRO2Tb8gvCkXSij+cuPdKRTQBjB93THUkaCM/V/nwJH4NARNoG1uIHs77L1/FbOCIE4OqLM80QVl+L4nMbTWkgJGM0mYkJfm5Ejel/EHmXhlfo54xfRjpbWr6+JusguZ4TLZWnA2UXH9iKLctQqjfMtUHLTLOd/C5aiy2CzVFkNIpw90ws/5njDBukOhmQKcQ7hPhZ9rPlRtxm4lCxbxEnE011f3NnZrDczZnAc4e0Ao++1WtIoKmf/Ukyg/cfw06zT520g+pbtVn8iGrrjXFwhZA9rua7oUl2bhm4cNmkJReYlRRenFSJ4ptIBkK8G9zfLLY1PC986mUIGfZ2tslkx6JFrBLg5IWpq6EmaUQvqaWvp2DBtN50RAVpnyoU+1dRYjI/taRpV915QzqOYBxGcPm/ZGhkp/tvZNoMtdGu4jA3puh0B4ices4zr8275iTRvGbJmQuj66IiXHcg5QJDf9bfNcfYjTo+WL2W3uDR634XZc+uNGraWcd2b9WcixPC6/CIkicJisBEVlBnxfdEBvClfTyrxSE2oQOReoMdI147i/BICEEM97xbKUcv4EXy8OXZw1OZ8uZkayyAF5j4qluKERSrlnLQ1/Jn4Lt0BoMbtLAW3Jl7KGUtccH9hCsm4cVtsXxVHVuowyC+6mPlkXwcVN0L5X9ESZu5yCp7LtHY+oAQcb4NzcwRA9TDCUg+qB0ZTZl6EtQv1KuOEITkz99PntMn2rrJ6NndAJAKXYk1b4nfVKvna37';
let terminal = new Terminal();


function App() {
  let [msgDisplay, setMsgDisplay] = useState(false);
  let [dob, setDob] = useState("");
  let setup = (p5, parent) => {
    matrix.setup(p5, parent);
  }
  let draw = p5 => {
    matrix.draw()
  }

  let setupDec = (p5, parent) => {
    terminal.setup(p5, parent, emsg);
  }
  let drawDec = p5 => {
    if (msgDisplay) {
      terminal.draw(msg)
    }
  }

  let encrypt = () => {
    let ec = cryptoJs.AES.encrypt(msg, dob);
    console.log(ec.toString());
  }

  let decrypt = () => {
    setMsgDisplay(true);
    msg = cryptoJs.AES.decrypt(emsg, dob).toString(cryptoJs.enc.Utf8);
  }

  return (
    <div className="App">
      <header className="App-header" style={{ overflow: 'hidden' }}>
        <Sketch setup={setup} draw={draw} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />
        <div style={{ zIndex: 3, visibility: msgDisplay ? 'hidden' : '' }}>
          <p >
            Input your dob in ddmmyyyy format
          </p>
          <p>
            without spaces or special charcters to see the encrypted message!
          </p>
          <input onChange={(e) => setDob(e.target.value)} style={{ zIndex: 3, visibility: msgDisplay ? 'hidden' : '' }} placeholder='ddmmyyyy' />
          <br />
          <button onClick={decrypt} >GO</button>
        </div>
        <div style={{ zIndex: 2, opacity: !msgDisplay ? '0.1' : '1' }}>
          <Sketch setup={setupDec} draw={drawDec} style={{ position: 'absolute', top: "25%", left: 0 }} />
        </div>
      </header>
    </div >
  );
}

export default App;
