import React, { useState } from 'react';
import RepoList from './component/Repolist';
import RepoDetails from './component/RepoDetails';
import { useMutation, useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORY_DETAILS } from './quiries';

function App() {
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repoDetails, setRepoDetails] = useState(null);

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
  };

  const { loading: repositoriesLoading, error: repositoriesError, data: repositoriesData } = useQuery(GET_REPOSITORIES);

  const [getRepositoryDetails, { data: repoData, loading: repoLoading, error: repoError }] = useMutation(GET_REPOSITORY_DETAILS);

  const callRepositoryDetailsMutation = async (owner, name) => {
    try {
     
      const repositoriesToProcess = repositoriesData?.repositories.slice(0, 2);

      
      const repositoryDetailPromises = repositoriesToProcess.map(async (repo) => {
        const response = await getRepositoryDetails({
          variables: {
            owner: repo.owner,
            name: repo.name,
          },
        });
        return response.data.repositoryDetails;
      });

           const repositoryDetails = await Promise.all(repositoryDetailPromises);

      
      setRepoDetails(repositoryDetails);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>GitHub Scanner </h2>
      <div className="container">
        <RepoList
          repositories={repositoriesData?.repositories || []}
          onRepoClick={handleRepoClick}
          loading={repositoriesLoading}
          error={repositoriesError}
        />
        {selectedRepo && (
          <RepoDetails
            repo={selectedRepo}
            repoDetails={repoDetails}
            onDetailClick={callRepositoryDetailsMutation}
            loading={repoLoading}
            error={repoError}
          />
        )}
      </div>
    </div>
  );
}

export default App;
