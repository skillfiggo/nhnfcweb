-- Run this in the Supabase SQL Editor to create the slider-images bucket

insert into storage.buckets (id, name, public)
values ('slider-images', 'slider-images', true)
on conflict (id) do nothing;

create policy "Slider images are publicly accessible"
on storage.objects for select
to public
using ( bucket_id = 'slider-images' );

create policy "Authenticated users can upload slider images"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'slider-images' );

create policy "Authenticated users can update slider images"
on storage.objects for update
to authenticated
using ( bucket_id = 'slider-images' );

create policy "Authenticated users can delete slider images"
on storage.objects for delete
to authenticated
using ( bucket_id = 'slider-images' );
