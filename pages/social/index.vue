<template>
  <div class="w-full">
    <div v-if="$device.isMobile">
      <SocialAuthMobile />
    </div>

    <div v-else>
      <SocialAuth />
    </div>
  </div>
</template>
