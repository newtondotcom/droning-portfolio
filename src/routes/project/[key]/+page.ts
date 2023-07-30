import { error } from '@sveltejs/kit';
import type { Project } from '../../../lib/types';

export function load({ params }) {
    if (params.key === 'hello-world') {
        return {
            title: 'Hello world!',
            content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
        };
    }

    throw error(404, 'Not found');
}