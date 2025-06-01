import { loadHeaderFooter } from './utils.mjs';
import Alert from './alert.js';

loadHeaderFooter();

const alertSystem = new Alert('/json/alert.json');

alertSystem.init();
