import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'matches',
            component: () => import('@/views/MatchView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('@/views/SignUpView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
        },
        {
            path: '/creation',
            name: 'matchCreation',
            component: () => import('@/views/MatchCreationView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/rankings',
            name: 'rankings',
            component: () => import('@/views/Rankings.vue'),
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/views/TeamSettingsView.vue'),
            meta: {
                requiresAuth: true
            }
        }
    ]
})

export default router