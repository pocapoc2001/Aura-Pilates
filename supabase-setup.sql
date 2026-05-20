-- Run this script in your Supabase SQL Editor to create the profiles table and set up permissions.

-- Create a table for public profiles
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  credit_balance int default 0 not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies so users can only view and update their own profiles
create policy "Users can view their own profile."
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- Important: You'll also want to make sure new users get a profile when they sign up.
-- You can do this by setting up a trigger.

-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, credit_balance)
  values (new.id, 0);
  return new;
end;
$$;

-- Create a trigger that calls the function every time a user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
