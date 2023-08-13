import  {mysql} from 'mysql';
import type {Project}  from '../lib/types';
import { error } from '@sveltejs/kit';

export function load() {
  const projectData : Project[] = [
    {
      name: "La Tranche Sur Mer, France",
      thumbnail: "https://i.ibb.co/9gn78fk/image00001.png",
      videoLink: "fZw_SWMVpfM",
      description: "Description of Project 1",
      key: "0",
      duration: "200",
    },
    {
      name: "Saint Germain en Laye, France",
      //thumbnail: "https://i.ibb.co/X2TKq1q/1.png",
      thumbnail: "https://i.ibb.co/k0tg05g/image00065.png",
      videoLink: "HClKWDEz31g",
      description: "Description of Project 2",
      key: "1",
      duration: "200",
    }
  ];
  return {projectData};

    throw error(404, 'Not found');
}