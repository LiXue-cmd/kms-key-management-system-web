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
  try {
    const response = await axios.post(
      "/api/login",
      {
        email: email.value,
        password: password.value,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log("Login response - Status:", response.status);
    console.log("Login response - Headers:", response.headers);
    console.log("Login response - Data:", response.data);

    // 验证响应是否为JSON
    if (
      typeof response.data === "string" &&
      response.data.includes("<!DOCTYPE html>")
    ) {
      throw new Error("服务器返回了HTML页面，而非JSON数据");
    }

    const user = response.data;
    setUser(user);

    isLoading.value = false;
    await nextTick(); //等待状态更新
    router.push("/");
  } catch (err: any) {
    console.error("Login error:", err);
    console.error("Error response:", err.response?.data);

    if (err.code === "ECONNABORTED") {
      error.value = "网络连接超时，请检查网络连接";
    } else {
      error.value =
        err.response?.data?.message || err.message || "登录过程中发生错误";
    }

    isLoading.value = false;
    alert(`登录失败: ${error.value}`);
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
