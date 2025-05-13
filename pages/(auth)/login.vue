<!-- pages/(auth)/login.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 bg-muted p-6 min-h-svh md:p-10">
    <div class="max-w-sm w-full flex flex-col gap-6">
      <div class="flex flex-col gap-6">
        <Card>
          <CardHeader class="text-center">
            <CardTitle class="text-xl">
              KMS密钥管理系统
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AuthSignIn />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>