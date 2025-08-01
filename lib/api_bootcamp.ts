type RawRecommendation = {
  name: string;
  url: string;
  preview: string;
  score: number;
  skill: string;
  level: string;
  rating: number;
  review_count_numeric: number;
  review_count: string;
  duration: string;
};

type JobData = {
  job: string;
  total_recommendations: number;
  recommendations: RawRecommendation[];
};

type Bootcamp = {
  id: string;
  title: string;
  url: string;
  preview: string;
  skill: string;
  duration: string;
  level: string;
  rating: number;
  review_count: number;
};

export async function getApiBootcamp(): Promise<Bootcamp[]> {
  const res = await fetch("/api/job.json");
  const data: JobData[] = await res.json();

  return data.flatMap((item, jobIndex) =>
    item.recommendations.map((rec, index) => ({
      id: `${jobIndex}-${index}`,
      title: rec.name,
      url: rec.url,
      preview: rec.preview,
      skill: rec.skill,
      duration: rec.duration,
      level: rec.level,
      rating: rec.rating,
      review_count: rec.review_count_numeric,
    }))
  );
}
