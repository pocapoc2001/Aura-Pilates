import ClassesClient from "./classes-client";

export const dynamic = 'force-dynamic';

export default function ClassesPage() {
  // Read the environment variable purely on the server at runtime
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_PLATFORM_KEY || "";
  
  return <ClassesClient mapsKey={mapsKey} />;
}
