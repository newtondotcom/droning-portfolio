import type { Project } from './types';

// Function to retrieve projects from the database (plausible implementation)
export async function getProjectsFromDatabase(): Promise<Project[]> {
  return [
    {
      name: "Project 1",
      thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
      videoLink: "https://player.vimeo.com/video/PROJECT_1_VIDEO_ID",
      description: "Description of Project 1",
      key: "project-1",
    },
    {
      name: "Project 2",
      thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
      videoLink: "https://player.vimeo.com/video/PROJECT_2_VIDEO_ID",
      description: "Description of Project 2",
      key: "project-2",
    },
    {
      name: "Project 2",
      thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
      videoLink: "https://player.vimeo.com/video/PROJECT_2_VIDEO_ID",
      description: "Description of Project 2",
      key: "project-2",
    },    
    {
      name: "Project 2",
      thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
      videoLink: "https://player.vimeo.com/video/PROJECT_2_VIDEO_ID",
      description: "Description of Project 2",
      key: "project-2",
    },
  ];
}
