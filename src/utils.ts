import {MAX_RATING} from './consts';

const getRatingStars = Array.from({length: MAX_RATING}, (_, i) => i + 1);

export {getRatingStars};
