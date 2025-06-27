export interface NewsModel {
  title: string;
  link: string;
  pubDate: string;
  category?: string;
  description: string;
  image: string;
}

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    role: string;
    email: string;
    createdAt: string;
    status?: string;
    nickname?: string;
    birthDate?: Date;
    specialty?: string;
  };
};
