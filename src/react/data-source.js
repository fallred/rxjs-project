import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { from, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      repos: null,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.loadUserAndRepos('octocat');
  }

  loadUserAndRepos(username) {
    // 设置 loading 状态
    this.setState({ loading: true, error: null });

    // 创建两个 Observable，一个获取用户信息，一个获取用户的仓库列表
    const user$ = from(axios.get(`https://api.github.com/users/${username}`)).pipe(
      map(response => response.data),
      catchError(error => throwError(() => error))
    );
    const repos$ = from(axios.get(`https://api.github.com/users/${username}/repos`)).pipe(
      map(response => response.data),
      catchError(error => of([]))
    );

    // 合并两个 Observable，当它们都完成时更新组件状态
    forkJoin([user$, repos$]).pipe(
      switchMap(([user, repos]) => of({ user, repos })),
      catchError(error => throwError(() => error))
    )
    .subscribe({
      next: response => {
        this.setState({ user: response.user, repos: response.repos, loading: false, error: null });
      },
      error: error => {
        this.setState({ user: null, repos: null, loading: false, error });
      }
    });
  }

  render() {
    const { user, repos, loading, error } = this.state;

    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {user && (
          <div>
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
            <h2>Repositories:</h2>
            {repos && repos.length > 0 ? (
              <ul>
                {repos.map(repo => (
                  <li key={repo.id}>{repo.name}</li>
                ))}
              </ul>
            ) : (
              <p>No repositories found.</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);