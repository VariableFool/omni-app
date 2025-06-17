# Omni App (Frontend)

🚧 **Project is under active development**  
This is the frontend part of the Omni App — a Nuxt 3 SSR application, containerized with Docker and deployed via GitHub Actions.

---

## ⚙️ Stack & Technologies

- [Nuxt 3 (SSR)](https://nuxt.com)
- [Vue 3](https://vuejs.org)
- [TailwindCSS](https://tailwindcss.com)
- [@nuxt/ui](https://ui.nuxt.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GitHub Actions](https://github.com/features/actions)
- [Nginx Proxy Manager](https://nginxproxymanager.com/)
- [Telegram Bot API](https://core.telegram.org/bots/api) (notifications)

---

## 📦 Deployment

The app is deployed to a private VPS using:

- Docker
- `docker-compose up -d --build`
- Auto-deploy via GitHub Actions
- SSL via Nginx Proxy Manager + Let's Encrypt

---

## 🛠 Status

> 🔄 Currently in progress — initial setup and CI/CD pipeline are complete.  
> UI and features are being actively developed.

### 🚀 Live development

The project is auto-deployed on every push to the `main` branch.  
You can always see the latest version live:

🔗 [https://omni.gghub.ru](https://omni.gghub.ru)
