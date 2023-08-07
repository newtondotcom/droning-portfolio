import { error } from '@sveltejs/kit';
import type { Project } from '../../../lib/types';

export function load({ params }) {
    if (params.key === '1') {
        //const post = posts.find((post) => post.slug === params.slug);
        return {
            videoLink : '5T7OMVLQLwE',
            key : '1',
            duration :'80'
        };
    }

    throw error(404, 'Not found');
}