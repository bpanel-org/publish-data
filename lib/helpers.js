import { Script, policy } from 'bcoin';
import bio from 'bufio';

export function scriptsFromString(input) {
  const dataLength = policy.MAX_OP_RETURN;
  const scriptCount = Math.ceil(input.length / dataLength);
  const strings = [];
  if (scriptCount < 1) strings.push(input);
  else {
    for (let i = 0; i < scriptCount; i++) {
      let string;
      if (i === 0) string = input.substr(0, dataLength);
      else string = input.substr(i * dataLength, dataLength);
      strings.push(string);
    }
  }
  const scripts = [];
  strings.forEach(string => {
    const bw = bio.write();
    const buffer = bw.writeString(string, 'ascii');
    const data = buffer.render();
    const script = Script.fromNulldata(data);
    scripts.push(script);
  });
  return scripts;
}
