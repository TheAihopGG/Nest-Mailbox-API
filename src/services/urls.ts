import * as express from 'express';
import * as handlers from './handlers';

export function bindUrls(app: express.Express) {
    app.get('/', handlers.index)
}
