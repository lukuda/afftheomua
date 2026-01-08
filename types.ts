
export interface PlatformStrategy {
  tiktok: string;
  facebook: string;
  youtube: string;
}

export interface SeasonalData {
  month: string;
  season: string;
  majorEvents: string[];
  hotCategories: string[];
  videoStyle: string;
  buyingPsychology: string;
  shortVideoTips: string;
  platformStrategies: PlatformStrategy;
}

export interface Recommendation {
  productName: string;
  reasoning: string;
  videoHooks: string[];
  targetAudience: string;
  scriptSummary: string;
}
