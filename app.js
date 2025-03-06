// Initialize Supabase client
const supabaseUrl = 'https://yfbqwkmpclnpvwetdtet.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmYnF3a21wY2xucHZ3ZXRkdGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MjI4NDIsImV4cCI6MjA1NDI5ODg0Mn0._eEezoTDhB6dSWXgkxaq9VKVu6MDGggLFOKqE4eJjas';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Initialize Leaflet map
const map = L.map('map').setView([0, 0], 2); // Default view
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to fetch data from Supabase and add markers to the map
async function updateMap() {
  // Fetch data from Supabase
  const { data, error } = await supabase
    .from('locations')
    .select('*');

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  // Clear existing markers
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Add markers for each location
  data.forEach(location => {
    const marker = L.marker([location.latitude, location.longitude])
      .addTo(map)
      .bindPopup(`<b>${location.name}</b><br>${location.description}`);
  });
}

// Initial data load
updateMap();

// Optional: Periodically update the map (e.g., every 10 seconds)
setInterval(updateMap, 10000);