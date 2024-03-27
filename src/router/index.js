import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/supabase/init.js'


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

router.beforeEach(async (to, from, next) => {
    const {data} = await supabase.auth.getSession()

    const isLogged = !!data.session
    const requiresAuth = to.matched.some((value) => value.meta.requiresAuth)
    if (requiresAuth && !isLogged) {
        next('/login')
    }else if(!requiresAuth && isLogged) {
        next('/')
    } else {
        next()
    }
})

export default router