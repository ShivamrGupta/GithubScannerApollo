import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import RepoDetails from './RepoDetails';

const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      name
      size
      owner
    }
  }
`;

function RepoList() {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const repositories = data.repositories;

  return (
    <div>
      <h1>List of Repositories</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {repositories.map((repo) => (
            <tr key={repo.name}>
              <td>{repo.name}</td>
              <td>{repo.size}</td>
              <td>{repo.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {repositories.map((repo) => (
        <RepoDetails key={repo.name} name={repo.name} owner={repo.owner} />
      ))}
    </div>
  );
}

export default RepoList;
