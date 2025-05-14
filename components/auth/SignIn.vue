// SignIn.vue
<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import PasswordInput from "~/components/PasswordInput.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthorization } from "~/composables/useAuthorization";
// import axios from 'axios'; // 引入 axios

import axios from "~/utils/axios"; // 使用自定义的 axios 实例

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const { setUser } = useAuthorization();
const isLoading = ref(false);

// SignIn.vue
const onSubmit = async () => {
  isLoading.value = true;
  setUser({
    id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      permissions: ['manageUsers', 'managePosts', 'accessDashboard']
  });
  await nextTick();//等待状态更新
  router.push("/");
  return
  try {
    // 使用 axios 发起 POST 请求
    const response = await axios.post("/api/login", {
      email: email.value,
      password: password.value,
    });
    alert("response", response);
    // const user = response.data;
    // // 设置用户信息到授权模块
    // setUser(user);

    // isLoading.value = false;
    // 重定向到首页或之前的页面
    router.push("/");
  } catch (err: any) {
    alert("err", err.code,err.response.status);
    isLoading.value = false;
    error.value = err.response?.data?.message || "登录过程中发生错误";
  }
};
</script>

<template>
  <form class="grid gap-6" @submit="onSubmit">
    <div class="grid gap-2">
      <Label for="email"> 账号 </Label>
      <Input
        id="email"
        v-model="email"
        type="text"
        placeholder="请输入账号"
        :disabled="isLoading"
        auto-capitalize="none"
        auto-complete="email"
        auto-correct="off"
      />
    </div>
    <div class="grid gap-2">
      <div class="flex items-center">
        <Label for="password"> 密码 </Label>
        <NuxtLink
          to="/forgot-password"
          class="ml-auto inline-block text-sm underline"
        >
          忘记密码?
        </NuxtLink>
      </div>
      <PasswordInput id="password" v-model="password" />
    </div>
    <Button type="submit" class="w-full" :disabled="isLoading">
      <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
      登 录
    </Button>
  </form>
</template>

<style scoped></style>
