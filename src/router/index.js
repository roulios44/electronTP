import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/SignUp.vue";
import ArticlesList from "../views/ArticleList.vue";
import ArticleDetail from "../views/ArticleDetails.vue";
import ArticleEdit from "../views/ArticleEdit.vue";

const routes = [
  { path: "/", redirect: "/articles" },
  { path: "/login", name: "login", component: Login },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/articles", name: "articles", component: ArticlesList },
  {
    path: "/articles/new",
    name: "article-new",
    component: ArticleEdit,
    props: { id: "new" },
  },
  {
    path: "/articles/:id",
    name: "article-detail",
    component: ArticleDetail,
    props: true,
  },
  {
    path: "/articles/:id/edit",
    name: "article-edit",
    component: ArticleEdit,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
