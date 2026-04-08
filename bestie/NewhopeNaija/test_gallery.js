const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzeGppbXdhdWdrcnFiamVpbWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDE2ODIsImV4cCI6MjA4OTgxNzY4Mn0._69x1nQEgtyQrzB8ZzVo4VYquGTRVoLSN2hmkAj32po";
fetch("https://vsxjimwaugkrqbjeimhw.supabase.co/rest/v1/gallery_photos?select=id,image_url,category&order=created_at.desc&limit=5", {
  headers: {
    "apikey": key,
    "Authorization": `Bearer ${key}`
  }
}).then(r => r.json()).then(data => {
  console.log("DB DATA:", JSON.stringify(data, null, 2));
}).catch(console.error);
