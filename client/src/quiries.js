
import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
        name
        owner
        size
    }
  }
`;

export const GET_REPOSITORY_DETAILS = gql`
mutation GetRepositoryDetails($owner: String!, $name: String!) {
  repositoryDetails(owner: $owner, name: $name) {
    name
    size
    owner
  }
}
`;