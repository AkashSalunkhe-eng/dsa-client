import { TopicDetailsClient } from "@/components/topics/topic-details-client";

interface TopicPageProps {
  params: Promise<{
    topicId: string;
  }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topicId } = await params;

  return <TopicDetailsClient topicId={topicId} />;
}
