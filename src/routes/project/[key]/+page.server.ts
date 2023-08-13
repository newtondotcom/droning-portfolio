import { error } from '@sveltejs/kit';
import type { Project } from '../../../lib/types';
import  {mysql} from 'mysql';

export function load({ params }) {
  const projectData : Project[] = [
    {
      name: "Project 1",
      thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
      videoLink: "fZw_SWMVpfM",
      description: "Description of Project 1",
      key: "0",
      duration: "200",
    },
    {
      name: "Project 2",
      thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
      videoLink: "5T7OMVLQLwE",
      description: "Description of Project 2",
      key: "1",
      duration: "200",
    }
  ];

  if (projectData) {
    return {
        projectData : projectData,
        length : projectData.length,
        index : params.key,
    };
  } else {
    throw error(404, 'Not found');
  }
}
