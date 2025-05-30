import {RouteRecordRaw} from 'vue-router';
import NoAuthView from '@/views/NoAuthView.vue';
import ACCESS_ENUM from '@/access/accessEnum';
import AddQuestionView from '@/views/question/AddQuestionView.vue';
import ManageQuestionView from '@/views/question/ManageQuestionView.vue';
import QuestionsView from '@/views/question/QuestionsView.vue';
import ViewQuestionView from '@/views/question/ViewQuestionView.vue';
import UserProfileView from '@/views/user/UserProfileView.vue';
import UserSolutionView from "@/views/user/UserSpaceView.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/user',
        name: '用户',
        children: [
            {
                path: 'profile',
                name: '个人中心',
                component: UserProfileView,
                meta: {
                    access: ACCESS_ENUM.USER,
                },
            },
            {
                path: 'space',
                name: '我的空间',
                component: UserSolutionView,
                meta: {
                    access: ACCESS_ENUM.USER,
                },
            },
        ],
        meta: {
            hideInMenu: true,
        },
    },
    {
        path: '/view/question/:id',
        name: '在线做题',
        component: ViewQuestionView,
        props: true,
        meta: {
            // access: ACCESS_ENUM.USER,
            hideInMenu: true,
        },
    },
    {
        path: '/',
        name: '首页',
        component: QuestionsView,
    },
    {
        path: '/add/question',
        name: '创建题目',
        component: AddQuestionView,
        meta: {
            access: ACCESS_ENUM.ADMIN,
        },
    },
    {
        path: '/update/question',
        name: '更新题目',
        component: AddQuestionView,
        meta: {
            access: ACCESS_ENUM.ADMIN,
            hideInMenu: true,
        },
    },
    {
        path: '/manage/question/',
        name: '管理题目',
        component: ManageQuestionView,
        meta: {
            access: ACCESS_ENUM.ADMIN,
        },
    },

    {
        path: '/noAuth',
        name: '无权限',
        component: NoAuthView,
        meta: {
            hideInMenu: true,
        },
    },
];
