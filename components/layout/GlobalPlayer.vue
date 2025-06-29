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

    <div>
      <span class="text-center">RuTube</span>
      <iframe
        class="w-[320px] h-[180px] sm:w-3xl sm:h-[432px]"
        src="https://rutube.ru/play/embed/7b8f2701588b71ac0d68834bef33aa80"
        frameBorder="0"
        allow="clipboard-write; autoplay"
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
      ></iframe>
    </div>

    <div>
      <span class="text-center">YouTube</span>
      <iframe
        class="w-[320px] h-[180px] sm:w-3xl sm:h-[432px]"
        src="https://www.youtube.com/embed/36YnV9STBqc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <div>
      <span class="text-center">Twitch FilmPrimeTv</span>
      <iframe
        class="w-[320px] h-[250px] sm:w-3xl sm:h-[432px]"
        src="https://player.twitch.tv/?channel=filmprimetv&parent=omni.gghub.ru&autoplay=false"
        frameborder="0"
        allowfullscreen
        scrolling="no"
      ></iframe>
    </div>
  </div>
</template>
