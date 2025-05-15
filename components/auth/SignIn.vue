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

    <div v-if="error" class="text-red-500">{{ error }}</div>

    <!-- 开发环境下显示详细错误信息 -->
    <div
      v-if="debugError"
      class="mt-4 text-sm text-gray-500 bg-gray-100 p-3 rounded"
    >
      <pre>{{ debugError }}</pre>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import PasswordInput from "~/components/PasswordInput.vue";
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuthorization } from "~/composables/useAuthorization";
import axios from "~/utils/axios";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const { setUser } = useAuthorization();
const isLoading = ref(false);
const debugError = ref(""); // 用于存储详细的错误信息

const onSubmit = async () => {
  isLoading.value = true;
  try {
    const response = await axios.post(
      "/login",
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

    let userData;
    if (typeof response.data === "string") {
      try {
        userData = JSON.parse(response.data);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", response.data);
        throw new Error("服务器返回格式异常，请稍后再试");
      }
    } else {
      userData = response.data;
    }

    if (!userData || typeof userData !== "object") {
      throw new Error("无效的用户数据格式");
    }

    setUser(userData);

    isLoading.value = false;
    await nextTick();
    router.push("/");
  } catch (err: any) {
    console.error("Login error:", err);
    console.error("Error response:", err.response?.data);

    if (process.env.NODE_ENV !== "production") {
      debugError.value = JSON.stringify(
        {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          config: err.config,
        },
        null,
        2
      );
    }

    if (err.code === "ECONNABORTED") {
      error.value = "网络连接超时，请检查网络连接";
    } else if (err.response?.status === 401) {
      error.value = "认证失败，请检查账号和密码";
    } else {
      error.value =
        err.response?.data?.message || err.message || "登录过程中发生错误";
    }

    isLoading.value = false;
    alert(`登录失败: ${error.value}`);
  }
};
</script>

<style scoped></style>