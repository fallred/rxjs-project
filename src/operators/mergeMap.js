import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import axios from 'axios';

const source$ = from(['octocat', 'mojombo', 'defunkt']);
// 通常用于处理需要进行并发处理的异步操作，例如同时发送多个 HTTP 请求
// 将查询条件是octocat，mojombo，defunkt的数据请求合并。
source$.pipe(
    //第一个 mergeMap 操作符用于将每个字符串转换成一个 HTTP 请求 Observable，该 Observable 发出用户信息的响应。
    mergeMap(username => axios.get(`https://api.github.com/users/${username}`)),
    // 第二个 mergeMap 操作符用于将每个用户信息的响应转换成一个新的 HTTP 请求 Observable，该 Observable 发出用户的仓库列表的响应
    mergeMap(response => axios.get(response.data.repos_url)),
).subscribe(response => console.log(response.data));