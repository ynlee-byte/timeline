-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.applause (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  from_user_id uuid NOT NULL,
  to_user_id uuid NOT NULL,
  challenger_id integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT applause_pkey PRIMARY KEY (id),
  CONSTRAINT applause_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.calendar_confirmations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  confirmed_at timestamp with time zone DEFAULT now(),
  week_start date NOT NULL,
  CONSTRAINT calendar_confirmations_pkey PRIMARY KEY (id),
  CONSTRAINT calendar_confirmations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.goals (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  activity text NOT NULL,
  goal_text text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT goals_pkey PRIMARY KEY (id),
  CONSTRAINT goals_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.judgments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  goal_id uuid,
  achieved boolean NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  comment text NOT NULL DEFAULT ''::text,
  CONSTRAINT judgments_pkey PRIMARY KEY (id),
  CONSTRAINT judgments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT judgments_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goals(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.recognitions_goal (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  from_user_id uuid NOT NULL,
  to_user_id uuid NOT NULL,
  goal_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT recognitions_goal_pkey PRIMARY KEY (id),
  CONSTRAINT recognitions_goal_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES auth.users(id),
  CONSTRAINT recognitions_goal_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES auth.users(id),
  CONSTRAINT recognitions_goal_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goals(id)
);
CREATE TABLE public.recognitions_judgment (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  from_user_id uuid NOT NULL,
  to_user_id uuid NOT NULL,
  judgment_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT recognitions_judgment_pkey PRIMARY KEY (id),
  CONSTRAINT recognitions_judgment_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES auth.users(id),
  CONSTRAINT recognitions_judgment_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES auth.users(id),
  CONSTRAINT recognitions_judgment_judgment_id_fkey FOREIGN KEY (judgment_id) REFERENCES public.judgments(id)
);
CREATE TABLE public.recognitions_review (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  from_user_id uuid NOT NULL,
  to_user_id uuid NOT NULL,
  review_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT recognitions_review_pkey PRIMARY KEY (id),
  CONSTRAINT recognitions_review_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES auth.users(id),
  CONSTRAINT recognitions_review_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES auth.users(id),
  CONSTRAINT recognitions_review_review_id_fkey FOREIGN KEY (review_id) REFERENCES public.reviews(id)
);
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  activity text NOT NULL,
  review_text text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);