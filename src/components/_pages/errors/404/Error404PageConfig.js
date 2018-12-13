import {FuseLoadable} from '@fuse';

export const Error404PageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/error-404',
            component: FuseLoadable({
                loader: () => import('./Error404Page')
            })
        }
    ]
};
