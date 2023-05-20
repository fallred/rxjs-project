import { bindCallback } from 'rxjs';

function readFile(path, callback) {
  // 模拟读取文件
  setTimeout(() => {
    callback(null, `Content of ${path}`);
  }, 1000);
}

const readFile$ = bindCallback(readFile);

readFile$('file.txt').subscribe(result => {
  console.log(result);
});