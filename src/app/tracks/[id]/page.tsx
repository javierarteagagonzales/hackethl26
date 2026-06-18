import { notFound } from "next/navigation";
import { MOCK_TRACK_DETAILS } from "@/lib/mock-data";
import { TrackDetailClient } from "@/components/ui/track-detail-client";

export default async function TrackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const trackSlug = resolvedParams.id; // e.g. "arbitrum"
  
  // Determine which mock details to show based on the slug
  let mockKey = "";
  if (trackSlug.includes("arbitrum")) mockKey = "arbitrum-track";

  const trackDetails = MOCK_TRACK_DETAILS[mockKey];

  if (!trackDetails) {
    // Fallback if no mock data is specifically designed for this track
    notFound();
  }

  return <TrackDetailClient trackDetails={trackDetails} />;
}
