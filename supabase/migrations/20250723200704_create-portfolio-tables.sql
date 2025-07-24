-- Tabel profil pengguna
create table public.profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  bio text not null,
  location text,
  email text,
  phone text,
  github_url text,
  linkedin_url text,
  website_url text,
  avatar_url text,
  resume_url text,
  years_of_experience integer,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Tabel keterampilan (skills)
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  level integer not null,
  icon_url text,
  created_at timestamp with time zone default now()
);

-- Tabel pendidikan
create table public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text not null,
  field_of_study text not null,
  start_date date not null,
  end_date date,
  gpa float,
  description text,
  created_at timestamp with time zone default now()
);

-- Tabel pengalaman kerja
create table public.experience (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  position text not null,
  start_date date not null,
  end_date date,
  description text,
  technologies text[] not null,
  created_at timestamp with time zone default now()
);

-- Tabel pengalaman projek
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  technologies text[] not null,
  github_url text,
  live_url text,
  image_url text,
  featured boolean default false,
  created_at timestamp with time zone default now()
);

