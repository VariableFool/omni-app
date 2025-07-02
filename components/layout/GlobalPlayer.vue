<template>
  <div class="w-full max-w-[1920px] flex flex-col items-center gap-4 mb-20">
    <div>
      <span>Europaplus</span>
      <audio ref="player" controls>
        <source
          src="https://emgregion.hostingradio.ru:8064/moscow.europaplus.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  </div>
</template>
