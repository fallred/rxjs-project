import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { fromEvent, of, catchError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const input = document.getElementById('searchInput');

    // 创建 observable，监听输入框的输入事件
    const query$ = fromEvent(input, 'input').pipe(
      debounceTime(300), // 等待 300 毫秒
      map(event => event.target.value.trim()), // 获取输入框的值
      filter(query => query.length > 2), // 过滤掉长度小于 3 的查询
      distinctUntilChanged(), // 忽略与上一次查询相同的查询
      switchMap(query => this.search(query)) // 发起搜索请求
    );

    // 订阅 observable，更新查询结果和状态
    this.subscription = query$.subscribe({
      next: results => {
        console.log('subscribe next results:', results);
        this.setState({ results, loading: false, error: null });
      },
      error: error => {
        console.log('subscribe error:', error);
        this.setState({ results: [], loading: false, error });
      },
      complete: () => {
        this.setState({ loading: false });
      }
    });
  }

  componentWillUnmount() {
    // 取消订阅 observable
    this.subscription.unsubscribe();
  }

  search(query) {
    // 设置 loading 状态
    this.setState({ loading: true, error: null });

    // 发起搜索请求
    const url = `https://api.github.com/search/repositories?q=${query}`;
    return ajax(url).pipe(
      map(resp => resp.response.items), // 获取搜索结果
      catchError(error => of([])) // 处理错误
    );
  }

  render() {
    const { query, results, loading, error } = this.state;

    return (
      <div>
        <input type="text" id="searchInput" value={query} onChange={event => this.setState({ query: event.target.value })} />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {results.length > 0 && (
          <ul>
            {results.map(result => (
              <li key={result.id}>{result.full_name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<SearchBox />);