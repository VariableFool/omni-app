<script setup lang="ts">
defineProps<{ text: string }>();

const auth = useAuthStore();
</script>

<template>
  <div>
    <div v-if="auth.devMode">
      [
      <span class="blinking-dot"></span>
      <span> {{ text }}</span>
      ]
    </div>
    <div v-else>
      [
      <span class="blinking-no-active-dot"></span>
      <span> {{ $device.isDesktop ? ' CONTINUATION TOMORROW 😴' : ' DEV PAUSE😴' }}</span>
      ]
    </div>
  </div>
</template>

<style scoped>
.blinking-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(255, 0, 0);
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.blinking-no-active-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: gray;
}
</style>
