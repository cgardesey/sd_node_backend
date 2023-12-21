
import VueRouter from 'vue-router'

let routes = [
    /*{
        path: '/',
        name: 'home',
        component: require('./views/Home').default
    },*/

    {
        path: '/past-questions/*',
        name: 'passco',
        component: require('./views/PastQuestions').default
    },

];

export default new VueRouter({
    routes,

    // linkActiveClass: 'is-active'
});
