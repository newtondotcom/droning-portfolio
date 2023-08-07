import type { Project } from './types';

// Function to retrieve projects from the database (plausible implementation)
export async function getProjectsFromDatabase(): Promise<Project[]> {
  return [
    {
      name: "Project 1",
      thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
      videoLink: "fZw_SWMVpfM",
      description: "Description of Project 1",
      key: "1",
    },
    {
      name: "Project 2",
      thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
      videoLink: "5T7OMVLQLwE",
      description: "Description of Project 2",
      key: "2",
    },
    {
      name: "Project 2",
      thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
      videoLink: "https://player.vimeo.com/video/PROJECT_2_VIDEO_ID",
      description: "Description of Project 2",
      key: "2",
    },    
    {
      name: "Project 2",
      thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
      videoLink: "https://player.vimeo.com/video/PROJECT_2_VIDEO_ID",
      description: "Description of Project 2",
      key: "2",
    },
  ];
}
