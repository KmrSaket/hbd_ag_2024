import './App.css';
import { useState } from 'react';
import Sketch from "react-p5";
import Matrix from './Matrix.js';
import Terminal from './Terminal.js';
import cryptoJs from 'crypto-js';


let matrix = new Matrix();
let msg = 'U2FsdGVkX1+u5fVtd0pY42PCo7vrTqAiuEIaFvPCcNPp6QnwxTnaVcc7BL44fPGFJCU2zB3kM0HmFqOLIKLW9ofFd7RL6VwLkR9Lmh/M8uQrQCPTcp5XBm5MdGlgqCYk4NB3Y/j/UZTxsfy7wjkdM+CzxRx47I50HURw6PAzJxo75vQ/H8hJ4auZhgnimi46Nr3zEPCBIDIeWVTo9cTDk8h3uhhX10Cxre4gOHyHJ5gpSyjBBjyMFGSyI16AiYBub/PHm9RocIFT21eYTzU+MxvKAsEyjNG2ATQCXxdKyPXHVXfEB72V13tu8ItZPvQxHc+h1dToKdGDOVk+8g/Xd7Yh8mRfJHvS4aJcEGxECgoRX+xd5TN1AE0pcG9YJ/UtsUHIvA/Y+hCM2MaIWBu+WRwE3uUfUp/ZoZ2FLO1wmYoS3faItJ7id5KbYwAQHOhoULACU/KPMeODWNV1h6j8zVH3KJ1wZvEG0SsFgIFCbK9ReVRVyap9lRlGxff8a6aKkBmdszB+0r02Fo19duo8tjQcK9Z5/5vN4KnFVfhZ8wOuv3maY25HoXzJ9vB0+I8esJwDDVzHLP36EblneIWL7HDKvCOXS2G3Q+W1qJJy8ygDoFA4mAvwflXX4ssb5tOs9UaBZwRed3xvAMoW3d37hhZJKmzmZtORgzHF+QconT4v29+tEeLDvRAaeaeaYLxUpqON/aR0AILgtF73mBJrHaSlck3UiUVAv2LzR1rGQOIdIOLKEjZmCmMPnGJfNbM10oz8VbMut+/nTQRkJF/nl+uZBC0dymLAnzzVeyi5gvzCqhTUgJgE+E+/5gyYwJWvRldp2tVtB0oYYtlAF7vmO56VbvrAWShMXRylPIybPH7iXhgsm6u6Hpk248Uz1rCLkWX35YPRtvN6x9mQCAAgTQXVC+NXn/2tdo65tIn2kFaNckPw4ljAvBFQOzg/UUFWMixOK26FMNZ8a4krcQCABk7ZKNKEB4vcdR8JAucfr+1kpeEpkF0BTvy6iSsI236bXbumDzciIyuDmlF7vDYe9WZBK7oQ3e4lZXB9qYs3tKqygeWNZabmXae2nlcelf37ygG3CnCeXsbH9sxSuUhtvMicXo3nmV3YDBd1e9uv8JwgMSekzJCjJSsxw6rK9s51UjPqf/JuqI8KaRPj3OGnmVQJUon191s/7CQhwPdFsvPjlxce6O1UMVdXWazsZKNoZjZqp7YR1txxZvElZiQhY6bBnH3ff0MonaOjjZzWRhoeprY6lxEV448x+FgkN+o6x1j+FIw/H4QF/Zk4gW8KBgMiNLgOQWozh1Wb0McIuSl4LoG+FmUYEHWzD4VJ1oSqWpUEMuUNLYUoPlA7Rla9CQsaRr0Axk+0xHtZ8MjVCptHEENzQpdF7mvhgir6mnsTTg1Znn1LpIykKXTAZYTmlKtcrgXBFVwY3dFqO06faiyPoKcBvnWh4VQuyv5Xmd20PYVG5FeUY1eP9SxkovYV5kHoeZIRW4pw0VURRI7/aFeH0Q8ahbfJxn/XOns2DItg9IB3Zxf3xsYo3dSK30YVgeZHni0H0asv93nQNEemG3w=';
let emsg = 'U2FsdGVkX1+u5fVtd0pY42PCo7vrTqAiuEIaFvPCcNPp6QnwxTnaVcc7BL44fPGFJCU2zB3kM0HmFqOLIKLW9ofFd7RL6VwLkR9Lmh/M8uQrQCPTcp5XBm5MdGlgqCYk4NB3Y/j/UZTxsfy7wjkdM+CzxRx47I50HURw6PAzJxo75vQ/H8hJ4auZhgnimi46Nr3zEPCBIDIeWVTo9cTDk8h3uhhX10Cxre4gOHyHJ5gpSyjBBjyMFGSyI16AiYBub/PHm9RocIFT21eYTzU+MxvKAsEyjNG2ATQCXxdKyPXHVXfEB72V13tu8ItZPvQxHc+h1dToKdGDOVk+8g/Xd7Yh8mRfJHvS4aJcEGxECgoRX+xd5TN1AE0pcG9YJ/UtsUHIvA/Y+hCM2MaIWBu+WRwE3uUfUp/ZoZ2FLO1wmYoS3faItJ7id5KbYwAQHOhoULACU/KPMeODWNV1h6j8zVH3KJ1wZvEG0SsFgIFCbK9ReVRVyap9lRlGxff8a6aKkBmdszB+0r02Fo19duo8tjQcK9Z5/5vN4KnFVfhZ8wOuv3maY25HoXzJ9vB0+I8esJwDDVzHLP36EblneIWL7HDKvCOXS2G3Q+W1qJJy8ygDoFA4mAvwflXX4ssb5tOs9UaBZwRed3xvAMoW3d37hhZJKmzmZtORgzHF+QconT4v29+tEeLDvRAaeaeaYLxUpqON/aR0AILgtF73mBJrHaSlck3UiUVAv2LzR1rGQOIdIOLKEjZmCmMPnGJfNbM10oz8VbMut+/nTQRkJF/nl+uZBC0dymLAnzzVeyi5gvzCqhTUgJgE+E+/5gyYwJWvRldp2tVtB0oYYtlAF7vmO56VbvrAWShMXRylPIybPH7iXhgsm6u6Hpk248Uz1rCLkWX35YPRtvN6x9mQCAAgTQXVC+NXn/2tdo65tIn2kFaNckPw4ljAvBFQOzg/UUFWMixOK26FMNZ8a4krcQCABk7ZKNKEB4vcdR8JAucfr+1kpeEpkF0BTvy6iSsI236bXbumDzciIyuDmlF7vDYe9WZBK7oQ3e4lZXB9qYs3tKqygeWNZabmXae2nlcelf37ygG3CnCeXsbH9sxSuUhtvMicXo3nmV3YDBd1e9uv8JwgMSekzJCjJSsxw6rK9s51UjPqf/JuqI8KaRPj3OGnmVQJUon191s/7CQhwPdFsvPjlxce6O1UMVdXWazsZKNoZjZqp7YR1txxZvElZiQhY6bBnH3ff0MonaOjjZzWRhoeprY6lxEV448x+FgkN+o6x1j+FIw/H4QF/Zk4gW8KBgMiNLgOQWozh1Wb0McIuSl4LoG+FmUYEHWzD4VJ1oSqWpUEMuUNLYUoPlA7Rla9CQsaRr0Axk+0xHtZ8MjVCptHEENzQpdF7mvhgir6mnsTTg1Znn1LpIykKXTAZYTmlKtcrgXBFVwY3dFqO06faiyPoKcBvnWh4VQuyv5Xmd20PYVG5FeUY1eP9SxkovYV5kHoeZIRW4pw0VURRI7/aFeH0Q8ahbfJxn/XOns2DItg9IB3Zxf3xsYo3dSK30YVgeZHni0H0asv93nQNEemG3w=';
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
