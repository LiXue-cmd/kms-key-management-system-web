<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import PasswordInput from '~/components/PasswordInput.vue'

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthorization } from '~/composables/useAuthorization';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const { setUser } = useAuthorization();
const isLoading = ref(false)

const onSubmit = async () => {
  isLoading.value = true;
  try {
    // 调用登录API
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (!response.ok) {
      isLoading.value = false;
      throw new Error('登录失败，请检查凭证');
    }

    const user = await response.json();
    // 设置用户信息到授权模块
    setUser(user);

    isLoading.value = false;
    // 重定向到首页或之前的页面
    router.push('/');
  } catch (err: any) {
    console.log('err',err)
    isLoading.value = false;
    error.value = err.message || '登录过程中发生错误';
  }
}
</script>

<template>
  <form class="grid gap-6" @submit="onSubmit">
    <div class="grid gap-2">
      <Label for="email">
        账号
      </Label>
      <Input id="email" v-model="email" type="text" placeholder="请输入账号" :disabled="isLoading" auto-capitalize="none"
        auto-complete="email" auto-correct="off" />
    </div>
    <div class="grid gap-2">
      <div class="flex items-center">
        <Label for="password">
          密码
        </Label>
        <NuxtLink to="/forgot-password" class="ml-auto inline-block text-sm underline">
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
  <!-- <div class="mt-4 text-center text-sm text-muted-foreground">
    Don't have an account?
    <NuxtLink to="/register" class="underline">
      Sign up
    </NuxtLink>
  </div> -->
</template>

<style scoped></style>
