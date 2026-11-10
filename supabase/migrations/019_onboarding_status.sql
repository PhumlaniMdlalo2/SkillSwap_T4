-- Persist whether the user has finished the 3-step onboarding flow so the
-- route guards can send fresh signups to onboarding instead of the tab bar.
alter table public.users
  add column if not exists onboarding_completed boolean not null default false;

-- The column-level grants from 018_audit_fixes.sql only allow name/bio/avatar,
-- so the client needs explicit access to read and write this flag.
grant select (onboarding_completed) on public.users to anon, authenticated;
grant update (onboarding_completed) on public.users to authenticated;

-- Accounts that existed before this flag was introduced already have their
-- skills/interests set up; don't push them back through onboarding.
update public.users set onboarding_completed = true;
