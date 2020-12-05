import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/students",
      name: "students",
      component: () => import("@/components/ListStudents")
    },
    {
      path: "/students/:id",
      name: "student-details",
      component: () => import("@/components/EditStudent")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("@/components/AddStudent")
    }
  ]
});