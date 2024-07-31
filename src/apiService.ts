import axios from 'axios';
// interface packages{
// analyzedAt : string,
// name: string
// }

// Function to search for npm packages
export const searchNpmPackages = async (query: string) => {
  const response = await axios.get(`https://api.npms.io/v2/search?q=${query}`);
  return response.data;
};

// Function to fetch autocomplete suggestions from npms.io API
export const getAutocompleteSuggestions = async (query: string) => {
  const response = await axios.get(`https://api.npms.io/v2/search/suggestions?q=${query}`);
  return response.data;
};

// Function to fetch package details from GitHub
export const getGithubRepo = async (owner: string, repo: string) => {
  const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
  return response.data;
};

const API_BASE_URL = 'https://registry.npmjs.org';

export const getPackageDetails = async (packageName: string) => {
  const response = await axios.get(`${API_BASE_URL}/${packageName}`);
  return response.data;
};

export interface PackageData {
  collected: {
    metadata: {
      name: string;
      version: string;
      description: string;
      keywords?: string[];
      repository: {
        type: string;
      };
      license: string;
      date: string;
      author?: {
        name: string;
      };
      maintainers:{
        username:string;
      };
    };
    github:{
      starsCount:number;
    };
    npm:{
      downloads:number;
    };
  };
  evaluation:{
    quality:{
      health:number;
    };
    popularity:{
      downloadsCount:number;
    };
  }
}

export const getPackageData = async (packageNames: string[]): Promise<Record<string, PackageData>> => {
  try {
    const response = await fetch('https://api.npms.io/v2/package/mget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(packageNames),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch package data');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
