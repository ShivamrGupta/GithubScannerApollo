const axios = require('axios');

const resolvers = {
  Query: {
    repositories: async () => {
      
      try {
        const response = await axios.get('https://api.github.com/user/repos', {
          headers: {
            Authorization: 'Bearer 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',

          },
        });
        return response.data.map((repo) => ({
          name: repo.name,
          size: repo.size,
          owner: repo.owner.login,
        }));
      } catch (error) {
        throw new Error('Unable to fetch repositories');
      }
    },
    repositoryDetails: async (_,{ owner, name }) => {
      
            try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${name}`, {
          headers: {
            Authorization: 'Bearer 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',
          },
        });
        const repo = response.data;
        console.log("respose check here man",repo)
        return {
          name: repo.name,
          size: repo.size,
          owner: repo.owner.login,
        };
      } catch (error) {
        
        throw new Error('Unable to fetch repository details');
      }
    },


  },
};

module.exports = resolvers;
