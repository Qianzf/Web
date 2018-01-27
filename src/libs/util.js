import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + '' : 'SCH SYSTEM - web page';
    window.document.title = title;
};


export default util;