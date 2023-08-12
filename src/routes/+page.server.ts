import  {mysql} from 'mysql';
import type {Project}  from '../lib/types';
import { error } from '@sveltejs/kit';

export function load() {
        const data : Project[] = [
        {
          name: "Project 1",
          thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
          videoLink: "fZw_SWMVpfM",
          description: "Description of Project 1",
          key: "1",
          duration: "200",
        },
        {
          name: "Project 2",
          thumbnail: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
          videoLink: "5T7OMVLQLwE",
          description: "Description of Project 2",
          key: "2",
          duration: "200",
        }]
        return {data};

    throw error(404, 'Not found');
}