import { error } from '@sveltejs/kit';
import type { Project } from '../../../lib/types';

export function load({ params }) {
    if (params.key === '1') {
        //const post = posts.find((post) => post.slug === params.slug);
        return {
            videoLink : 'https://player.vimeo.com/video/849909483',
            key : '1',
        };
    }

    throw error(404, 'Not found');
}