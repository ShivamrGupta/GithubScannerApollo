import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_REPO_DETAILS = gql`
  query RepoDetails($owner: String!, $name: String!) {
    repositoryDetails(owner: $owner, name: $name) {
      owner
      name
      size
    }
  }
`;

function RepoDetails({ name, owner }) {
  const { loading, error, data: repoDetails } = useQuery(GET_REPO_DETAILS, {
    variables: { owner: owner, name: name }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name: repoName, size, owner: repoOwner } = repoDetails?.repositoryDetails || {};

  return (
    <div>
      <h2>Repository Details</h2>
      <table>
        <tbody>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{repoName}</td>
          </tr>
          <tr>
            <td><strong>Size:</strong></td>
            <td>{size}</td>
          </tr>
          <tr>
            <td><strong>Owner:</strong></td>
            <td>{repoOwner}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RepoDetails;
